// src/app/messenger/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "";

interface Room {
  id: string;
  name: string;
}

interface ChatMessage {
  id: string;
  body: string;
  createdAt: string;
  senderId: string;
  sender: { walletAddress: string };
}

export default function MessengerPage() {
  const socketRef = useRef<Socket | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentWallet, setCurrentWallet] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("zrp_chat_token");
    const userRaw = localStorage.getItem("zrp_chat_user");

    if (!token || !userRaw) {
      window.location.href = "/messenger/login";
      return;
    }

    try {
      setCurrentWallet(JSON.parse(userRaw).walletAddress);
    } catch {
      // ignore malformed cache, sender highlighting just won't work
    }

    if (!CHAT_API_URL) {
      setError("Chat service is not configured yet (missing NEXT_PUBLIC_CHAT_API_URL).");
      setLoading(false);
      return;
    }

    let active = true;

    const init = async () => {
      try {
        const roomsRes = await fetch(`${CHAT_API_URL}/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (roomsRes.status === 401) {
          localStorage.removeItem("zrp_chat_token");
          localStorage.removeItem("zrp_chat_user");
          window.location.href = "/messenger/login";
          return;
        }
        const roomList: Room[] = await roomsRes.json();
        if (!active) return;

        setRooms(roomList);
        const defaultRoom = roomList[0]?.id;
        if (defaultRoom) setRoomId(defaultRoom);

        const socket = io(`${CHAT_API_URL}/chat`, {
          auth: { token },
          transports: ["websocket"],
        });
        socketRef.current = socket;

        socket.on("connect", () => {
          if (defaultRoom) socket.emit("joinRoom", { roomId: defaultRoom });
        });

        socket.on("authError", () => {
          setError("Session expired, please sign in again.");
        });

        socket.on("roomHistory", (data: { roomId: string; messages: ChatMessage[] }) => {
          setMessages(data.messages);
          setLoading(false);
        });

        socket.on("newMessage", (message: ChatMessage) => {
          setMessages((prev) => [...prev, message]);
        });

        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to connect to chat.");
        setLoading(false);
      }
    };

    init();

    return () => {
      active = false;
      socketRef.current?.disconnect();
    };
  }, []);

  const switchRoom = (newRoomId: string) => {
    const socket = socketRef.current;
    if (!socket || newRoomId === roomId) return;
    socket.emit("leaveRoom", { roomId });
    setMessages([]);
    setRoomId(newRoomId);
    socket.emit("joinRoom", { roomId: newRoomId });
  };

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !roomId) return;
    socketRef.current.emit("sendMessage", { roomId, body: input });
    setInput("");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-white mb-4">💬 ZRP Messenger</h1>
      <p className="text-[#BDDBDB] mb-8">
        Secure chat, built for the ZRP community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Room List */}
        <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] p-4 h-[500px] overflow-y-auto">
          <p className="text-[#BDDBDB] text-sm font-semibold mb-3">Rooms</p>
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-sm">No rooms yet</p>
          ) : (
            rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => switchRoom(room.id)}
                className={`p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition ${
                  roomId === room.id ? "bg-gray-800" : ""
                }`}
              >
                <p className="text-white text-sm">{room.name}</p>
              </div>
            ))
          )}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3 bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] p-4 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-32">
                <p>Start the conversation.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="mb-2">
                  <span className="text-xs text-gray-500 font-mono mr-2">
                    {msg.sender.walletAddress === currentWallet
                      ? "you"
                      : `${msg.sender.walletAddress.slice(0, 4)}...${msg.sender.walletAddress.slice(-4)}`}
                  </span>
                  <span className="text-[#BDDBDB]">{msg.body}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-lg transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

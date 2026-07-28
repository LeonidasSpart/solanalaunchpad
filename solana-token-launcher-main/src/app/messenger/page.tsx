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
  const [isAdmin, setIsAdmin] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomActionError, setRoomActionError] = useState("");
  const tokenRef = useRef<string>("");

  const authHeaders = () => ({
    Authorization: `Bearer ${tokenRef.current}`,
  });

  const refreshRooms = async () => {
    const res = await fetch(`${CHAT_API_URL}/rooms`, { headers: authHeaders() });
    if (!res.ok) return;
    const roomList: Room[] = await res.json();
    setRooms(roomList);
    return roomList;
  };

  useEffect(() => {
    const token = localStorage.getItem("zrp_chat_token");
    const userRaw = localStorage.getItem("zrp_chat_user");

    if (!token || !userRaw) {
      window.location.href = "/messenger/login";
      return;
    }
    tokenRef.current = token;

    try {
      setCurrentWallet(JSON.parse(userRaw).walletAddress);
    } catch {
      // ignore malformed cache
    }

    if (!CHAT_API_URL) {
      setError("Chat service is not configured yet (missing NEXT_PUBLIC_CHAT_API_URL).");
      setLoading(false);
      return;
    }

    let active = true;

    const init = async () => {
      try {
        // Check admin status fresh from the server (not just trusting local cache)
        const meRes = await fetch(`${CHAT_API_URL}/auth/me`, { headers: authHeaders() });
        if (meRes.status === 401) {
          localStorage.removeItem("zrp_chat_token");
          localStorage.removeItem("zrp_chat_user");
          window.location.href = "/messenger/login";
          return;
        }
        if (meRes.ok) {
          const me = await meRes.json();
          if (active) setIsAdmin(!!me.isAdmin);
        }

        const roomsRes = await fetch(`${CHAT_API_URL}/rooms`, { headers: authHeaders() });
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

  const createRoom = async () => {
    setRoomActionError("");
    const trimmed = newRoomName.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${CHAT_API_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create room");

      setNewRoomName("");
      const updated = await refreshRooms();
      if (updated) {
        const created = updated.find((r) => r.name === trimmed);
        if (created) switchRoom(created.id);
      }
    } catch (err: any) {
      setRoomActionError(err.message || "Failed to create room");
    }
  };

  const deleteRoom = async (id: string, name: string) => {
    if (name === "general") return;
    if (!confirm(`Delete room "${name}"? This cannot be undone.`)) return;

    setRoomActionError("");
    try {
      const res = await fetch(`${CHAT_API_URL}/rooms/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete room");
      }

      const updated = await refreshRooms();
      if (id === roomId && updated && updated[0]) {
        switchRoom(updated[0].id);
      }
    } catch (err: any) {
      setRoomActionError(err.message || "Failed to delete room");
    }
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
        <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] p-4 h-[500px] overflow-y-auto flex flex-col">
          <p className="text-[#BDDBDB] text-sm font-semibold mb-3">Rooms</p>

          <div className="flex-1">
            {rooms.length === 0 ? (
              <p className="text-gray-500 text-sm">No rooms yet</p>
            ) : (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className={`flex items-center justify-between rounded-lg hover:bg-gray-800 transition ${
                    roomId === room.id ? "bg-gray-800" : ""
                  }`}
                >
                  <div
                    onClick={() => switchRoom(room.id)}
                    className="flex-1 p-2 cursor-pointer"
                  >
                    <p className="text-white text-sm">{room.name}</p>
                  </div>
                  {isAdmin && room.name !== "general" && (
                    <button
                      onClick={() => deleteRoom(room.id, room.name)}
                      className="px-2 text-gray-500 hover:text-red-400 text-xs"
                      title="Delete room"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {isAdmin && (
            <div className="mt-3 pt-3 border-t border-[#1a1a1a]">
              {roomActionError && (
                <p className="text-red-400 text-xs mb-2">{roomActionError}</p>
              )}
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && createRoom()}
                  placeholder="New room name"
                  className="flex-1 min-w-0 p-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs"
                />
                <button
                  onClick={createRoom}
                  className="px-3 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white text-xs font-semibold rounded-lg transition"
                >
                  +
                </button>
              </div>
            </div>
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

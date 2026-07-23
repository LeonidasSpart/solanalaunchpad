// src/app/messenger/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "matrix-js-sdk";

export default function MessengerPage() {
  const [client, setClient] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("zrp_matrix_token");
      const userId = localStorage.getItem("zrp_matrix_user");

      if (!token || !userId) {
        window.location.href = "/messenger/login";
        return;
      }

      const matrixClient = createClient({
        baseUrl: "https://chat.zrp.one",
        accessToken: token,
        userId,
      });

      await matrixClient.startClient();
      setClient(matrixClient);

      const rooms = matrixClient.getRooms();
      setRooms(rooms);
      if (rooms.length > 0) setRoomId(rooms[0].roomId);

      matrixClient.on("Room.timeline", (event, room) => {
        if (event.getType() === "m.room.message") {
          setMessages((prev) => [...prev, event.getContent().body]);
        }
      });

      setLoading(false);
    };

    init();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !client) return;
    await client.sendTextMessage(roomId, input);
    setInput("");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-white mb-4">💬 ZRP Messenger</h1>
      <p className="text-[#BDDBDB] mb-8">
        Secure, encrypted, and built for the ZRP community.
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
                key={room.roomId}
                onClick={() => setRoomId(room.roomId)}
                className={`p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition ${
                  roomId === room.roomId ? "bg-gray-800" : ""
                }`}
              >
                <p className="text-white text-sm">{room.name || "Untitled"}</p>
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
              messages.map((msg, idx) => (
                <div key={idx} className="mb-2 text-[#BDDBDB]">
                  {msg}
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

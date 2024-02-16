"use client";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-xl w-full flex flex-col gap-5 justify-between">
        <div className="bg-slate-900 text-white shadow-lg rounded-lg w-full h-96">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap px-4 py-2">
              <h1>{m.role === "user" ? "Me" : "Ai:"}</h1>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Send something..."
            value={input}
            onChange={handleInputChange}
            className="rounded-md px-2 py-2 w-full text-slate-800 shadow-md"
          />
        </form>
      </div>
    </main>
  );
}

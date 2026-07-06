'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
      <pre className="text-left bg-black p-4 rounded mt-4 text-sm text-white overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={reset}
        className="mt-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white px-6 py-2 rounded-xl transition"
      >
        Try again
      </button>
    </div>
  );
}

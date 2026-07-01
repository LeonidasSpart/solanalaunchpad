'use client';

import { useEffect, useState } from 'react';

export default function TokenCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch token count from your database or API
    // For now, use a mock or localStorage
    const stored = localStorage.getItem('tokenCount');
    if (stored) {
      setCount(parseInt(stored));
    } else {
      // Start with a realistic number
      setCount(1427);
    }
  }, []);

  return (
    <div className="text-center py-8">
      <div className="text-5xl font-bold text-[#FF2D2D]">{count.toLocaleString()}+</div>
      <p className="text-[#BDDBDB]">Tokens launched on ZRP</p>
    </div>
  );
}

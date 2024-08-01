'use client';

export default function PingButton() {
  const handlePing = async () => {
    const response = await fetch('/api/health');
    const data = await response.json();

    console.log(data);
  };

  return <button onClick={handlePing}>Ping</button>;
}

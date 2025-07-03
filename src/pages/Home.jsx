import React from 'react';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Vice Motorsports</h1>
      <p>
        Browse our <a href="/catalog" className="text-blue-500 underline">public catalog</a> or{' '}
        <a href="/login" className="text-blue-500 underline">log in</a> to your portal.
      </p>
    </div>
  );
}

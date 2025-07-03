import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 p-4 text-center mt-auto">
      <p>© {new Date().getFullYear()} Vice Motorsports. All rights reserved.</p>
    </footer>
  );
}

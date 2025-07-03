import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const cards = [
    { to: '/inventory',    label: 'Inventory Management',   description: 'Add • Edit • Remove cars' },
    { to: '/valuation',    label: 'Car Valuation Tool',      description: 'Estimate trade-in values' },
    { to: '/sales',        label: 'Log a Sale',             description: 'Record sold cars' },
    { to: '/commission',   label: 'Weekly Commissions',     description: 'View & mark paid' },
    { to: '/manage-employees', label: 'Manage Employees',   description: '(Managers only)' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ to, label, description }) => (
          <Link
            key={to}
            to={to}
            className="block p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{label}</h2>
            <p className="text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

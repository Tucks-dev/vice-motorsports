import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db }                            from '../firebase';
import { useAuth }                       from '../auth';
import { CARS }                          from '../data/cars';

export default function Sales() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: user?.uid || '',
    carId:      '',
    salePrice:  '',
    date:       ''
  });
  const [status, setStatus] = useState('');

  // load employees for dropdown
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'employees'), snap => {
      setEmployees(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await addDoc(collection(db, 'sales'), {
      ...form,
      timestamp: new Date()
    });
    setStatus('✅ Sale recorded!');
    setForm(f => ({ ...f, carId:'', salePrice:'', date:'' }));
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Log a Sale</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee */}
        <div>
          <label>Employee:</label>
          <select
            value={form.employeeId}
            onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select an employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Car */}
        <div>
          <label>Car:</label>
          <select
            value={form.carId}
            onChange={e => setForm(f => ({ ...f, carId: e.target.value }))}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a car</option>
            {CARS.map(c => (
              <option key={c.id} value={c.id}>
                {c.vehicle} (MSRP ${c.msrp.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        {/* Price & Date */}
        <div>
          <label>Sale Price:</label>
          <input
            type="number"
            value={form.salePrice}
            onChange={e => setForm(f => ({ ...f, salePrice: e.target.value }))}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Record Sale
        </button>
      </form>

      {status && <p className="mt-4 text-green-700">{status}</p>}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db }                            from '../firebase';
import { useAuth }                       from '../auth';

export default function ManageEmployees() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '', license: '', phone: '', position: ''
  });

  // Only managers can load/write
  useEffect(() => {
    if (user?.role !== 'manager') return;
    const unsub = onSnapshot(collection(db, 'employees'), snap => {
      setEmployees(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const handleAdd = async e => {
    e.preventDefault();
    await addDoc(collection(db, 'employees'), form);
    setForm({ name: '', license: '', phone: '', position: '' });
  };

  if (user?.role !== 'manager') {
    return <p className="p-8 text-red-600">Access denied: managers only.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Manage Employees</h1>

      {/* Employee Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {['Name','License','Phone','Position'].map(h => (
              <th key={h} className="border px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td className="border px-3 py-2">{emp.name}</td>
              <td className="border px-3 py-2">{emp.license}</td>
              <td className="border px-3 py-2">{emp.phone}</td>
              <td className="border px-3 py-2">{emp.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
        {[
          { key: 'name',     label: 'Name'    },
          { key: 'license',  label: 'License #' },
          { key: 'phone',    label: 'Phone'   },
          { key: 'position', label: 'Position'}
        ].map(({key,label}) => (
          <div key={key} className="flex flex-col">
            <label>{label}</label>
            <input
              type="text"
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              required
              className="border rounded px-2 py-1"
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

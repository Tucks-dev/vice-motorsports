import React, { useState }    from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db }                 from '../firebase';

export default function Inventory() {
  const [form, setForm] = useState({
    license:     '',
    vehicle:     '',
    info:        '',
    msrp:        '',
    listedPrice: '',
    imageURL:    ''
  });
  const [status, setStatus] = useState('');

  const handleAdd = async e => {
    e.preventDefault();
    // Simply write the form fields into the 'cars' collection:
    await addDoc(collection(db, 'cars'), {
      license:     form.license,
      vehicle:     form.vehicle,
      info:        form.info,
      msrp:        Number(form.msrp),
      listedPrice: Number(form.listedPrice),
      imageURL:    form.imageURL,
      createdAt:   new Date()
    });
    setStatus('✅ Car added successfully!');
    setForm({ license:'', vehicle:'', info:'', msrp:'', listedPrice:'', imageURL:'' });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Inventory Management</h1>
      <form onSubmit={handleAdd} className="space-y-4">
        {[
          { key: 'license',     label: 'License #'      },
          { key: 'vehicle',     label: 'Vehicle'        },
          { key: 'info',        label: 'Vehicle Info'   },
          { key: 'msrp',        label: 'MSRP'           },
          { key: 'listedPrice', label: 'Listed Price'   },
          { key: 'imageURL',    label: 'Image URL'      }
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block mb-1">{label}:</label>
            <input
              type={['msrp','listedPrice'].includes(key) ? 'number' : 'text'}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>
      {status && <p className="mt-3 text-green-600">{status}</p>}
    </div>
  );
}

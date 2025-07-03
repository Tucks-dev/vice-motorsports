import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export default function Inventory() {
  const [license, setLicense] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [info, setInfo] = useState('');
  const [msrp, setMsrp] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return setStatus('Please select an image.');

    try {
      setStatus('Uploading image…');
      // 1) upload image
      const storageRef = ref(storage, `cars/${license}_${file.name}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      setStatus('Saving data…');
      // 2) save Firestore doc
      await addDoc(collection(db, 'cars'), {
        license,
        vehicle,
        info,
        msrp: parseFloat(msrp),
        price: parseFloat(price),
        photoURL,
        available: true,
        createdAt: serverTimestamp()
      });

      // reset form
      setLicense('');
      setVehicle('');
      setInfo('');
      setMsrp('');
      setPrice('');
      setFile(null);
      setStatus('Car added successfully!');
    } catch (err) {
      console.error(err);
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Inventory Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['License #','Vehicle','Vehicle Information','MSRP','Listed Price'].map((label, i) => (
          <div key={i}>
            <label className="block font-medium mb-1">{label}</label>
            {i < 4 ? (
              <input
                value={[license,vehicle,info,msrp,price][i]}
                onChange={e => [setLicense,setVehicle,setInfo,setMsrp,setPrice][i](e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            ) : null}
          </div>
        ))}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>
      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
}

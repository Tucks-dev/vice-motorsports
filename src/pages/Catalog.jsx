import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Catalog() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'cars'),
      where('available', '==', true),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, snap => {
      setCars(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Used Car Catalog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow p-4">
            <img src={car.photoURL} alt={car.vehicle} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="font-bold text-lg">{car.vehicle}</h2>
            <p className="text-gray-600">{car.info}</p>
            <p className="mt-2">
              <span className="line-through text-gray-400 mr-2">${car.msrp}</span>
              <span className="text-green-600 font-semibold">${car.price}</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">License #: {car.license}</p>
          </div>
        ))}
        {cars.length === 0 && <p>No cars available right now.</p>}
      </div>
    </div>
  );
}

// src/pages/Catalog.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot }      from 'firebase/firestore';
import { db }                          from '../firebase';

export default function Catalog() {
  const [cars, setCars] = useState([]);

  // Inject component-scoped CSS once
  useEffect(() => {
    const css = `
      .catalog-container {
        padding: 2rem;
        background: #f9f9f9;
        min-height: 100vh;
      }
      .catalog-header {
        text-align: center;
        background: #004d00;
        color: white;
        padding: 2rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      .catalog-header h1 {
        margin: 0;
        font-size: 2.5rem;
        color: #d4af37;
      }
      .catalog-header p {
        margin-top: 0.5rem;
        font-style: italic;
        color: #e0f0e0;
      }
      .catalog-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      .catalog-card {
        border: 2px solid #004d00;
        border-radius: 8px;
        background: white;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .catalog-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      .image-wrapper {
        position: relative;
        width: 100%;
        padding-top: 75%; /* 4:3 aspect ratio */
        background: #eee;
      }
      .image-wrapper img {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
      }
      .card-content {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .vehicle-name {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }
      .vehicle-info {
        margin: 0 0 1rem;
        color: #666;
        font-size: 0.9rem;
      }
      .prices {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .msrp {
        text-decoration: line-through;
        color: #999;
      }
      .listed-price {
        color: #004d00;
        font-weight: bold;
        font-size: 1.1rem;
      }
      .license {
        margin-bottom: auto;
        font-size: 0.85rem;
        color: #333;
      }
      .license span {
        font-weight: 500;
      }
      .view-button {
        width: 100%;
        padding: 0.75rem;
        background: #d4af37;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s;
        margin-top: 1rem;
      }
      .view-button:hover {
        background: #b8972c;
      }
      .catalog-footer {
        text-align: center;
        margin-top: 3rem;
        color: #777;
        font-size: 0.85rem;
      }
    `;
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(css));
    document.head.append(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  // Subscribe to all cars in Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'cars'), snap => {
      setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        <h1>PDM Used Catalog</h1>
        <p>Prices negotiable — click a vehicle to view more details.</p>
      </header>

      <div className="catalog-grid">
        {cars.map(car => {
          const msrpVal = Number(car.msrp) || 0;
          const listVal = Number(car.listedPrice) || 0;
          return (
            <div key={car.id} className="catalog-card">
              <div className="image-wrapper">
                <img src={car.imageURL || '/fallback.jpg'} alt={car.vehicle} />
              </div>
              <div className="card-content">
                <h2 className="vehicle-name">{car.vehicle || 'Unnamed Vehicle'}</h2>
                <p className="vehicle-info">{car.info || ''}</p>
                <div className="prices">
                  {msrpVal > 0 && (
                    <span className="msrp">${msrpVal.toLocaleString()}</span>
                  )}
                  {listVal > 0 && (
                    <span className="listed-price">
                      ${listVal.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="license">
                  License #: <span>{car.license || 'N/A'}</span>
                </p>
                <button className="view-button">View Details</button>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="catalog-footer">
        © 2025 Vice Motorsports. All rights reserved.
      </footer>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function Home() {
  const [fromCity, setFromCity] = useState('Toshkent');
  const [toCity, setToCity] = useState('Termiz');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search?from=${fromCity}&to=${toCity}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="wrap" style={{ padding: '40px 16px' }}>
      <h1>7075.uz — Yo'l, mashina va yo'lovchini bog'lovchi platforma</h1>
      <p className="muted">Surxondaryo va Qashqadaryo yo'nalishlarida qulay safar toping[cite: 4].</p>

      {/* Qidiruv bloki */}
      <form onSubmit={handleSearch} className="card" style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label className="f"><span>Qayerdan</span></label>
            <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
              <option value="Toshkent">Toshkent</option>
              <option value="Termiz">Termiz</option>
              <option value="Qarshi">Qarshi</option>
            </select>
          </div>
          <div>
            <label className="f"><span>Qayerga</span></label>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <option value="Termiz">Termiz</option>
              <option value="Toshkent">Toshkent</option>
              <option value="Qarshi">Qarshi</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn amber">Safarlarni topish</button>
      </form>

      {/* Natijalar ro'yxati */}
      <div style={{ marginTop: '30px', display: 'grid', gap: '12px' }}>
        <h2>Topilgan haydovchilar</h2>
        {results.length === 0 ? (
          <p className="muted">Hozircha faol e'lonlar topilmadi. Qidiruvni amalga oshiring.</p>
        ) : (
          results.map((item, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <b>{item.car_type}</b> ({item.license_plate})<br />
                <span className="muted">{item.from_city} ➔ {item.to_city} | {item.date} {item.time}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b style={{ fontSize: '1.2rem', color: '#ffb627' }}>{item.price} so'm</b><br />
                <a href={`tel:${item.phone}`} className="btn tg" style={{ marginTop: '6px', padding: '6px 12px', fontSize: '14px' }}>
                  Bog'lanish: {item.phone}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
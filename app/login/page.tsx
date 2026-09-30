// app/login/page.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function LoginPage() {
  const telegramContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Agar element ichida allaqachon skript bo'lsa, takror qo'shilmasligi uchun
    if (telegramContainerRef.current && telegramContainerRef.current.hasChildNodes()) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    
    // Bot username'ingiz
    script.setAttribute('data-telegram-login', 'a1a1b1b1bot'); 
    script.setAttribute('data-size', 'large');
    
    // Ma'lumot kelib tushadigan Next.js API manzili
    script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram-callback`); 
    script.setAttribute('data-request-access', 'write');

    if (telegramContainerRef.current) {
      telegramContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f9f9f9' }}>
      <div style={{ padding: '40px', background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', width: '380px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: '10px', color: '#333' }}>Tizimga kirish</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
          Taxi xizmatidan foydalanish uchun Telegram orqali kiring
        </p>

        {/* Telegram widget tugmasi chiqadigan joy */}
        <div ref={telegramContainerRef} style={{ display: 'flex', justifyContent: 'center' }} />
      </div>
    </div>
  );
}
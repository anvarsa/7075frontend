// app/login/page.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function LoginPage() {
  const telegramContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Agar oldindan skript qo'shilgan bo'lsa, takrorlanishining oldini olamiz
    if (telegramContainerRef.current && telegramContainerRef.current.hasChildNodes()) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    
    script.setAttribute('data-telegram-login', 'a1a1b1b1bot'); 
    script.setAttribute('data-size', 'large');
    // To'g'ridan-to'g'ri Next.js ichidagi callback manzilini ko'rsatamiz:
    script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram-callback`); 
    script.setAttribute('data-request-access', 'write');

    if (telegramContainerRef.current) {
      telegramContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '10px', width: '380px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '20px' }}>Tizimga kirish</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Telegram orqali tezkor kiring
        </p>

        {/* Telegram tugmasi shu yerda chiqadi */}
        <div ref={telegramContainerRef} style={{ display: 'flex', justifyContent: 'center' }} />
      </div>
    </div>
  );
}
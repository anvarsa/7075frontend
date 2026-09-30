'use client';

import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', '@a1a1b1b1bot.'); // <-- Bot nomingizni yozing
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram-callback`);
    script.setAttribute('data-request-access', 'write');

    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Tizimga kirish</h1>
      <p style={{ marginBottom: '20px' }}>Telegram orqali avtorizatsiyadan o'ting</p>
      <div id="telegram-login-container"></div>
    </div>
  );
}
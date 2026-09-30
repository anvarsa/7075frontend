// app/login/page.jsx
'use client';

export default function LoginPage() {
  const handleLogin = (provider) => {
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
    // Autentifikatsiyadan so'ng bizning /api/auth/callback sahifasiga qaytadi
    const redirectUrl = `${window.location.origin}/api/auth/callback`;
    window.location.href = `${directusUrl}/auth/login/${provider}?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '10px', width: '350px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '20px' }}>Tizimga kirish</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Haydovchi yoki yo'lovchi sifatida davom eting
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={() => handleLogin('google')}
            style={{ padding: '10px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}
          >
            🌐 Google bilan kirish
          </button>
          
          <button 
            onClick={() => handleLogin('facebook')}
            style={{ padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#1877F2', color: '#fff' }}
          >
            📘 Facebook bilan kirish
          </button>

          <button 
            onClick={() => handleLogin('telegram')}
            style={{ padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#229ED9', color: '#fff' }}
          >
            ✈️ Telegram bilan kirish
          </button>
        </div>
      </div>
    </div>
  );
}
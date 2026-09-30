export default function HomePage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Xush kelibsiz!</h1>
      <p style={{ marginTop: '10px' }}>Tizimga kirish uchun quyidagi tugmani bosing:</p>
      <a 
        href="/login" 
        style={{ marginTop: '20px', padding: '10px 20px', background: '#0088cc', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}
      >
        Kirish (Login)
      </a>
    </main>
  );
}
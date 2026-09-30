// app/api/auth/telegram-callback/route.js
import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  // Telegram'dan kelgan barcha parametrlarni olamiz
  const id = searchParams.get('id');
  const first_name = searchParams.get('first_name');
  const username = searchParams.get('username');
  const hash = searchParams.get('hash');

  if (!id || !hash) {
    return NextResponse.redirect(new URL('/login?error=invalid_telegram_data', request.url));
  }

  try {
    // Foydalanuvchini Directus bazasidan telegram_id bo'yicha qidiramiz
    const users = await directus.request(
      readItems('users', {
        filter: {
          telegram_id: { _eq: id }
        }
      })
    );

    if (!users || users.length === 0) {
      // Agar foydalanuvchi bazada topilmasa, ro'yxatdan o'tish sahifasiga yoki xatolikka yo'naltiramiz
      return NextResponse.redirect(new URL('/login?error=user_not_found', request.url));
    }

    const user = users[0];
    const role = user.role; // Foydalanuvchi roli (masalan: driver yoki passenger)

    // Roliga qarab tegishli dashboard'ga yo'naltiramiz
    if (role === 'driver') {
      return NextResponse.redirect(new URL('/driver/dashboard', request.url));
    } else if (role === 'passenger') {
      return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}


// app/page.tsx
'use client';

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
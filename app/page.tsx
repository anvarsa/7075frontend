// app/api/auth/telegram-callback/route.js
import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  // Telegram'dan kelgan ma'lumotlar
  const id = searchParams.get('id');
  const first_name = searchParams.get('first_name');
  const username = searchParams.get('username');
  const hash = searchParams.get('hash');

  if (!id || !hash) {
    return NextResponse.redirect(new URL('/login?error=invalid_telegram_data', request.url));
  }

  try {
    // Bu yerda foydalanuvchini Directus bazasidan qidirish yoki ro'yxatdan o'tkazish logikasi bo'ladi
    // Masalan, foydalanuvchi bazada bormi tekshiramiz:
    const users = await directus.request(
      readItems('users', {
        filter: {
          telegram_id: { _eq: id }
        }
      })
    );

    // Agar foydalanuvchi topilsa yoki yangi yaratilsa, sessiya ochib dashboard'ga yo'naltiramiz
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
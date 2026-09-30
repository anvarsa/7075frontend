// app/api/auth/callback/route.js
import directus from '@/lib/directus';
import { readItems, readMe } from '@directus/sdk';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Directus sessiyasidan kirgan foydalanuvchi ma'lumotini olamiz (email yoki telefon)
    // Directus OAuth orqali kirgan foydalanuvchini cookie orqali taniydi
    const user = await directus.request(readMe());
    
    if (!user) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }

    const identifier = user.email || user.phone;

    // 2. Railway'dagi 'drivers' jadvalidan qidiramiz
    const drivers = await directus.request(
      readItems('drivers', {
        filter: { phone: { _eq: identifier } } // yoki email bo'lsa shunga moslab o'zgartirasiz
      })
    );

    if (drivers && drivers.length > 0) {
      return NextResponse.redirect(new URL('/driver/dashboard', request.url));
    }

    // 3. Railway'dagi 'passengers' jadvalidan qidiramiz
    const passengers = await directus.request(
      readItems('passengers', {
        filter: { phone: { _eq: identifier } }
      })
    );

    if (passengers && passengers.length > 0) {
      return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
    }

    // Agar bazada umuman topilmasa, ro'yxatni to'ldirish sahifasiga tashlaymiz
    return NextResponse.redirect(new URL('/register/complete-profile', request.url));

  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
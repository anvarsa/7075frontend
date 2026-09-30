// app/api/auth/telegram-callback/route.js
import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  const id = searchParams.get('id');
  const hash = searchParams.get('hash');

  if (!id || !hash) {
    return NextResponse.redirect(new URL('/login?error=invalid_telegram_data', request.url));
  }

  try {
    // 1. Avval Drivers jadvalidan qidirib ko'ramiz
    const drivers = await directus.request(
      readItems('Drivers', {
        filter: {
          id: { _eq: id } // Bazadagi ID maydoni Telegram ID bilan bir xil ko'rinadi
        }
      })
    );

    if (drivers && drivers.length > 0) {
      return NextResponse.redirect(new URL('/driver/dashboard', request.url));
    }

    // 2. Agar driver topilmasa, Passengers jadvalidan qidiramiz
    const passengers = await directus.request(
      readItems('Passengers', {
        filter: {
          id: { _eq: id }
        }
      })
    );

    if (passengers && passengers.length > 0) {
      return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
    }

    // 3. Ikkala jadvalda ham bo'lmasa
    return NextResponse.redirect(new URL('/login?error=user_not_found', request.url));

  } catch (error) {
    console.error('Telegram auth error:', error.message || error);
    return NextResponse.redirect(new URL(`/login?error=server_error&details=${encodeURIComponent(error.message || 'unknown')}`, request.url));
  }
}
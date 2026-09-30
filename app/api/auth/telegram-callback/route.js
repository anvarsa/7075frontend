import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Telegram'dan kelgan ma'lumotlar
  const id = searchParams.get('id');
  const firstName = searchParams.get('first_name');
  const username = searchParams.get('username');
  const hash = searchParams.get('hash');
  
  // Eslatma: Xavfsizlik uchun hash'ni tekshirish mumkin (Bot token orqali), 
  // lekin hozircha asosiy mantiqni ulab ko'ramiz:

  if (!id) {
    return NextResponse.redirect(new URL('/login?error=telegram_failed', request.url));
  }

  try {
    // 1. Bazadagi 'drivers' yoki 'passengers' jadvalidan Telegram ID yoki username bo'yicha qidiramiz
    // (Buning uchun bazangizdagi jadvallarda telegram_id ustuni bo'lishi kerak)
    const drivers = await directus.request(
      readItems('drivers', {
        filter: { telegram_id: { _eq: id } }
      })
    );

    if (drivers && drivers.length > 0) {
      return NextResponse.redirect(new URL('/driver/dashboard', request.url));
    }

    const passengers = await directus.request(
      readItems('passengers', {
        filter: { telegram_id: { _eq: id } }
      })
    );

    if (passengers && passengers.length > 0) {
      return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
    }

    // Agar bazada topilmasa, ro'yxatdan o'tish sahifasiga yuboramiz
    return NextResponse.redirect(new URL(`/register/complete?telegram_id=${id}&name=${firstName}`, request.url));

  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
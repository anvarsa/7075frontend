// lib/directus.js
import { createDirectus, rest, authentication } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

const directus = createDirectus(directusUrl)
  .with(rest())
  .with(authentication('cookie', { credentials: 'include' }));

export default directus;
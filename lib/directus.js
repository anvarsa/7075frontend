import { createDirectus, rest } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus-production-3d8a.up.railway.app';

const directus = createDirectus(directusUrl).with(rest());

export default directus;
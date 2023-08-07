import { NextRequest, NextResponse } from 'next/server';

const serviceName = 'youtube';

export const baseUrl = `/api/proxy/${serviceName}`;

export const matcher = `${baseUrl}/:path*`;

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const [, , , service, ...paths] = url.pathname.split('/');

  if (service === serviceName) {
    const destination = [
      `https://www.googleapis.com/youtube/${paths.join('/')}`,
      `?${url.search}`,
      `&key=${process.env.GOOGLE_API_KEY}`,
    ].join('');
    return NextResponse.rewrite(destination);
  }

  return null;
}

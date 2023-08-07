import { NextRequest, NextResponse } from 'next/server';

const serviceName = 'openai';

export const baseUrl = `/api/proxy/${serviceName}`;

export const matcher = `${baseUrl}/:path*`;

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const [, , , service, ...paths] = url.pathname.split('/');

  if (service === serviceName) {
    const destination = `https://api.openai.com/${paths.join('/')}`;
    const headers = new Headers({
      Authorization: `Bearer ${process.env.OPENAI_API_TOKEN}`,
      'Content-Type': request.headers.get('content-type') || '',
      'Content-Length': request.headers.get('content-length') || '',
    });
    return NextResponse.rewrite(destination, { request: { headers } });
  }

  return null;
}

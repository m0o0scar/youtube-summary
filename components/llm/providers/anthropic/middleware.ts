import { NextRequest, NextResponse } from 'next/server';

const serviceName = 'anthropic';

export const baseUrl = `/api/proxy/${serviceName}`;

export const matcher = `${baseUrl}/:path*`;

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const [, , , service, ...paths] = url.pathname.split('/');

  if (service === serviceName) {
    const destination = `https://api.anthropic.com/${paths.join('/')}`;
    const headers = new Headers({
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': process.env.ANTHROPIC_API_TOKEN!,
    });
    return NextResponse.rewrite(destination, { request: { headers } });
  }

  return null;
}

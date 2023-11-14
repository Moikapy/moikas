import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server';

import type {NextRequest} from 'next/server';

export async function middleware(req: NextRequest) {
  let _isCreator = false;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (user) {
    const {
      data: {isCreator},
      error,
      status,
    }: any = await supabase
      .from('users')
      .select(`isCreator`)
      .eq('user_id', user?.id)
      .single();
    _isCreator = isCreator;
  }

  // if user is signed in and the current path is /login redirect the user to /profile

  // console.log('pathname', req.nextUrl.pathname,isCreator);
  if (user && _isCreator && req.nextUrl.pathname === '/login') {
    console.log('You are already logged in');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (
    (!user && !_isCreator && req.nextUrl.pathname === '/dashbboard/profile') ||
    (!user && !_isCreator && req.nextUrl.pathname === '/dashboard') ||
    (!user && !_isCreator && req.nextUrl.pathname === '/*')
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/dashboard/profile', '/dashboard', '/login', '/signup'],
};

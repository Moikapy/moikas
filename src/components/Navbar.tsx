'use client';
import React from 'react';
import Image from 'next/image';
import ReactGA from 'react-ga4';
import {cn} from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import styled from 'styled-components';
import Link from 'next/link';
const _Navbar = styled.div`
  border: 1px solid #000;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 53px;
  width: 100%;
  display: flex;
  felx-direction: row;
  justify-content: space-between;
  flex-shrink: 0;
  & > nav {
    max-width: 504px;
    justify-content: flex-end;
  }
  @media (max-width: 1023px) {
    & > nav {
      max-width: 400px;
      justify-content: flex-end;
    }
  }
  @media (max-width: 767px) {
    & > nav {
      max-width: 250px;
      justify-content: flex-end;
    }
  }
`;

const components: {title: string; href: string; description: string}[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];
const Navbar = ({session}: any) => {
  ReactGA.initialize(process.env.GA_TRACKING_ID || '');

  return (
    <_Navbar>
      <Link target='_self' href='/' passHref>
        <Image src='/brand_img.png' alt='brand_icon' width={50} height={50} />
      </Link>

      <NavigationMenu>
        {session && !session.user ? (
          <NavigationMenuItem
            onClick={() => {
              // Send a custom event
              ReactGA.event({
                category: 'navigation',
                action: 'clicked',
                label: 'login',
              });
            }}
            asChild>
            <Link target='_self' href='/login' passHref>
              <NavigationMenuLink className={''}>Login</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem
            onClick={() => {
              // Send a custom event
              ReactGA.event({
                category: 'navigation',
                action: 'clicked',
                label: 'dashboard',
              });
            }}
            asChild>
            <Link target='_self' href='/dashboard' passHref>
              <NavigationMenuLink className={''}>Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuList>
          <NavigationMenuItem className='NavigationMenuContent'>
            <NavigationMenuTrigger className='NavigationMenuContent'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-three-dots-vertical'
                viewBox='0 0 16 16'>
                <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
              </svg>
            </NavigationMenuTrigger>
            {/* // lower menu */}
            <NavigationMenuContent className='me-4'>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/about'>
                      <div className='h-6 w-6' />
                      <div className='mb-2 mt-4 text-lg font-medium'>About</div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        A little bit about me
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <NavigationMenuItem
                  onClick={() => {
                    // Send a custom event

                    ReactGA.event({
                      category: 'navigation',
                      action: 'clicked',
                      label: 'Shop',
                    });
                  }}
                  asChild>
                  <Link target='_blank' href='/shop' passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Shop
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem
                  onClick={() => {
                    // Send a custom event

                    ReactGA.event({
                      category: 'navigation',
                      action: 'clicked',
                      label: 'digital',
                    });
                  }}
                  asChild>
                  <Link target='_blank' href='/digital' passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Digital Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem
                  onClick={() => {
                    // Send a custom event

                    ReactGA.event({
                      category: 'navigation',
                      action: 'clicked',
                      label: 'Blog',
                    });
                  }}
                  asChild>
                  <Link target='new' href='/blog' passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}>
                      Newsletter
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </_Navbar>
  );
};

export default Navbar;
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({className, title, children, ...props}, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

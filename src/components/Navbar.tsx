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
  padding-right: 40px;
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
const Navbar = () => {
  ReactGA.initialize(process.env.GA_TRACKING_ID || '');

  return (
    <_Navbar>
      <Image src='/brand_img.png' alt='brand_icon' width={50} height={50} />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>Get Started</NavigationMenuTrigger> */}
            <NavigationMenuContent className='me-4'>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'>
                      <div className='h-6 w-6' />
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        shadcn/ui
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/docs' title='Introduction'>
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>Projects</NavigationMenuTrigger> */}
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
          </NavigationMenuItem>
          <NavigationMenuItem
            onClick={() => {
              // Send a custom event

              ReactGA.event({
                category: 'navigation',
                action: 'clicked',
                label: 'digital',
              });
            }}>
            <Link
              target='_blank'
              href='https://moikapylookout.gumroad.com/'
              passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Digital
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem
            onClick={() => {
              // Send a custom event

              ReactGA.event({
                category: 'navigation',
                action: 'clicked',
                label: 'Merch',
              });
            }}>
            <Link target='new' href='https://moikaslookout.com' passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Merch
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
            }}>
            <Link target='new' href='https://blog.moikaslookout.com' passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Newsletter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
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

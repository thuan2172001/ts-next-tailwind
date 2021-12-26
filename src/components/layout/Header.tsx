/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PopUpItemsProps } from '@/config/interface';
import { setData } from '@/reducer/store';

import Button from '../buttons/Button';
import { PopOverButton } from '../buttons/PopOverButton';
import UnstyledLink from '../links/UnstyledLink';

const solutions: PopUpItemsProps[] = [
  {
    name: 'Analytics',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description:
      'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
];
const callsToAction: PopUpItemsProps[] = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];
const resources: PopUpItemsProps[] = [
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ShieldCheckIcon,
  },
];

export default function Header() {
  const userInfo = useSelector((state: any) => state.data.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(
      setData({
        userInfo: null,
      })
    );
    router.push('/signin');
  };
  return (
    <Popover className='bg-primary relative sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='border-gray-100 flex items-center justify-between py-1 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:flex-1 lg:w-0'>
            <span
              className='cursor-pointer flex'
              onClick={() => router.push('/')}
            >
              <span className='sr-only'>Workflow</span>
              <img
                className='h-8 w-auto sm:h-10'
                src='/images/logo.svg'
                alt=''
              />
              <span style={{ alignSelf: 'center' }}>Hahaha</span>
            </span>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <Popover.Group as='nav' className='hidden space-x-10 md:flex'>
            <PopOverButton
              items={solutions}
              title={'Solutions'}
              callsToAction={callsToAction}
            />
            <a
              href='#'
              className='className=text-base text-dark hover:text-gray-900'
            >
              Pricing
            </a>
            <a
              href='#'
              className='className=text-base text-dark hover:text-gray-900'
            >
              Docs
            </a>
            <PopOverButton
              items={resources}
              title='More'
              callsToAction={callsToAction}
            />
          </Popover.Group>
          {!userInfo ? (
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <UnstyledLink
                href='/signin'
                className='className=text-base text-dark whitespace-nowrap hover:text-gray-900'
              >
                Sign in
              </UnstyledLink>
              <UnstyledLink
                href='/signup'
                className='border border-transparent className=inline-flex items-center justify-center ml-8 px-4 py-2 rounded-md shadow-sm text-base text-dark whitespace-nowrap'
              >
                Sign up
              </UnstyledLink>
            </div>
          ) : (
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <Button
                onClick={(e) => handleLogout(e)}
                className='border border-transparent className=rounded-md shadow-sm text-base text-dark'
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 origin-top-right p-2 top-0 transform transition md:hidden'
        >
          <div className='bg-white divide-gray-50 divide-y-2 ring-1 ring-black ring-opacity-5 rounded-lg shadow-lg'>
            <div className='pb-6 pt-5 px-5'>
              <div className='flex items-center justify-between'>
                <span
                  className='cursor-pointer flex'
                  onClick={() => router.push('/')}
                >
                  <img
                    className='h-8 w-auto'
                    src='/images/logo.svg'
                    alt='Workflow'
                  />
                  <span style={{ alignSelf: 'center' }}>Hahaha</span>
                </span>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='gap-y-8 grid'>
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 flex items-center p-3 rounded-md hover:bg-gray-50'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 text-indigo-600 w-6'
                        aria-hidden='true'
                      />
                      <span className='className=ml-3 text-base text-gray-900'>
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className='px-5 py-6 space-y-6'>
              <div className='gap-x-8 gap-y-4 grid grid-cols-2'>
                <a
                  href='#'
                  className='className=text-base text-gray-900 hover:text-gray-700'
                >
                  Pricing
                </a>

                <a
                  href='#'
                  className='className=text-base text-gray-900 hover:text-gray-700'
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='className=text-base text-gray-900 hover:text-gray-700'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {!userInfo ? (
                <div>
                  <a
                    href='#'
                    className='bg-indigo-600 border border-transparent className=items-center flex justify-center px-4 py-2 rounded-md shadow-sm text-base text-white w-full hover:bg-indigo-700'
                  >
                    Sign up
                  </a>
                  <p className='className=mt-6 text-base text-center text-gray-500'>
                    Existing customer?
                    <a
                      href='#'
                      className='ml-1 text-indigo-600 hover:text-indigo-500'
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              ) : (
                <div>
                  <span
                    onClick={(e) => handleLogout(e)}
                    className='bg-indigo-600 border border-transparent className=items-center flex justify-center px-4 py-2 rounded-md shadow-sm text-base text-white w-full hover:bg-indigo-700'
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

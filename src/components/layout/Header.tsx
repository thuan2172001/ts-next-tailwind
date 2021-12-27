/* eslint-disable @typescript-eslint/no-empty-function */
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
  UserCircleIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { LogoutIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PopUpItemsProps } from '@/config/interface';

import { PopOverButton } from '../buttons/PopOverButton';
import UnstyledLink from '../links/UnstyledLink';

const categories: PopUpItemsProps[] = [
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
  { name: 'Watch Demo', onClick: () => {}, icon: PlayIcon },
  { name: 'Contact Sales', onClick: () => {}, icon: PhoneIcon },
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
const account: PopUpItemsProps[] = [
  {
    name: 'Account management',
    description: 'Edit your information.',
    href: '#',
    icon: UserCircleIcon,
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ShieldCheckIcon,
  },
];

export default function Header() {
  const userInfo = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'DELETE' });
    router.push('/signin');
  };
  const accountAction: PopUpItemsProps[] = [
    { name: 'Help', onClick: () => {}, icon: SupportIcon },
    { name: 'Logout', onClick: handleLogout, icon: LogoutIcon },
  ];
  return (
    <Popover className='bg-primary relative sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='border-gray-100 flex items-center justify-between py-1 md:justify-start md:space-x-10'>
          <div className='flex justify-start'>
            <span
              className='cursor-pointer flex'
              onClick={() => router.push('/')}
            >
              <span className='sr-only'>Workflow</span>
              <img
                className='h-16 w-auto sm:h-16'
                src='/images/logo.svg'
                alt=''
              />
              <span
                style={{
                  alignSelf: 'center',
                  fontSize: '22px',
                  color: 'white',
                }}
              >
                MAGAZINE
              </span>
            </span>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <Popover.Group
            as='nav'
            className='hidden md:flex md:space-x-1 lg:space-x-10'
          >
            <PopOverButton
              items={categories}
              title={'Category'}
              callsToAction={callsToAction}
            />
            <a
              href='#'
              className='hidden text-base text-dark lg:block hover:text-gray-900'
            >
              Pricing
            </a>
            <a
              href='#'
              className='hidden text-base text-dark lg:block hover:text-gray-900'
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
                className='text-base text-dark whitespace-nowrap hover:text-gray-900'
              >
                Sign in
              </UnstyledLink>
              <UnstyledLink
                href='/signup'
                className='border border-transparent inline-flex items-center justify-center ml-8 px-4 py-2 rounded-md shadow-sm text-base text-dark whitespace-nowrap'
              >
                Sign up
              </UnstyledLink>
            </div>
          ) : (
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <div className='mx-10 relative text-gray-600'>
                <input
                  className='bg-white border-2 border-gray-300 h-10 rounded-lg text-sm md:pr-4 lg:pr-20 focus:outline-none'
                  type='search'
                  name='search'
                  placeholder='Search'
                />
                <button
                  type='submit'
                  className='absolute mr-4 mt-3 right-0 top-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
              </div>
              <PopOverButton
                className='mt-3'
                size='sm'
                items={account}
                title={
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {userInfo?.username}
                  </>
                }
                showDropIcon={false}
                callsToAction={accountAction}
              />
              {/* <Button
                onClick={(e) => handleLogout(e)}
                variant='ghost'
                className='border border-transparent rounded-md shadow-sm text-base text-dark'
              >
                Logout
              </Button> */}
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
                  {categories.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 flex items-center p-3 rounded-md hover:bg-gray-50'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 text-indigo-600 w-6'
                        aria-hidden='true'
                      />
                      <span className='ml-3 text-base text-gray-900'>
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
                  className='text-base text-gray-900 hover:text-gray-700'
                >
                  Pricing
                </a>

                <a
                  href='#'
                  className='text-base text-gray-900 hover:text-gray-700'
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-base text-gray-900 hover:text-gray-700'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {!userInfo ? (
                <div>
                  <a
                    href='#'
                    className='bg-indigo-600 border border-transparent flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base text-white w-full hover:bg-indigo-700'
                  >
                    Sign up
                  </a>
                  <p className='mt-6 text-base text-center text-gray-500'>
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
                    className='bg-indigo-600 border border-transparent flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base text-white w-full hover:bg-indigo-700'
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

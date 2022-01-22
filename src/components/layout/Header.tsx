/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import {
  BellIcon,
  LogoutIcon,
  MenuIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SupportIcon,
  UserCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PopUpItemsProps } from '@/config/interface';
import { clearUserInfo } from '@/reducer/auth.slice';
import ui from '@/utils/ui';

import Button from '../buttons/Button';
import { PopOverButton } from '../buttons/PopOverButton';
import UnstyledLink from '../links/UnstyledLink';

const account: PopUpItemsProps[] = [
  {
    name: 'Notification',
    description: 'Check your notification here.',
    href: '#',
    icon: BellIcon,
  },
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
    dispatch(clearUserInfo());
    localStorage.clear();
  };
  const accountAction: PopUpItemsProps[] = [
    { name: 'Help Center', onClick: () => {}, icon: SupportIcon },
    { name: 'Logout', onClick: handleLogout, icon: LogoutIcon },
  ];
  return (
    <Popover className='main-header relative top-0'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='border-gray-100 flex items-center justify-between justify-between py-1 md:space-x-10'>
          <div className='col-span-2 flex lg:col-span-1'>
            <span
              className='cursor-pointer flex'
              onClick={() => router.push('/')}
            >
              <span className='sr-only'>Workflow</span>
              <img className='' src='/images/logo-text.svg' alt='' />
            </span>
          </div>
          <div className='-mr-2 -my-2 col-start-9 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>

          {!userInfo ? (
            <div className='flex items-center py-4'>
              <UnstyledLink
                href='/explore'
                className='font-bold px-6 text-base text-black whitespace-nowrap'
              >
                Explore
              </UnstyledLink>

              <UnstyledLink
                href='/signin'
                className='font-bold px-6 text-base text-black whitespace-nowrap'
              >
                Login
              </UnstyledLink>

              <div className='mx-4 w-[144px]'>
                <Button
                  color='blue'
                  variant='outline'
                  className='w-full'
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </Button>
              </div>

              <div className='w-[144px]'>
                <Button color='blue'>Join as a pro</Button>
              </div>
            </div>
          ) : (
            <div className='col-span-6 hidden items-center justify-end md:grid md:grid-cols-8 lg:col-span-7'>
              <div className='mr-10 relative text-gray-600 md:col-span-4 lg:col-span-6'>
                <input
                  style={{ width: '100%' }}
                  className='bg-white border-2 border-gray-300 h-8 rounded-md text-sm md:pr-10 md:pr-4 lg:pr-12 focus:outline-none'
                  type='search'
                  name='search'
                  placeholder='Tìm kiếm'
                />
                <button
                  type='submit'
                  className='absolute mr-4 mt-2 right-0 top-0'
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
                className='float-right mt-3 text-black md:col-span-2 lg:col-span-1'
                size='sm'
                items={account}
                title={
                  <>
                    <UserCircleIcon className='h-7 mr-1 text-black w-7 md:h-6 md:w-6' />
                    <span className='text-black text-sm truncated-p w-[50px]'>
                      {userInfo?.identifier}
                    </span>
                  </>
                }
                callsToAction={accountAction}
              />
              <span
                className='cursor-pointer flex ml-3 text-black md:col-span-2 lg:col-span-1'
                onClick={() => {
                  ui.alertDanger('Successfully test', 'Xin chao cac ban');
                  ui.alertSuccess('Successfully test', 'Xin chao cac ban');
                  ui.alertFailed('Successfully test', 'Xin chao cac ban');
                }}
              >
                <ShoppingCartIcon className='h-7 ml-2 mt-1 w-7 md:h-6 md:w-6' />
                <span className='ml- mt-2 text-sm'>Giỏ hàng</span>
              </span>
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
                    src='/images/logo-text.svg'
                    alt='Workflow'
                  />
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
                  <input
                    style={{ width: '100%' }}
                    className='bg-white border-2 border-gray-300 h-8 pr-8 rounded-md text-sm md:pr-4 lg:pr-12 focus:outline-none'
                    type='search'
                    name='search'
                    placeholder='Tìm kiếm'
                  />
                  <button type='submit' className='absolute mr-4 mt-2 right-6'>
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
                </nav>
              </div>
            </div>
            <div className='px-5 py-6 space-y-6'>
              <div className='gap-x-8 gap-y-4 grid grid-cols-2'>
                <a className='flex text-base text-gray-900 hover:text-gray-700'>
                  <ShoppingCartIcon
                    className='flex-shrink-0 h-6 mr-2 text-indigo-600 w-6'
                    aria-hidden='true'
                  />
                  Cart
                </a>
                {account.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='flex text-base text-gray-900 hover:text-gray-700'
                  >
                    <item.icon
                      className='flex-shrink-0 h-6 mr-2 text-indigo-600 w-6'
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              {!userInfo ? (
                <div>
                  <UnstyledLink
                    href='/signup'
                    className='bg-indigo-600 border border-transparent flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base text-black w-full hover:bg-indigo-700'
                  >
                    Sign up
                  </UnstyledLink>
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
                  <Button
                    onClick={(e) => handleLogout(e)}
                    color='blue'
                    variant='primary'
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

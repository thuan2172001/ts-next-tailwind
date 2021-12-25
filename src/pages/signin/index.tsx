/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/buttons/Button';
import { MediaIcon } from '@/components/icons';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { setData } from '@/reducer/store';

export default function LoginPage() {
  const [showPassword, setshowPassword] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      setData({
        userInfo: {
          id: 1,
          username: 'thuan',
          email: 'thuan2172001@gmail.com',
        },
      })
    );
    router.push('/');
  };
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Login' />
      <main>
        <section className='absolute h-full w-full'>
          <div
            className='absolute bg-gray-900 h-full top-0 w-full'
            style={{
              backgroundImage: '/images/logo.svg',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-4/12'>
                <div className='bg-gray-300 border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='mb-0 px-6 py-6 rounded-t'>
                    <div className='mb-3 text-center'>
                      <h6 className='font-bold text-gray-600 text-sm'>
                        Sign in with
                      </h6>
                    </div>
                    <div className='btn-wrapper text-center'>
                      <span className='mx-1'>
                        <MediaIcon type='facebook' />
                      </span>
                      <span className='mx-1'>
                        <MediaIcon type='google' />
                      </span>
                    </div>
                    <hr className='border-b-1 border-gray-400 mt-6' />
                  </div>
                  <div className='flex-auto pt-0 px-4 py-10 lg:px-10'>
                    <div className='font-bold mb-3 text-center text-gray-500'>
                      <small>Or sign in with credentials</small>
                    </div>
                    <form>
                      <div className='mb-3 relative w-full'>
                        <label
                          className='block font-bold mb-2 text-gray-700 text-xs uppercase'
                          htmlFor='grid-password'
                        >
                          Email
                        </label>
                        <input
                          type='email'
                          className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                          placeholder='Email'
                          style={{ transition: 'all .15s ease' }}
                        />
                      </div>

                      <div className='mb-3 relative w-full'>
                        <label
                          className='block font-bold mb-2 text-gray-700 text-xs uppercase'
                          htmlFor='grid-password'
                        >
                          Password
                        </label>
                        <input
                          type={showPassword === true ? 'text' : 'password'}
                          className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                          placeholder='Password'
                          style={{ transition: 'all .15s ease' }}
                        />
                        <div
                          className='absolute cursor-pointer h-8 items-center pr-3 right-0 text-center top-9 w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            setshowPassword(!showPassword);
                          }}
                        >
                          {showPassword === true ? (
                            <EyeIcon
                              className={clsx(
                                'h-5 items-center ml-2 w-5 group-hover:text-gray-500'
                              )}
                              aria-hidden='true'
                            />
                          ) : (
                            <EyeOffIcon
                              className={clsx(
                                'h-5 ml-2 w-5 group-hover:text-gray-500'
                              )}
                              aria-hidden='true'
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <UnstyledLink
                          className='text-xs hover:text-sky-600'
                          href='/signup'
                        >
                          Dont have account ? Register now !
                        </UnstyledLink>
                      </div>

                      <div className='mt-6 text-center'>
                        <Button
                          onClick={(e) => handleSubmit(e)}
                          className='mb-1 mr-1 px-6 py-3 shadow w-full'
                          variant='primary'
                        >
                          Sign In
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex flex-wrap mt-6'>
                  <div className='w-1/2'>
                    <a
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      className='text-gray-300'
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className='text-right w-1/2'>
                    <a
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      className='text-gray-300'
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

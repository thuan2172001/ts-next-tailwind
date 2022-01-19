/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Button, Checkbox, Form } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import ui from '@/utils/ui';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAgreeTerm, setIsAgreeTerm] = useState(false);

  const handleSignup = (e: any) => {
    e.preventDefault();
    ui.alertMailOtp(
      `Check your email ${
        email.slice(0, email.indexOf('@')).replace(/./g, '*') +
        email.slice(email.indexOf('@'))
      }`,
      `Confirmation link has been sent to email address ${
        email.slice(0, email.indexOf('@')).replace(/./g, '*') +
        email.slice(email.indexOf('@'))
      }. Please check your mailbox`,
      () => {
        console.log('a');
      }
    );
    // ui.alertFailed('Successfully test', 'Xin chao cac ban');
  };
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Reset Password' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute background-image bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-6/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-8 px-4 py-10 lg:px-10'>
                    <div className='mb-5 text-gray-500'>
                      <h3 className='font-medium'>Customer - Sign up</h3>
                      <p className='text-gray-500'>Sign up to your account</p>
                    </div>
                    <Form>
                      <Form.Item
                        validateTrigger={['onBlur', 'onChange']}
                        name='email'
                        rules={[
                          {
                            validator: async (_, email) => {
                              if (!email) {
                                return Promise.reject(
                                  new Error('Email is required')
                                );
                              }
                              setEmail(email);
                            },
                          },
                        ]}
                      >
                        <input
                          className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                          placeholder='Email'
                          style={{ transition: 'all .15s ease' }}
                          value={email}
                          type='email'
                          name='email'
                        />
                      </Form.Item>
                      <Form.Item
                        validateTrigger={['onBlur', 'onChange']}
                        name='phoneNumber'
                        rules={[
                          {
                            validator: async (_, phoneNumber) => {
                              if (!phoneNumber) {
                                return Promise.reject(
                                  new Error('Phone number is required')
                                );
                              }
                              setPhoneNumber(phoneNumber);
                            },
                          },
                        ]}
                      >
                        <input
                          className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                          placeholder='PhoneNumber'
                          style={{ transition: 'all .15s ease' }}
                          value={phoneNumber}
                          type='text'
                          name='phoneNumber'
                        />
                      </Form.Item>
                      <div className='mb-3 relative w-full'>
                        <Form.Item
                          validateTrigger={['onBlur', 'onChange']}
                          name='password'
                          rules={[
                            {
                              validator: async (_, password) => {
                                if (!password) {
                                  return Promise.reject(
                                    new Error('Password is required')
                                  );
                                }
                              },
                            },
                          ]}
                        >
                          <input
                            type={showPassword === true ? 'text' : 'password'}
                            className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                            placeholder='Password'
                            style={{ transition: 'all .15s ease' }}
                            value={password}
                            name='password'
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </Form.Item>
                        <div
                          className='absolute cursor-pointer h-8 items-center pr-3 right-0 text-center top-3 w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
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
                      <div className='mb-3 relative w-full'>
                        <Form.Item
                          validateTrigger={['onBlur', 'onChange']}
                          name='confirmPassword'
                          dependencies={['password']}
                          rules={[
                            {
                              validator: async (_, confirmPassword) => {
                                if (!confirmPassword) {
                                  return Promise.reject(
                                    new Error('Confirm password is required')
                                  );
                                }
                                if (confirmPassword !== password) {
                                  return Promise.reject(
                                    new Error(
                                      'Password and confirm password do not match'
                                    )
                                  );
                                }
                                setConfirmPassword(confirmPassword);
                              },
                            },
                          ]}
                        >
                          <input
                            type={
                              showConfirmPassword === true ? 'text' : 'password'
                            }
                            className='bg-white border-0 placeholder-gray-400 px-3 py-3 rounded shadow text-gray-700 text-sm w-full focus:outline-none focus:ring'
                            placeholder='Confirm password'
                            style={{ transition: 'all .15s ease' }}
                            value={confirmPassword}
                            name='confirmPassword'
                          />
                        </Form.Item>
                        <div
                          className='absolute cursor-pointer h-8 items-center pr-3 right-0 text-center top-3 w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        >
                          {showConfirmPassword === true ? (
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
                      <Form.Item name='isAgreeTerm'>
                        <Checkbox
                          name='isAgreeTerm'
                          onChange={(e) => setIsAgreeTerm(e.target.checked)}
                        >
                          I agree to the{' '}
                          <a className='underline'>Term of Use</a> and{' '}
                          <a className='underline'>Privacy Policy</a>
                        </Checkbox>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType='submit'
                          disabled={
                            password !== confirmPassword || !isAgreeTerm
                          }
                          onClick={handleSignup}
                          className='bg-primary-500 text-white w-full'
                        >
                          Signup
                        </Button>
                      </Form.Item>
                    </Form>
                    <p>
                      Already have an account? &nbsp;
                      <a className='underline'>Login</a>
                    </p>
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

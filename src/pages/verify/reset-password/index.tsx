/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Form } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { ResetPassword, VerifyOtp } from '@/api/user-service';
import { GenerateKeyPairAndEncrypt } from '@/utils/auth-cryptography';
import ui from '@/utils/ui';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    const { otp, otpId } = router.query;
    const { publicKey, encryptedPrivateKey } =
      GenerateKeyPairAndEncrypt(password);
    try {
      await VerifyOtp({ otp: otp as string, otpId: otpId as string });
      await ResetPassword({
        otp: otp as string,
        otpId: otpId as string,
        publicKey,
        encryptedPrivateKey,
      });
      ui.alertResetPasswordSuccess('Password has been reset');
    } catch (err: any) {
      ui.alertFailed(err.error.toString());
    }
  };

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Reset Password' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-6/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-8 px-4 py-10 lg:px-10'>
                    <div className='font-bold mb-5 text-center text-gray-500'>
                      <h3 className='font-medium text-left'>
                        Reset your password
                      </h3>
                    </div>
                    <Form>
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
                      <div className='mt-6 text-center'>
                        <Button
                          onClick={(e) => handleResetPassword(e)}
                          className='mb-1 mr-1 px-6 py-3 shadow w-full'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
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

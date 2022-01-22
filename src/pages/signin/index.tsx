/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { GetCredential, Ping } from '@/api/user-service';
import { EXP } from '@/config/constant';
import { setUserInfo } from '@/reducer/auth.slice';
import {
  GenerateCertificate,
  SymmetricDecrypt,
} from '@/utils/auth-cryptography';
import ui from '@/utils/ui';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    const { username, password } = e;
    GetCredential({ identifier: username })
      .then((response: any) => {
        const userInfo = response.data;
        const _privateKey = SymmetricDecrypt(
          userInfo.encryptedPrivateKey,
          password
        );

        const message = {
          id: userInfo.id,
          timestamp: Math.floor(new Date().getTime()),
          exp: EXP,
        };

        const certificate: any = GenerateCertificate(message, _privateKey);
        const newUserInfo = {
          ...userInfo,
          _privateKey,
          _certificate: certificate,
          identifier: username,
        };

        dispatch(setUserInfo(newUserInfo));

        Ping()
          .then((res: { data: any }) => {
            console.log(res);
            router.push('/');
            dispatch(setUserInfo(userInfo));
          })
          .catch((err: any) => {
            ui.alertFailed(err.message.toString());
          });
      })
      .catch((err: any) => {
        ui.alertFailed(err.message.toString());
      });
  };

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Login' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='w-full lg:w-[400px]'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto p-6 rounded-3xl'>
                    <div className='mb-5 text-center text-gray-500'>
                      <h3 className='font-bold leading-8 text-2xl'>
                        Welcome back!
                      </h3>
                      <p className='font-medium leading-6 text-[#999] text-base'>
                        AnygoNow makes it easy todo <br />
                        more for your home
                      </p>
                    </div>
                    <Form
                      onFinish={handleSubmit}
                      autoComplete='off'
                      initialValues={{ username: '', password: '' }}
                      layout='vertical'
                      className='mx-auto w-full'
                    >
                      <div className='font-medium leading-4 mb-[4px] pl-5 text-sm'>
                        Email address
                      </div>
                      <Form.Item
                        style={{ marginBottom: '4px' }}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your username!',
                          },
                        ]}
                        name='username'
                      >
                        <Input
                          className='font-medium leading-4 px-5 py-4 rounded-xl text-sm'
                          placeholder='name@email.com'
                        />
                      </Form.Item>

                      <div className='font-medium leading-4 mb-[4px] mt-4 pl-5 text-sm'>
                        Password
                      </div>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                        name='password'
                      >
                        <Input.Password
                          className='font-medium leading-4 px-5 py-4 rounded-xl signup-input-password text-sm'
                          placeholder='Your password'
                        />
                      </Form.Item>

                      <div className='flex items-center mb-5'>
                        <div className='inline-block w-6/12'>
                          <UnstyledLink
                            className='font-medium left text-[#3864FF] text-sm underline'
                            href='/forgot-password'
                          >
                            Forgot your password
                          </UnstyledLink>
                        </div>

                        <Form.Item
                          className='inline-block m-0 text-right w-6/12'
                          name='isRemember'
                          valuePropName='checked'
                          rules={[]}
                        >
                          <Checkbox className='font-medium text-sm'>
                            Remember me
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <Form.Item>
                        <Button
                          className='bg-primary font-bold px-8 py-4 text-base w-full'
                          type='submit'
                        >
                          Login
                        </Button>
                      </Form.Item>
                    </Form>
                    <div>
                      <Link href='/signup'>
                        <a className='bg-primary-outline border-2 flex font-bold items-center justify-center leading-4 mt-4 px-8 py-4 rounded-xl text-base text-base text-primary w-full'>
                          <div>Create new account</div>
                        </a>
                      </Link>
                    </div>
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

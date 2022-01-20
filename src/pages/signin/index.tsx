/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd';
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
    GetCredential(username)
      .then((response: any) => {
        const { encryptedPrivateKey, data: userInfo } = response.data;
        const _privateKey = SymmetricDecrypt(encryptedPrivateKey, password);
        console.log(userInfo);
        const message = {
          id: userInfo.id,
          timestamp: Math.floor(new Date().getTime()),
          exp: EXP,
        };

        const certificate: any = GenerateCertificate(message, _privateKey);

        console.log(userInfo, certificate);

        Ping(certificate)
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

  const onFinishFailed = (errorInfo: any) => {
    ui.alertFailed(errorInfo.toString());
  };

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Login' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute background-image bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full md:lg:w-5/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-5 px-4 py-10 lg:px-10'>
                    <div className='font-bold mb-3 mt-2 text-center text-gray-500'>
                      <h2>Login</h2>
                      <small>Sign in to your account</small>
                    </div>
                    <Form
                      onFinish={handleSubmit}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      initialValues={{ username: '', password: '' }}
                      layout='vertical'
                      className='mx-auto w-8/12'
                    >
                      <div>Username</div>
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
                        <Input />
                      </Form.Item>

                      <div>Password</div>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                        name='password'
                      >
                        <Input.Password className='py-2' />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          className='mx-auto w-full'
                          variant='primary'
                          type='submit'
                        >
                          Sign in
                        </Button>
                      </Form.Item>
                    </Form>

                    <div className='mx-auto w-8/12'>
                      <UnstyledLink
                        className='text-xs hover:text-sky-600'
                        href='/forgot-password'
                      >
                        Forgot your password?
                      </UnstyledLink>
                    </div>
                    <div className='mx-auto w-8/12'>
                      <UnstyledLink
                        className='text-xs hover:text-sky-600'
                        href='/signup'
                      >
                        Dont have account ? Register now !
                      </UnstyledLink>
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

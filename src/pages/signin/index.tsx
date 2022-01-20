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

import { setUserInfo } from '@/reducer/auth.slice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setUserInfo({ username: 'thuan2172001' }));
    router.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Login' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute background-image bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-4/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-5 px-4 py-10 lg:px-10'>
                    <div className='font-bold mb-3 text-center text-gray-500'>
                      <h1>Login</h1>
                      <small>Sign in to your account</small>
                    </div>
                    <Form
                      name='basic'
                      labelCol={{
                        span: 16,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={handleSubmit}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      layout='vertical'
                      className='mx-auto w-8/12'
                    >
                      <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your username!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          offset: 0,
                          span: 24,
                        }}
                      >
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

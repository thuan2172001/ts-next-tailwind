/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { RequestForgotPassword } from '@/api/user-service';
import ui from '@/utils/ui';

export default function ForgotPasswordPage() {
  const [disableBtn, setDisableBtn] = useState(false);
  const router = useRouter();
  const handleForgotPassword = (value: any) => {
    setDisableBtn(true);
    const { email } = value;
    const ind: number = email.indexOf('@');
    const formattedEmail: string = email.replace(
      value.email.slice(0, ind - 3),
      '*******'
    );

    RequestForgotPassword({ mail: email })
      .then(() => {
        ui.alertForgotPasswordSuccess(
          `Check your email`,
          formattedEmail,
          'Xin chao cac ban'
        );
      })
      .catch((err: any) => {
        ui.alertFailed(err?.error?.toString());
      });
  };
  useEffect(() => {
    if (disableBtn) {
      setTimeout(() => setDisableBtn(false), 60000);
    }
  }, [disableBtn]);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout hiddenHeader={false} hiddenFooter={false}>
      <Seo templateTitle='Forgot Password' />
      <main className='min-h-[700px]'>
        <section className='absolute h-full w-full'>
          <div className='absolute h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='w-full lg:w-[400px]'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-6 px-0 py-10 lg:px-6'>
                    <div className='mb-8 mx-auto'>
                      <h3 className='font-medium mb-6 text-center'>
                        Forgot password
                      </h3>
                      <div className='flex text-left text-sm'>
                        <div className='bg-orange-400 block dot h-[8px] mr-3 mt-1.5 rounded-lg w-[12px]'></div>
                        <div className='font-medium'>
                          We will sent you a URL to reset your password.
                          <br />
                          Please enter your email address you have registered
                          for our system
                        </div>
                      </div>
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
                      onFinish={handleForgotPassword}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      layout='vertical'
                      className='mx-auto'
                    >
                      <div className='font-medium leading-4 mb-[4px] pl-5 text-sm'>
                        Email address
                      </div>
                      <Form.Item
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input name='email' placeholder='name@email.com' />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 0,
                          span: 24,
                        }}
                        className='mb-4'
                      >
                        {disableBtn ? (
                          <Button
                            className='bg-primary font-bold mt-2 px-8 py-3 text-base w-full'
                            variant='primary'
                            type='submit'
                            disabled={true}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            className='bg-primary font-bold mt-2 px-8 py-3 text-base w-full'
                            variant='primary'
                            type='submit'
                            disabled={false}
                          >
                            Next
                          </Button>
                        )}
                      </Form.Item>
                      <Button
                        className='bg-primary-outline border-1 flex font-bold items-center justify-center leading-4 mt-4 px-8 py-3.5 rounded-xl text-base text-base text-primary w-full'
                        variant='outline'
                        type='button'
                        disabled={false}
                        onClick={() => router.push(`/signin`)}
                      >
                        Back to Login
                      </Button>
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

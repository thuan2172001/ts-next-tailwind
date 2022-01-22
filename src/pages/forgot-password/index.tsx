/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { RequestForgotPassword } from '@/api/user-service';
import ui from '@/utils/ui';

export default function ForgotPasswordPage() {
  const [disableBtn, setDisableBtn] = useState(false);
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
        ui.alertFailed(err.error.toString());
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
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Forgot Password' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-6/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-8 px-4 py-10 lg:px-10'>
                    <div className='mb-5 mx-auto w-8/12'>
                      <h3 className='font-medium mb-4 text-left'>
                        Forgot password
                      </h3>
                      <div className='text-left text-sm'>
                        We will sent you a URL to reset your password.
                        <br />
                        Please enter your email address you have registered for
                        our system
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
                      className='mx-auto w-8/12'
                    >
                      <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input placeholder='Your email address' />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 0,
                          span: 24,
                        }}
                      >
                        {disableBtn ? (
                          <Button
                            className='mt-3 mx-auto w-full'
                            variant='primary'
                            type='submit'
                            disabled={true}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            className='mt-3 mx-auto w-full'
                            variant='primary'
                            type='submit'
                            disabled={false}
                          >
                            Next
                          </Button>
                        )}
                      </Form.Item>
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

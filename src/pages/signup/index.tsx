/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Checkbox, Form, Input } from 'antd';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { Signup } from '@/api/user-service';
import { GenerateKeyPairAndEncrypt } from '@/utils/auth-cryptography';
import ui from '@/utils/ui';

export default function SignupPage() {
  const handleSignup = (e: any) => {
    const { password, confirmPassword, email, isAgreeTerm, phoneNumber } = e;
    if (password !== confirmPassword || !isAgreeTerm) return;

    const { publicKey, encryptedPrivateKey } =
      GenerateKeyPairAndEncrypt(password);

    Signup({
      mail: email,
      phone: phoneNumber,
      publicKey,
      encryptedPrivateKey,
    })
      .then(() => {
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
      })
      .catch((err) => {
        console.log(err);
        ui.alertFailed(err.message.toString());
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    ui.alertFailed(errorInfo.toString());
  };

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Reset Password' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='w-full lg:w-[400px]'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto p-6'>
                    <div className='mb-5 text-center text-gray-500'>
                      <h3 className='font-bold leading-8 text-2xl'>{`Let's get started`}</h3>
                      <p className='font-medium leading-6 text-[#999] text-base'>
                        AnygoNow makes it easy todo <br />
                        more for your home
                      </p>
                    </div>

                    <Form
                      onFinish={handleSignup}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      initialValues={{
                        email: '',
                        phoneNumber: '',
                        password: '',
                      }}
                      layout='vertical'
                      className='mx-auto w-full'
                    >
                      <div className='font-medium leading-4 mb-[4px] pl-5 text-sm'>
                        Email address
                      </div>
                      <Form.Item
                        validateTrigger={['onBlur', 'onChange']}
                        style={{ marginBottom: '4px' }}
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'Email is not valid !',
                          },
                        ]}
                      >
                        <Input
                          className='font-medium leading-4 px-5 py-4 rounded-xl text-sm'
                          placeholder='name@email.com'
                        />
                      </Form.Item>

                      <div className='font-medium leading-4 mb-[4px] mt-4 pl-5 text-sm'>
                        Phone number
                      </div>
                      <Form.Item
                        style={{ marginBottom: '4px' }}
                        validateTrigger={['onBlur', 'onChange']}
                        name='phoneNumber'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            pattern:
                              /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                            message: 'Phone is not valid !',
                          },
                        ]}
                      >
                        <Input
                          className='font-medium leading-4 px-5 py-4 rounded-xl text-sm'
                          placeholder='000-111-222-333'
                        />
                      </Form.Item>

                      <div className='font-medium leading-4 mb-[4px] mt-4 pl-5 text-sm'>
                        Password
                      </div>
                      <Form.Item
                        validateTrigger={['onBlur', 'onChange']}
                        style={{ marginBottom: '4px' }}
                        name='password'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <Input.Password
                          className='font-medium leading-4 px-5 py-4 rounded-xl signup-input-password text-sm'
                          placeholder='Your password'
                        />
                      </Form.Item>

                      <div className='font-medium leading-4 mb-[4px] mt-4 pl-5 text-sm'>
                        Confirm your password
                      </div>
                      <Form.Item
                        className='mb-0'
                        validateTrigger={['onBlur', 'onChange']}
                        name='confirmPassword'
                        dependencies={['password']}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('The confirm password do not match!')
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          className='font-medium leading-4 px-5 py-4 rounded-xl signup-input-password text-sm'
                          placeholder='Your password'
                        />
                      </Form.Item>

                      <Form.Item
                        className='mt-6'
                        name='isAgreeTerm'
                        valuePropName='checked'
                        rules={[
                          {
                            validator: (_, value) =>
                              value
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error('Should accept agreement')
                                  ),
                          },
                        ]}
                      >
                        <Checkbox className='font-medium text-sm'>
                          I agree to the{' '}
                          <a className='text-primary underline'>Term of Use</a>{' '}
                          and{' '}
                          <a className='text-primary underline'>
                            Privacy Policy
                          </a>
                        </Checkbox>
                      </Form.Item>

                      <Form.Item className='mb-4'>
                        <Button
                          type='submit'
                          className='bg-primary font-bold px-8 py-4 text-base w-full'
                        >
                          Next
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          className='bg-primary-outline font-bold leading-4 px-8 py-4 text-base text-base text-primary w-full'
                          variant='outline'
                        >
                          <img
                            src='/images/icons/left-circle-arrow.png'
                            alt='default'
                            className='inline mr-2'
                          />
                          I already have an account
                        </Button>
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

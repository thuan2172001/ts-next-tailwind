/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Checkbox, Form, Input } from 'antd';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
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
          <div className='absolute background-image bg-gray-900 h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-6/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-8 px-4 py-10 lg:px-10'>
                    <div className='mb-5 text-center text-gray-500'>
                      <h3 className='font-medium'>Customer - Sign up</h3>
                      <p className='text-gray-500'>Sign up to your account</p>
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
                      className='mx-auto w-8/12'
                    >
                      <div>Email</div>
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
                        <Input />
                      </Form.Item>

                      <div>Phone number</div>
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
                        <Input />
                      </Form.Item>

                      <div>Password</div>
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
                        <Input.Password className='py-2' />
                      </Form.Item>

                      <div>Confirm password</div>
                      <Form.Item
                        style={{ marginBottom: '4px' }}
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
                        <Input.Password className='py-2' />
                      </Form.Item>

                      <Form.Item
                        name='isAgreeTerm'
                        style={{ marginBottom: '4px' }}
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
                        <Checkbox>
                          I agree to the{' '}
                          <a className='underline'>Term of Use</a> and{' '}
                          <a className='underline'>Privacy Policy</a>
                        </Checkbox>
                      </Form.Item>

                      <Form.Item>
                        <Button type='submit' color='blue' className='w-full'>
                          Sign up
                        </Button>
                      </Form.Item>
                    </Form>
                    <p className='text-center'>
                      Already have an account? &nbsp;
                      <UnstyledLink href='/signin' className='underline'>
                        Login
                      </UnstyledLink>
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

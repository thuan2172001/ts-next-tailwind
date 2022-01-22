/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { ResetPassword, VerifyOtp } from '@/api/user-service';
import { GenerateKeyPairAndEncrypt } from '@/utils/auth-cryptography';
import ui from '@/utils/ui';

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleResetPassword = async (e: any) => {
    const { password } = e;
    console.log(password);
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
      ui.alertFailed(err.message.toString());
    }
  };

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Seo templateTitle='Reset Password' />
      <main>
        <section className='absolute h-full w-full'>
          <div className='absolute h-full top-0 w-full'></div>
          <div className='container h-full mx-auto px-4'>
            <div className='content-center flex h-full items-center justify-center'>
              <div className='px-4 w-full lg:w-6/12'>
                <div className='bg-white border-0 break-words flex flex-col mb-6 min-w-0 relative rounded-lg shadow-lg w-full'>
                  <div className='flex-auto pt-8 px-4 py-10 lg:px-10'>
                    <div className='font-bold mb-5 text-center'>
                      <h3 className='font-bold font-medium text-2xl'>
                        Setup new password
                      </h3>
                    </div>
                    <Form
                      onFinish={handleResetPassword}
                      autoComplete='off'
                      initialValues={{ username: '', password: '' }}
                      layout='vertical'
                      className='mx-auto w-full'
                    >
                      <div className='mb-3 relative w-full'>
                        <div className='font-medium leading-4 mb-[4px] mt-4 pl-5 text-sm'>
                          Password
                        </div>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              pattern: new RegExp(
                                '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                              ),
                              message:
                                'Password must have at least 8 characters with 1 uppercase, 1 lowercase letter and 1 number',
                            },
                          ]}
                          name='password'
                        >
                          <Input.Password
                            className='font-medium leading-4 px-5 py-4 rounded-xl signup-input-password text-sm'
                            placeholder='Your password'
                          />
                        </Form.Item>
                      </div>
                      <div className='font-medium leading-4 mb-[8px] mt-4 pl-5 text-sm'>
                        Confirm your password
                      </div>
                      <Form.Item
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
                      <Form.Item className='mb-4'>
                        <Button
                          type='submit'
                          className='bg-primary font-bold px-8 py-4 text-base w-full'
                        >
                          Confirm
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

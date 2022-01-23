import { Form, Input } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

import { ChangePassword } from '@/api/user-service';
import { EXP } from '@/config/constant';
import { setUserInfo } from '@/reducer/auth.slice';
import {
  GenerateCertificate,
  GenerateKeyPairAndEncrypt,
  SymmetricDecrypt,
} from '@/utils/auth-cryptography';
import ui from '@/utils/ui';

export default function ChangePasswordPage() {
  const userInfo = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    const { newPass } = e;
    const { publicKey, encryptedPrivateKey, privateKey } =
      GenerateKeyPairAndEncrypt(newPass);
    ChangePassword({
      publicKey: publicKey,
      encryptedPrivateKey: encryptedPrivateKey,
    })
      .then(() => {
        const message = {
          id: userInfo.id,
          timestamp: new Date().getTime(),
          exp: EXP,
        };

        const certificate: any = GenerateCertificate(message, privateKey);

        const newUserInfo = {
          ...userInfo,
          _privateKey: privateKey,
          _certificate: certificate,
        };

        dispatch(setUserInfo(newUserInfo));

        ui.alertSuccess('Change Password Successfully');
      })
      .catch((err: any) => {
        ui.alertFailed(err.error.toString());
      });
  };

  function checkCrrPass(crrPass: string): boolean {
    const { encryptedPrivateKey } = userInfo;
    console.log(encryptedPrivateKey);
    const _privateKey = SymmetricDecrypt(encryptedPrivateKey, crrPass);
    return _privateKey === userInfo._privateKey;
  }

  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <div className='absolute content-center flex h-full items-center justify-center mx-auto w-full'>
        <div className='mx-auto rounded-lg shadow-lg sm:w-full lg:w-[400px]'>
          <TextDisplay
            text='Change your password'
            className='font-bold py-5 text-base text-center uppercase w-full sm:text-xl'
          ></TextDisplay>
          <div className='border-0 content-center justify-center pt-3'>
            <div className='font-medium mx-auto w-4/5'>
              <Form
                name='changePassword'
                onFinish={handleSubmit}
                layout='vertical'
                className='pb-3'
              >
                <Form.Item
                  label='Current Password'
                  name='crrPass'
                  rules={[
                    {
                      required: false,
                      message: 'Please input your password!',
                    },
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (checkCrrPass(value)) {
                          return Promise.resolve();
                        } else
                          return Promise.reject(
                            'Current password is incorrect'
                          );
                      },
                    }),
                  ]}
                  validateTrigger={['onBlur']}
                >
                  <Input.Password
                    placeholder='******'
                    className='font-medium focus:border-blue-500'
                  />
                </Form.Item>
                <Form.Item
                  label='New Password'
                  name='newPass'
                  rules={[
                    {
                      required: false,
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
                >
                  <Input.Password placeholder='******' />
                </Form.Item>
                <Form.Item
                  label='Confirm Password'
                  name='cfPass'
                  dependencies={['newPass']}
                  rules={[
                    {
                      required: false,
                      message: 'Please input your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPass') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Password do not match')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='******' />
                </Form.Item>
                <div className='align-right h-12 relative'>
                  <Button
                    color='blue'
                    variant='primary'
                    className='absolute mb-3 right-0 w-1/4'
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { Form, Input } from 'antd';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

export default function ChangePassword() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ham async await
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 24 },
    },
  };

  return (
    <Layout hiddenHeader={false} hiddenFooter={true}>
      <TextDisplay
        text='Change your password'
        className='font-bold py-5 text-center translate-y-10 uppercase w-full sm:text-xl md:text-3xl'
      ></TextDisplay>
      <div className='justify-center mx-auto pt-5 shadow shadow-gray-600 translate-y-20 sm:w-4/5 md:w-2/5'>
        <div className='justify-center mx-auto w-4/5'>
          <Form
            name='changePassword'
            onFinish={handleSubmit}
            layout='vertical'
            {...formItemLayout}
          >
            <Form.Item
              label='Current Password'
              name='crrPass'
              rules={[
                { required: false, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder='******' />
            </Form.Item>
            <Form.Item
              label='New Password'
              name='newPass'
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
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
              rules={[
                { required: true, message: 'Please input your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPass') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Password do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='******' />
            </Form.Item>
            <div className='h-12 relative'>
              <Button
                color='gray'
                variant='primary'
                className='absolute right-0'
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

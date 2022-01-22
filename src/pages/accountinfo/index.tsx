import { Button, Form, Input, Upload } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

export default function AccountInfoPage() {
  const userInfo = useSelector((state: any) => state.auth);
  console.log(userInfo);
  return (
    <Layout hiddenHeader={false} hiddenFooter={true}>
      <div className='head'>
        <TextDisplay text='Account Information' className='' />
        <TextDisplay text='Personal profile' className='' />
        <Upload name='logo' action='/upload.do' listType='picture'>
          <Button>Click to upload</Button>
        </Upload>
      </div>
      <div className='displayInfo'>
        <Form>
          <div className='flex'>
            <Form.Item name='firstname' className='border-2'>
              <label>First Name</label>
              <Input placeholder='xxxx' className='border-hidden' />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

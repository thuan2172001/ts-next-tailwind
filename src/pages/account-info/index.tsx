import { Col, Form, Input, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

import { GetCurrentInfoContact, GetUserInfo } from '@/api/user-service';
import ui from '@/utils/ui';

export default function AccountInfoPage() {
  const userInfo = useSelector((state: any) => state.auth);
  const { id }: { id: string } = userInfo;
  const [form] = Form.useForm();
  const [initInfo, setInitInfo] = React.useState({
    avatarUrl: '',
    firstName: '',
    lastName: '',
    mail: '',
    phone: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    zipcode: 0,
  });

  const getCrrInfoContact = () => {
    GetCurrentInfoContact(id)
      .then((response) => {
        const { data } = response;
        const { contact } = data;
        const { zipcode, address1, address2, state, city } = contact;
        setInitInfo({
          ...initInfo,
          address1,
          address2,
          state,
          city,
          zipcode,
        });
      })
      .catch((error: any) => ui.alertFailed(error.message.toString()));
  };
  const getCrrUsersInfo = () => {
    GetUserInfo(id).then((response) => {
      const { data } = response;
      const { user } = data;
      const { avatarUrl, mail, phone, firstName, lastName } = user;
      setInitInfo({ ...initInfo, avatarUrl, mail, phone, firstName, lastName });
    });
  };

  React.useEffect(() => {
    getCrrInfoContact();
    getCrrUsersInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    form.setFieldsValue(initInfo);
  }, [form, initInfo]);
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <div className='absolute flex h-full items-center justify-center w-full'>
        <div className='rounded-lg shadow-lg sm:w-full lg:w-[600px]'>
          <div className='mx-auto w-4/5'>
            <div>
              <TextDisplay
                text='Account Information'
                className='font-medium mx-auto py-3 text-3xl'
              />
              <TextDisplay
                text='Personal profile'
                className='font-medium pb-4 text-base'
              />
            </div>
          </div>
          <Form className='mx-auto w-4/5' form={form} autoComplete='off'>
            <Image
              src={initInfo.avatarUrl ? initInfo.avatarUrl : '/images/logo.svg'}
              width={100}
              height={100}
              alt='avatar'
              className='h-20 py-3 rounded-full shadow-md w-20'
            />
            <div className='items-center mt-4'>
              <Row justify='space-between'>
                <Col span={11}>
                  <Form.Item name='firstName'>
                    <Input
                      className='border-2'
                      prefix={<label>First Name</label>}
                      disabled={true}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name='lastName' className=''>
                    <Input
                      className='border-2'
                      prefix={<label>Last Name</label>}
                      disabled={true}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Form.Item name='mail' className=''>
              <Input className='' prefix='Your email address' disabled={true} />
            </Form.Item>
            <Form.Item name='phone' className=''>
              <Input
                className='disabled disabled:text-primary-200'
                prefix={<label>Your phone number</label>}
                value=''
                disabled={true}
              />
            </Form.Item>
            <label className='mb-3 text-2xl'>Contact infomation</label>
            <div className='mt-5'>
              <Form.Item name='address1'>
                <Input
                  prefix={<label>Address 1</label>}
                  value={initInfo.address1}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item name='address2'>
                <Input
                  type='text'
                  prefix={<label>Address 2 (Optinal)</label>}
                  value={initInfo.address2}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item name='state'>
                <Input prefix={<label>State</label>} disabled={true} />
              </Form.Item>
              <Form.Item name='city'>
                <Input prefix={<label>City</label>} disabled={true} />
              </Form.Item>
              <Form.Item name='zipcode'>
                <Input prefix={<label>Zipcode</label>} disabled={true} />
              </Form.Item>
            </div>
            <div className='align-right h-16 relative'>
              <Button
                color='blue'
                variant='primary'
                className='absolute mb-3 right-0 text-xs w-1/4'
              >
                <Link href='/'>Return homepage</Link>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
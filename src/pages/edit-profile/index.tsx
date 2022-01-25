import { Col, Form, Input, Row, Select, Upload } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

import {
  GetCurrentInfoContact,
  GetListStates,
  GetUserInfo,
  PutNewInfoContact,
  PutNewInfoUser,
} from '@/api/user-service';
import ui from '@/utils/ui';

export default function AccountInfoPage() {
  const userInfo = useSelector((state: any) => state.auth);
  const { id }: { id: string } = userInfo;
  const [states, setStates] = React.useState<[{ id: string; name: string }]>([
    { id: 'demo', name: 'demo' },
  ]);
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
  const getListStates = () => {
    GetListStates()
      .then((response) => {
        const { data } = response;
        const { states } = data;
        setStates(states);
      })
      .catch((error: any) => ui.alertFailed(error.message.toString()));
  };
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
  const handleSubmit = (e: any) => {
    const { zipcode, address1, address2, city } = e;
    const { avatarUrl, firstName, lastName } = e;
    const stateName = form.getFieldValue('state');
    let stateId = '';
    states.filter((state) => {
      if (state.name == stateName) {
        stateId = state.id;
        console.log(stateId);
        return;
      }
    });
    console.log({ zipcode, address1, address2, city });
    PutNewInfoContact(id, { zipcode, address1, address2, stateId, city })
      .then(() => {
        ui.alertSuccess('Update contact success!');
      })
      .catch((error: any) => ui.alertFailed(error.toString()));
    PutNewInfoUser(id, { avatarUrl, firstName, lastName })
      .then(() => {
        ui.alertSuccess('Update user profile success!');
      })
      .catch((error: any) => ui.alertFailed(error.toString()));
  };
  React.useEffect(() => {
    getListStates();
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
          <Form
            onFinish={handleSubmit}
            className='mx-auto w-4/5'
            form={form}
            autoComplete='off'
          >
            <Upload name='avatarUrl' action='/upload.do' listType='picture'>
              <button className="bg-[url('/images/logo.svg')] bg-center bg-no-repeat h-20 py-3 rounded-full shadow-md w-20 hover:shadow-blue-500" />
            </Upload>

            <div className='items-center mt-4'>
              <Row justify='space-between'>
                <Col span={11}>
                  <Form.Item
                    name='firstName'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                  >
                    <Input
                      className='border-2'
                      prefix={<label>First Name</label>}
                      type='text'
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name='lastName'
                    className=''
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
                    ]}
                  >
                    <Input
                      className='border-2'
                      prefix={<label>Last Name</label>}
                      type='text'
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
                disabled={true}
              />
            </Form.Item>
            <label className='mb-3 text-2xl'>Contact infomation</label>
            <div className='mt-5'>
              <Form.Item
                name='address1'
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <Input
                  prefix={<label>Address 1</label>}
                  value={initInfo.address1}
                  type='text'
                />
              </Form.Item>
              <Form.Item name='address2'>
                <Input
                  type='text'
                  prefix={<label>Address 2 (Optinal)</label>}
                  value={initInfo.address2}
                />
              </Form.Item>
              <Form.Item
                name='state'
                rules={[
                  { required: true, message: 'Please select your state!' },
                ]}
              >
                <Select placeholder='State'>
                  {states.map((state) => (
                    <Select.Option key={state.id} value={state.name}>
                      {state.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='city'
                rules={[
                  {
                    required: true,
                    message: 'Please input your city!',
                  },
                ]}
              >
                <Input prefix={<label>City</label>} type='text' />
              </Form.Item>
              <Form.Item
                name='zipcode'
                rules={[
                  { required: true, message: 'Please input your zipcode!' },
                ]}
              >
                <Input type='number' prefix={<label>Zipcode</label>} />
              </Form.Item>
            </div>
            <div className='align-right h-16 relative'>
              <Button
                color='blue'
                variant='primary'
                className='absolute mb-3 right-0 text-xs w-1/4'
              >
                Update profile
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

import { Col, Form, Input, Row, Select, Upload } from 'antd';
import * as React from 'react';

// import { useSelector } from 'react-redux';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TextDisplay from '@/components/TextDisplay';

import { GetListStates } from '@/api/user-service';
import ui from '@/utils/ui';

export default function AccountInfoPage() {
  // const userInfo = useSelector((state: any) => state.auth);
  // const { id } = userInfo;
  const getListStates = () => {
    GetListStates()
      .then((response) => {
        const listState = JSON.stringify(response);
        console.log(listState);
        // const data = listState.data;
        // const { states } = data;
        // console.log(states);

        return response;
      })
      .catch((error: any) => ui.alertFailed(error.message, toString()));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getListStates();
  };
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <div className='absolute flex h-full items-center justify-center w-full'>
        <div className='mx-auto rounded-lg shadow-lg sm:w-full lg:w-[600px]'>
          <div className='w-full'>
            <div>
              <TextDisplay
                text='Account Information'
                className='font-medium py-3 text-3xl'
              />
              <TextDisplay
                text='Personal profile'
                className='font-medium pb-4 text-base'
              />
            </div>
          </div>
          <Form onFinish={handleSubmit} className='mx-auto w-4/5'>
            <Upload name='avatar' action='/upload.do' listType='picture'>
              <button className="bg-[url('/images/logo.svg')] bg-center bg-no-repeat h-20 py-3 rounded-full shadow-md w-20 hover:shadow-blue-500" />
            </Upload>

            <div className='items-center mt-4'>
              <Row justify='space-between'>
                <Col span={11}>
                  <Form.Item name='firstName'>
                    <Input
                      className='border-2'
                      prefix={<label>First Name</label>}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name='lastName' className=''>
                    <Input
                      className='border-2'
                      prefix={<label>Last Name</label>}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Form.Item className=''>
              <Input
                className=''
                prefix='Your email address'
                value='trungtp1202@gmail.com'
                disabled={true}
              />
            </Form.Item>
            <Form.Item className=''>
              <Input
                className=''
                prefix={<label>Your phone number</label>}
                value='0986312202'
                disabled={true}
              />
            </Form.Item>
            <label className='mb-3 text-2xl'>Contact infomation</label>
            <div className='mt-5'>
              <Form.Item
                rules={[
                  { required: true, message: 'Please input your address 1!' },
                ]}
              >
                <Input
                  type='text'
                  name='address1'
                  prefix={<label>Address 1</label>}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: false, message: 'Please input your address 2!' },
                ]}
              >
                <Input
                  type='text'
                  name='address2'
                  prefix={<label>Address 2 (Optinal)</label>}
                />
              </Form.Item>
              <Form.Item name='state'>
                <Select prefixCls=''>
                  <Select.Option value='demo'>demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <Input type='text' name='city' prefix={<label>City</label>} />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: 'Please input your zipcode!' },
                ]}
              >
                <Input
                  type='text'
                  name='zipcode'
                  prefix={<label>Zipcode</label>}
                />
              </Form.Item>
            </div>
            <div className='align-right h-16 relative'>
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
    </Layout>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'antd/lib/modal/Modal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducer/store';

import { ModalType } from '@/config/interface';
import { removeModal } from '@/reducer/modals.slice';

import Button from '../buttons/Button';

export default function ModalManager() {
  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modals);
  function closeModal(id: number) {
    dispatch(removeModal(id));
  }
  const router = useRouter();

  function renderModal(i: any) {
    switch (i.type) {
      case ModalType.Alert:
        return (
          <Modal
            visible={true}
            closable={false}
            centered={true}
            bodyStyle={{ padding: '0px' }}
            footer={null}
          >
            <div key={i.id} className='w-full md:w-[500px]'>
              <div className='w-full md:w-[500px]'>
                <div className='py-8'>
                  <img
                    src='/images/icons/alert-icon.png'
                    className='h-12 mx-auto w-12'
                    alt='success'
                  />
                </div>
                <div className='text-black text-center'>
                  <div className='font-extrabold text-black text-xl'>
                    {i.title}
                  </div>
                  <div className='mt-1 text-sm'>{i.msg}</div>
                </div>
                <div className='flex justify-center mx-auto py-8 text-center w-1/3'>
                  <Button
                    className='w-full'
                    variant='primary'
                    onClick={() => {
                      closeModal(i.id);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        );
      case ModalType.Success:
        return (
          <Modal
            visible={true}
            closable={false}
            centered={true}
            bodyStyle={{ padding: '0px' }}
            footer={null}
          >
            <div key={i.id} className='w-full md:w-[500px]'>
              <div className='w-full md:w-[500px]'>
                <div className='py-8'>
                  <img
                    src='/images/icons/success-icon.png'
                    className='h-12 mx-auto w-12'
                    alt='success'
                  />
                </div>
                <div className='text-black text-center'>
                  <div className='font-extrabold text-black text-xl'>
                    {i.title}
                  </div>
                  <div className='mt-1 text-sm'>{i.msg}</div>
                </div>
                <div className='flex justify-center mx-auto py-8 text-center w-1/3'>
                  <Button
                    className='w-full'
                    variant='primary'
                    onClick={() => {
                      closeModal(i.id);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        );
      case ModalType.ResetPasswordSuccess:
        return (
          <Modal
            visible={true}
            closable={false}
            centered={true}
            bodyStyle={{ padding: '0px' }}
            footer={null}
          >
            <div key={i.id} className='w-full md:w-[500px]'>
              <div className='w-full md:w-[500px]'>
                <div className='py-8'>
                  <img
                    src='/images/icons/success-icon.png'
                    className='h-12 mx-auto w-12'
                    alt='success'
                  />
                </div>
                <div className='text-black text-center'>
                  <div className='font-extrabold text-black text-xl'>
                    {i.title}
                  </div>
                  <div className='mt-1 text-sm'>{i.msg}</div>
                </div>
                <div className='flex justify-center mx-auto py-8 text-center w-1/3'>
                  <Button
                    className='w-full'
                    variant='primary'
                    onClick={() => {
                      closeModal(i.id);
                      router.push('/signin');
                    }}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        );
      case ModalType.Failed:
        return (
          <Modal
            visible={true}
            closable={false}
            centered={true}
            bodyStyle={{ padding: '0px' }}
            footer={null}
          >
            <div key={i.id} className='w-full md:w-[500px]'>
              <div className='w-full md:w-[500px]'>
                <div className='py-8'>
                  <img
                    src='/images/icons/failed-icon.png'
                    className='h-12 mx-auto w-12'
                    alt='success'
                  />
                </div>
                <div className='text-black text-center'>
                  <div className='font-extrabold text-black text-xl'>
                    {i.title}
                  </div>
                  <div className='mt-1 text-sm'>{i.msg}</div>
                </div>
                <div className='flex justify-center mx-auto py-8 text-center w-1/3'>
                  <Button
                    className='w-full'
                    variant='primary'
                    onClick={() => {
                      closeModal(i.id);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        );
      case ModalType.MailOtp:
        return (
          <Modal
            visible={true}
            closable={false}
            centered={true}
            bodyStyle={{ padding: '0px 30px' }}
            footer={null}
          >
            <div key={i.id} className='w-full'>
              <div className='w-full'>
                <div className='py-8'>
                  <img
                    src='/images/icons/receive-mail.png'
                    className='h-12 mx-auto w-12'
                    alt='success'
                  />
                </div>
                <div className='text-black text-center'>
                  <div className='font-extrabold text-3xl text-black'>
                    {i.title}
                  </div>
                  <div className='mt-1 text-sm'>{i.msg}</div>
                </div>
                <div className='align-middle flex items-center justify-center mx-auto py-8 text-center w-full'>
                  <p>{`Didn't receive your code?`}</p>
                  <Button
                    className='ml-6 w-1/3'
                    variant='primary'
                    onClick={() => {
                      i.handleClick();
                      closeModal(i.id);
                    }}
                  >
                    Resend
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        );
    }
  }
  return <div>{modals.map((i: any) => renderModal(i))}</div>;
}

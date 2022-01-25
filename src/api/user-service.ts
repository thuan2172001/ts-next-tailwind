import axios from 'axios';

import { API_BASE_URL } from '@/config/constant';

export function GetCredential(data: { identifier: string }) {
  return axios.post(API_BASE_URL + '/auth/credential', { data });
}

export const Ping = () => {
  return axios.post(API_BASE_URL + '/auth/ping', {});
};

export const Signup = (data: {
  mail: string;
  phone: string;
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/users', { data });
};

export const ChangePassword = (data: {
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/auth/password', data);
};

export const ResetPassword = (data: {
  otp: string;
  otpId: string;
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/auth/forgot/reset', { data });
};

export const VerifyOtp = (data: { otp: string; otpId: string }) => {
  return axios.post(API_BASE_URL + '/auth/otp', { data });
};

export const RequestForgotPassword = (data: { mail: string }) => {
  return axios.post(API_BASE_URL + '/auth/forgot', { data });
};

export const GetListStates = () => {
  return axios.get(API_BASE_URL + '/contacts/states');
};

export const GetCurrentInfoContact = (id: string, userId?: string) => {
  return axios.get(API_BASE_URL + `/contacts/${id}?UserId=${userId}`);
};

export const GetUserInfo = (id: string) => {
  return axios.get(API_BASE_URL + `/users/${id}`);
};

export const PutNewInfoContact = (
  id: string,
  data: {
    zipcode: number;
    address1: string;
    address2?: string;
    stateId: string;
    city: string;
  }
) => {
  return axios.put(API_BASE_URL + `/contacts/${id}`, { data });
};

export const PutNewInfoUser = (
  id: string,
  data: {
    avatarUrl: string;
    firstName: string;
    lastName: string;
  }
) => {
  return axios.put(API_BASE_URL + `/users/${id}`, { data });
};

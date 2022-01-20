import axios from 'axios';

import { API_BASE_URL } from '@/config/constant';

export function GetCredential(username: string) {
  return axios.post(API_BASE_URL + '/auth/credential', { data: username });
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
  return axios.post(API_BASE_URL + '/users', data);
};

export const ChangePassword = (data: {
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/change-password', data);
};

export const ResetChangePassword = (data: {
  otp: string;
  otpId: string;
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/reset-password', { data: data });
};

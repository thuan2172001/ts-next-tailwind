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
  return axios.post(API_BASE_URL + '/auth/password', { data });
};

export const ResetChangePassword = (data: {
  otp: string;
  otpId: string;
  publicKey: string;
  encryptedPrivateKey: string;
}) => {
  return axios.post(API_BASE_URL + '/reset-password', { data });
};

export const VerifyOtp = (data: { otp: string; otpId: string }) => {
  return axios.post(API_BASE_URL + '/auth/otp', { data });
};

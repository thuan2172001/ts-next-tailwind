/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import FormData from 'form-data';
import qs from 'qs';

import { API_BASE_URL } from '@/config/constant';

import { SignMessage } from './auth-cryptography';

const _getActionModule = (_url: string) => {
  return _url
    .substr(API_BASE_URL.length)
    .replace(new RegExp('/', 'g'), '-')
    .substring(1);
};

const _setupAxios = (originAxios: any, auth: any) => {
  originAxios.interceptors.request.use(
    (config: any) => {
      config.paramsSerializer = (params: any) => {
        return qs.stringify(params, {
          allowDots: true,
          arrayFormat: 'comma',
          encode: false,
        });
      };
      if (!auth?._id) return config;
      config.headers.Authorization = `${JSON.stringify(auth._certificate)}`;
      if (config.method.toUpperCase() !== 'GET') {
        const _getActionType = () =>
          (
            config.method +
            '_' +
            _getActionModule(config.url ?? '/')
          ).toUpperCase();
        if (!config.data || !auth._privateKey) return config;
        if (config.data instanceof FormData) {
          config.data.append('_timestamp', new Date().toISOString());
          config.data.append('_actionType', _getActionType());
          const sig = { ...Object.fromEntries(config.data), file: undefined };
          const signature = SignMessage(auth._privateKey, sig);
          config.headers['Content-Type'] = 'multipart/form-data';
          config.data.append('_signature', signature);
          return config;
        }
        config.data = {
          ...config.data,
          _actionType: _getActionType(),
          _timestamp: new Date().toISOString(),
        };
        const bodySignature = SignMessage(auth._privateKey, config.data);
        config.data = {
          ...config.data,
          _signature: bodySignature,
        };
        return config;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );

  originAxios.interceptors.response.use(
    (next: any) => {
      if (!next.data.success) return Promise.reject(next.data.reason);
      return Promise.resolve(next.data.data);
    },
    (error: any) => {
      if (!error.response) return Promise.reject(error);
      const errorCode = error.response.data;
      if (
        errorCode === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD' ||
        errorCode.indexOf('AUTH.ERROR.') > -1
      ) {
        console.log(errorCode);
      }
      return Promise.reject(error);
    }
  );
};

export const createCustomAxios = (userInfo: {
  username: string;
  _privateKey: string;
  _id: string;
  _certificate: any;
}) => {
  const _axios = axios.create();
  _setupAxios(_axios, userInfo);
  return _axios;
};

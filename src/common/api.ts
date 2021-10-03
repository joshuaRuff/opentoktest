import axios, { AxiosPromise } from 'axios';

import { SERVER_BASE_URL } from '../config';

const getCredentials = (): AxiosPromise<any> => {
  const url = `${SERVER_BASE_URL}/session`;

  return axios({
    url,
    method: 'get',
  });
};

export default {
  getCredentials,
};

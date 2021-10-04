import axios, { AxiosPromise } from 'axios';

import { SERVER_BASE_URL } from '../config';

const getCredentials = (name: string): AxiosPromise<any> => {
  const url = `${SERVER_BASE_URL}room/${name}`;

  return axios({
    url,
    method: 'get',
  });
};

export default {
  getCredentials,
};

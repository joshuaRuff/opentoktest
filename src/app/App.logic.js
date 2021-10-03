/* eslint-disable no-console */
import { kea } from 'kea';
import api from '../common/api';

export default kea({
  path: () => ['app'],

  actions: {
    getCredentials: () => ({}),
    setCredentials: credentials => ({ credentials }),
    setLoading: loading => ({ loading }),
  },

  reducers: {
    credentials: [
      {},
      {
        setCredentials: (_, { credentials }) => credentials,
      },
    ],
    loading: [
      false,
      {
        setLoading: (_, { loading }) => loading,
      },
    ],
  },

  listeners: ({ actions }) => ({
    getCredentials: async () => {
      try {
        actions.setLoading(true);
        const response = await api.getCredentials();

        actions.setCredentials(response.data);
      } catch (error) {
        console.error('Error fetching credentials: ', error.message);
      } finally {
        actions.setLoading(false);
      }
    },
  }),
});

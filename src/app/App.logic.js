/* eslint-disable no-console */
import { kea } from 'kea';
import api from '../common/api';

export default kea({
  path: () => ['app'],

  actions: {
    getCredentials: name => ({ name }),
    setCredentials: credentials => ({ credentials }),
    setAudioStatus: status => ({ status }),
    setLoading: loading => ({ loading }),
    setVideoStatus: status => ({ status }),
  },

  reducers: {
    audioEnabled: [
      true,
      {
        setAudioStatus: (_, { status }) => status,
      },
    ],
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
    videoEnabled: [
      true,
      {
        setVideoStatus: (_, { status }) => status,
      },
    ],
  },

  listeners: ({ actions }) => ({
    getCredentials: async payload => {
      try {
        actions.setLoading(true);
        const response = await api.getCredentials(payload.name);

        actions.setCredentials(response.data);
      } catch (error) {
        console.error(
          'Error fetching Vontage Tokbox credentials: ',
          error.message,
        );
      } finally {
        actions.setLoading(false);
      }
    },
  }),
});

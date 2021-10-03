/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

import { Credentials } from '../../../common/types';

interface Props {
  credentials: Credentials;
}

const CallPage: React.FC<Props> = ({ credentials }: Props) => {
  const [error, setError] = useState<string>();
  const [connection, setStatus] = useState<string>('Connecting');
  const [publishVideo, toggleVideo] = useState<boolean>(true);

  const { apiKey, sessionId, token } = credentials;

  const sessionEventHandlers = {
    sessionConnected: () => {
      setStatus('Connected');
    },
    sessionDisconnected: () => {
      setStatus('Disconnected');
    },
    sessionReconnected: () => {
      setStatus('Reconnected');
    },
    sessionReconnecting: () => {
      setStatus('Reconnecting');
    },
  };

  const publisherEventHandlers = {
    accessDenied: () => {
      console.log('User denied access to media source');
    },
    streamCreated: () => {
      console.log('Publisher stream created');
    },
    streamDestroyed: ({ reason }: { reason: string }) => {
      console.log(`Publisher stream destroyed because: ${reason}`);
    },
  };

  const subscriberEventHandlers = {
    videoEnabled: () => {
      console.log('Subscriber video enabled');
    },
    videoDisabled: () => {
      console.log('Subscriber video disabled');
    },
  };

  const onSessionError = useCallback((sessionError: any) => {
    setError(sessionError);
  }, []);

  const onPublish = useCallback(() => {
    console.log('Publish Success');
  }, []);

  const onPublishError = useCallback((publishError: any) => {
    setError(publishError);
  }, []);

  const onSubscribe = useCallback(() => {
    console.log('Subscribe Success');
  }, []);

  const onSubscribeError = useCallback((subscribeError: any) => {
    setError(subscribeError);
  }, []);

  return (
    <div>
      <div id="sessionStatus">Session Status: {connection}</div>
      {error ? (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      ) : null}
      <OTSession
        apiKey={apiKey}
        sessionId={sessionId}
        token={token}
        onError={onSessionError}
        eventHandlers={sessionEventHandlers}
      >
        <button
          type="button"
          id="videoButton"
          onClick={() => toggleVideo(!publishVideo)}
        >
          {publishVideo ? 'Disable' : 'Enable'} Video
        </button>

        <OTPublisher
          properties={{ publishVideo, width: 260, height: 160 }}
          onPublish={onPublish}
          onError={onPublishError}
          eventHandlers={publisherEventHandlers}
        />
        <OTStreams>
          <OTSubscriber
            properties={{ width: 360, height: 240 }}
            onSubscribe={onSubscribe}
            onError={onSubscribeError}
            eventHandlers={subscriberEventHandlers}
          />
        </OTStreams>
      </OTSession>
    </div>
  );
};

export default CallPage;

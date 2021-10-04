/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

import { useActions, useValues } from 'kea';
import AppLogic from '../../App.logic';

const CallPage: React.FC = () => {
  const { getCredentials, setAudioStatus, setVideoStatus } =
    useActions(AppLogic);
  const { audioEnabled, credentials, videoEnabled } = useValues(AppLogic);
  const publisherRef = useRef(null);

  const [error, setError] = useState<string>();
  const [connection, setStatus] = useState<string>('Connecting');

  const { apiKey, sessionId, token } = credentials;

  useEffect(() => {
    if (!apiKey || !sessionId || !token) {
      getCredentials();
    }
  }, []);

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
          onClick={() => setAudioStatus(!audioEnabled)}
        >
          {audioEnabled ? 'Disable' : 'Enable'} Audio
        </button>
        <button
          type="button"
          id="videoButton"
          onClick={() => setVideoStatus(!videoEnabled)}
        >
          {videoEnabled ? 'Disable' : 'Enable'} Video
        </button>

        <OTPublisher
          properties={{
            publishAudio: audioEnabled,
            publishVideo: videoEnabled,
            width: 260,
            height: 160,
          }}
          onPublish={onPublish}
          onError={onPublishError}
          eventHandlers={publisherEventHandlers}
          ref={publisherRef}
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

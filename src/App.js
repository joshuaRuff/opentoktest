import React, { useState } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

const App = (props) => {
  const [error, setError] = useState(null);
  const [connection, setStatus] = useState('Connecting');
  const [publishVideo, toggleVideo] = useState(true);
  
  const { apiKey, sessionId, token } = props.credentials;

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
    streamDestroyed: ({ reason }) => {
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

  function onSessionError(error) {
    setError(error);
  };

  function onPublish() {
    console.log('Publish Success');
  };

  function onPublishError(error) {
    setError(error);
  };

  function onSubscribe() {
    console.log('Subscribe Success');
  };

  function onSubscribeError(error) {
    setError(error);
  };

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
        <button id="videoButton" onClick={() => toggleVideo(!publishVideo)}>
          {publishVideo ? 'Disable' : 'Enable'} Video
        </button>

        <OTPublisher
          properties={{ publishVideo, width: 260, height: 160, }}
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
}

export default App;
import React, { useCallback } from 'react';
import Webcam from 'react-webcam';

import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { useActions, useValues } from 'kea';
import AppLogic from '../../App.logic';

import WaitingRoomStyled from './WaitingRoom.styled';

const LandingPage: React.FC = () => {
  const { setAudioStatus, setVideoStatus } = useActions(AppLogic);
  const { audioEnabled, credentials, loading, roomId, videoEnabled } =
    useValues(AppLogic);

  const history = useHistory();

  const onJoin = useCallback(
    () => history.push(`/session/${credentials.sessionId}`),
    [],
  );

  const toggleAudio = useCallback(
    () => setAudioStatus(!audioEnabled),
    [audioEnabled],
  );

  const toggleVideo = useCallback(
    () => setVideoStatus(!videoEnabled),
    [videoEnabled],
  );

  return (
    <WaitingRoomStyled>
      {loading && (
        <Loader type="TailSpin" color="#363636" height={100} width={100} />
      )}
      {!loading && (
        <>
          <div className="sm-column">
            {videoEnabled ? (
              <Webcam className="sm-preview-cam" />
            ) : (
              <img
                alt="no video"
                className="sm-preview-cam"
                src="https://storage.sardius.media/-F3gEki2EeAOjKwDl8iC/archives/D7742FeA51811363c28DCC7E60eA/static/f96D09/b466B33cAF8C.jpg?width=500"
              />
            )}

            <div className="videoActions">
              <button
                className={`sm-button ${!audioEnabled && 'sm-button-off'}`}
                onClick={toggleAudio}
                type="button"
              >
                {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
              </button>
              <button
                className={`sm-button ${!videoEnabled && 'sm-button-off'}`}
                onClick={toggleVideo}
                type="button"
              >
                {videoEnabled ? 'Disable Video' : 'Enable Video'}
              </button>
            </div>
          </div>

          <div className="sm-column">
            <h1 className="sm-title">WebRTC Meet</h1>
            <button className="sm-button" onClick={onJoin} type="button">
              Join now
            </button>
            <p>
              Share Link:{' '}
              <span className="sm-shareLink">{`https://determined-swanson-e5048c.netlify.app/?room=${roomId}`}</span>
            </p>
          </div>
        </>
      )}
    </WaitingRoomStyled>
  );
};

export default LandingPage;

import React, { useCallback, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { useActions, useValues } from 'kea';
import AppLogic from '../../App.logic';

import LandingPageStyled from './LandingPage.styled';

const LandingPage: React.FC = () => {
  const { getCredentials, setRoomId } = useActions(AppLogic);
  const { credentials, loading, roomId } = useValues(AppLogic);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlRoomId = params.get('room');

    if (urlRoomId) {
      setRoomId(urlRoomId);
      getCredentials(urlRoomId);
    }
  }, [location]);

  useEffect(() => {
    if (roomId && credentials?.sessionId) {
      history.push(`join/${roomId}`);
    }
  }, [credentials, roomId]);

  const createMeeting = useCallback(() => {
    const newRoomId = Math.random().toString(36).slice(2);
    setRoomId(newRoomId);
    getCredentials(newRoomId);
  }, []);

  return (
    <LandingPageStyled>
      <div className="sm-page">
        <div className="sm-container">
          <div className="sm-column">
            <div className="sm-header">
              Secure video conferencing for everyone
            </div>
            <div className="sm-subtitle">
              Connect, collaborate, and celebrate from anywhere with Ruffalo
              Meet
            </div>
            <div className="sm-actionContainer">
              <div className="sm-actions">
                <button
                  className="sm-button"
                  type="button"
                  onClick={createMeeting}
                >
                  Create New Meeting
                </button>
                {loading ? (
                  <Loader
                    type="TailSpin"
                    color="#363636"
                    height={50}
                    width={50}
                  />
                ) : (
                  <p>
                    {credentials?.sessionId
                      ? `Meeting Link: ${credentials?.sessionId}`
                      : ''}
                  </p>
                )}

                {/* Future Join Meeting Input */}
                {/* <input
                  className="sm-input"
                  type="text"
                  placeholder="Enter Room Id"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageStyled>
  );
};

export default LandingPage;

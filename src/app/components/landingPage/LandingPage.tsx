import { useActions, useValues } from 'kea';
import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';

import AppLogic from '../../App.logic';

import LandingPageStyled from './LandingPage.styled';

const LandingPage: React.FC = () => {
  const { getCredentials } = useActions(AppLogic);
  const { loading } = useValues(AppLogic);

  useEffect(() => {
    getCredentials();
  }, []);

  return (
    <LandingPageStyled>
      {loading && (
        <Loader type="TailSpin" color="#363636" height={100} width={100} />
      )}
      {!loading && (
        <>
          <div className="sm-column">
            <p>Video Preview Here</p>
          </div>
          <div className="sm-column">
            <h1 className="sm-title">Sardius Meet</h1>
            <button className="joinButton" type="button">
              Join now
            </button>
          </div>
        </>
      )}
    </LandingPageStyled>
  );
};

export default LandingPage;

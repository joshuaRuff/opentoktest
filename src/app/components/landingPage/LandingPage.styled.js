import styled from 'styled-components';

export default styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-around;
  padding: 50px 0px;

  .videoActions {
    display: flex;
    justify-content: center;
  }

  .sm-preview-cam {
    max-width: 500px;
    width: 100%;
  }

  .sm-button {
    background-color: #1a73e8;
    border: none;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: #fefefe;
    cursor: pointer;
    font-weight: bold;
    margin: 5px;
    min-width: 100px;
    padding: 15px 24px;
  }

  .sm-button-off {
    background-color: red;
  }

  .sm-column {
    justify-content: center;
    min-width: 315px;
    text-align: center;
  }
`;

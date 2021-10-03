import styled from 'styled-components';

export default styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  padding: 50px 50px;

  .joinButton {
    background-color: #1a73e8;
    border: none;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: #fefefe;
    cursor: pointer;
    font-weight: bold;
    padding: 15px 24px;
  }

  .sm-column {
    padding: 20px 50px;
    text-align: center;
    width: 50%;
  }
`;

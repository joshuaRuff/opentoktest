import styled from 'styled-components';

export default styled.div`
  height: auto;
  min-height: 100%;
  position: relative;

  .sm-page {
    height: calc(100vh - 64px);
    min-height: 100%;
    width: 100vw;
    overflow-y: auto;
    font-size: 1rem;
    animation: 1s ease-in fadeIn 0s forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .sm-container {
    align-items: center;
    display: -webkit-inline-box;
    display: flex;
    justify-content: space-evenly;
    min-height: 100%;
    width: 100vw;
  }

  .sm-column {
    display: inline-flex;
    flex-basis: 35rem;
    flex-direction: column;
    flex-shrink: 1;
    max-width: 35rem;
    padding: 1em 3em;
  }

  .sm-header {
    font-size: 2.75rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 3.25rem;
    padding-bottom: 0.5em;
  }

  .sm-subtitle {
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;
    color: #5f6368;
    color: var(--gm-color-caption, #5f6368);
    max-width: 30rem;
    padding-bottom: 3em;
  }

  .sm-actionContainer {
    align-self: flex-start;
  }

  .sm-actions {
    display: flex;
    flex-wrap: wrap;
  }

  .sm-input {
    border: 1px solid #e6e6e6;
    background-color: #fff;
    font-size: 14px;
    padding: 10px;
  }
`;

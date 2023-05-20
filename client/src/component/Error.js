import styled from "styled-components";
import { Icon } from "@iconify/react";

const Error = () => {
  return (
    <DivError>
      <Icon icon="noto:bomb" width="60px" />
      <ErrorMsgOne> An unknown error has occurred.</ErrorMsgOne>
      <ErrorMsgTwo>
        Please try refreshing the page, or{" "}
        <a href="https://github.com/MojtabaMasoudinejad">contact support</a> if
        the problem persists
      </ErrorMsgTwo>
    </DivError>
  );
};

export default Error;

const DivError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 300px;
  top: 130px;
`;

const ErrorMsgOne = styled.div`
  font-size: x-large;
  font-weight: bold;
  padding: 15px;
`;

const ErrorMsgTwo = styled.div`
  font-size: large;
`;

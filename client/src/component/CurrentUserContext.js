import { createContext, useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUsersData, setCurrentUsersData] = useState(null);
  const [error, setError] = useState(false);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => {
        if (res.status >= 400) {
          return setError(true), res.json();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setCurrentUsersData(data);
      });
  }, []);

  if (!error) {
    if (!currentUsersData) {
      return (
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      );
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUsersData,
        setCurrentUsersData,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  top: 40px;
  left: 500px;
`;

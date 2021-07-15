import React from "react";
import styled, { keyframes } from "styled-components";

const Typing = styled.div`
  display: flex;
  padding: 4px 2px;
  position: relative;
`;

const typinganimate1 = keyframes`
  0% {
    opacity: 0.3;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  75% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.3;
  }
`;

const typinganimate2 = keyframes`
  0% {
    opacity: 0.3;
  }

  25% {
    opacity: 0.3;
  }

  50%{
    opacity: 1;
  }

  75% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.3;
  }
`;

const typinganimate3 = keyframes`
  0% {
    opacity: 0.3;
  }

  25%{
    opacity: 0.3;
  }

  50%{
    opacity: 0.3;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
`;

const Dot = styled.div`
  margin: 0 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: white;

  &:nth-child(1) {
    animation: ${typinganimate1} 1.5s linear infinite;
  }

  &:nth-child(2) {
    animation: ${typinganimate2} 1.5s linear infinite;
  }

  &:nth-child(3) {
    animation: ${typinganimate3} 1.5s linear infinite;
  }
`;

const TypingMess = () => {
  return (
    <Typing>
      <Dot />
      <Dot />
      <Dot />
    </Typing>
  );
};

export default TypingMess;

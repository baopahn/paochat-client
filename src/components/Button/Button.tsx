import styled from "styled-components";

export const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background-color: ${({ theme }) => theme.button};

  transition: opacity 0.1s;

  &:hover {
    opacity: 0.65;
  }
`;

export const IconButton = styled(Button)<{
  size?: string;
  margin?: string;
}>`
  width: ${({ size }) => size || "35px"};
  height: ${({ size }) => size || "35px"};
  margin: ${({ margin }) => margin || "0"};
  border-radius: 50%;
  fill: ${({ theme }) => theme.icon};
`;

export default Button;

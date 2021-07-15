import styled from "styled-components";

export const Text = styled.p`
  color: ${({ theme }) => theme.text};
  background-color: unset;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const def = { Text, Img };

export default def;

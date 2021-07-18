import styled from "styled-components";

const Overlay = styled.div`
  background-color: ${({ theme }) => theme.overlay};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default Overlay;

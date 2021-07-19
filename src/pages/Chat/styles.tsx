import Button from "components/Button/Button";
import styled from "styled-components";

export const ChatWrap = styled.div`
  margin-top: 2px;
  height: inherit;
`;

export const ChatContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 180px);
  margin-bottom: 2px;
  display: flex;
  flex-direction: column-reverse;
`;

export const ChatType = styled.form`
  height: 60px;
  box-shadow: 0 -1px 4px ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export const ChatInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

export const SendButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  background-color: unset;
  fill: ${({ theme }) => theme.icon};
`;

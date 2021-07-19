import Overlay from "components/Overlay/Overlay";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Handler } from "./types";

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  onDismiss: Handler;
}

export const ModalContext = React.createContext<ModalContextProps>({
  isOpen: true,
  setIsOpen: () => null,
  setModalNode: () => null,
  onDismiss: () => null,
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>(null);

  const handleDismiss = (): void => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        setModalNode,
        onDismiss: handleDismiss,
      }}
    >
      {isOpen && (
        <ModalContextWrapper>
          <Overlay />
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              onDismiss: handleDismiss,
            })}
        </ModalContextWrapper>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (node: React.ReactNode): [Handler, Handler] => {
  const { setModalNode, setIsOpen } = useContext(ModalContext);
  const onPresent = (): void => {
    setModalNode(node);
    setIsOpen(true);
  };
  const onDismiss = (): void => {
    setIsOpen(false);
    setModalNode(null);
  };

  return [onPresent, onDismiss];
};

interface ModalProps {
  onDismiss: Handler;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ onDismiss, children }) => {
  const minWidth = "400px";

  return (
    <ModalWrap>
      <ModalHead>Modal Head</ModalHead>
      <ModalContainer minWidth={minWidth}>{children}</ModalContainer>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  background-color: ${({ theme }) => theme.menu};
  padding: 20px;
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zIndexModal};
`;

const ModalHead = styled.div`
  background: yellow;
`;

const ModalContainer = styled.div<{ minWidth: string }>`
  min-width: ${({ minWidth }) => minWidth};
  background-color: ${({ theme }) => theme.background};
`;

const ModalContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndexModal - 1};
`;

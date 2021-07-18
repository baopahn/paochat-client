import Overlay from "components/Overlay/Overlay";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Hander } from "./types";

interface ModalContextProps {
  isOpen: boolean;
  modalNode: React.ReactNode;
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  onPresent: (node: React.ReactNode) => void;
  onDismiss: Hander;
}

export const ModalContext = React.createContext<ModalContextProps>({
  isOpen: false,
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>(null);

  const handlePresent = () => {};
  const handleDismiss = () => {};

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {isOpen && (
        <ModalWrapper>
          <Overlay />
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              onDismiss: handleDismiss,
            })}
        </ModalWrapper>
      )}
      {children}
    </ModalContext.Provider>
  );
};

// export const userModal = () => {};

// const ModalContainer = styled.div<{ minWidth: string }>`
//   min-width: ${({ minWidth }) => minWidth};
//   background-color: ${({ theme }) => theme.background};
// `;

const ModalWrapper = styled.div`
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

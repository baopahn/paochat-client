import { uploadFile } from "api/feature";
import Button from "components/Button/Button";
import { Img } from "components/Layout/ElementCustom";
import { ModalContext } from "contexts/ModalProvider";
import { Handler } from "contexts/types";
import React, { useContext, useRef, useState } from "react";
import { BiImage, BiSend } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import UseAnimations from "react-useanimations";
import { useAppDispatch } from "state";
import { sendMess } from "state/chats";
import styled, { ThemeContext } from "styled-components";
import ImageDefaultDark from "../../asserts/image/default-dark.png";
import ImageDefaultLight from "../../asserts/image/default-light.png";
import loading2 from "react-useanimations/lib/loading2";

const CustomButton = styled(Button)`
  padding: 0;
  width: fit-content;
  height: fit-content;
  background-color: unset;
  fill: ${({ theme }) => theme.icon};
  color: ${({ theme }) => theme.icon};
`;

const LabelFor = styled.label`
  cursor: pointer;
`;

const ModalWrap = styled.div`
  background-color: ${({ theme }) => theme.modal};
  padding: 10px;
  border-radius: 8px;
  z-index: ${({ theme }) => theme.zIndexModal};
  width: 300px;
  min-height: 250px;
  position: relative;
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContainer = styled.div`
  height: 220px;
  margin: 4px 0 8px;
  border-style: solid;
  border-color: ${({ theme }) => theme.border};
  border-width: 1px;
  overflow: hidden;
  border-radius: 5px;

  img {
    object-fit: contain;
  }
`;

const ModalAction = styled.div`
  display: flex;
  align-items: center;
`;

const ModalInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 6px 6px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.icon};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: unset;
`;

const InputFile = styled.input`
  display: none;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zIndexModal + 2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface UploadModalProps {
  onDismiss?: Handler;
}
const UploadModal: React.FC<UploadModalProps> = ({ onDismiss }) => {
  const dispatch = useAppDispatch();
  const { onDismiss: onDismissOrigin } = useContext(ModalContext);
  const [file, setFile] = useState<File>(null);
  const [inputMess, setInputMess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isDark, primary } = useContext(ThemeContext);
  const refImage = useRef(null);
  const src = isDark ? ImageDefaultDark : ImageDefaultLight;

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    refImage.current.src = URL.createObjectURL(file);
  };

  const handleDismiss = () => {
    onDismiss();
    onDismissOrigin();
  };

  const handleSend = async () => {
    if (!file) return;
    setLoading(true);
    const url = await uploadFile(file);

    if (url) dispatch(sendMess({ message: url, type: "image" }));
    if (inputMess) dispatch(sendMess({ message: inputMess, type: "text" }));
    setLoading(false);
    onDismissOrigin();
  };

  return (
    <ModalWrap>
      {loading && (
        <Loading>
          <UseAnimations
            animation={loading2}
            size={40}
            style={{ padding: 100 }}
            strokeColor={primary}
          />
        </Loading>
      )}
      <ModalHead>
        <CustomButton>
          <LabelFor htmlFor="input-image">
            <BiImage size="22px" style={{ fill: "inherit" }} />
          </LabelFor>
        </CustomButton>
        <CustomButton onClick={handleDismiss}>
          <FiXCircle size="20px" style={{ color: "inherit" }} />
        </CustomButton>
      </ModalHead>
      <ModalContainer>
        <Img ref={refImage} src={src} />
      </ModalContainer>
      <ModalAction>
        <ModalInput
          placeholder="Aa"
          value={inputMess}
          onChange={({ target }) => setInputMess(target.value)}
        />

        <CustomButton onClick={handleSend}>
          <BiSend size="20px" style={{ fill: "inherit" }} />
        </CustomButton>
      </ModalAction>

      <InputFile
        type="file"
        id="input-image"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChangeImage}
      />
    </ModalWrap>
  );
};

export default UploadModal;

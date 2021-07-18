import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const UploadWrap = styled.div`
  margin: 0 20px;
  cursor: pointer;
  position: relative;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label``;

const PreviewImg = styled.img`
  position: absolute;
  top: 100%;
  right: 0;

  min-width: 200px;
  height: 200px;
`;

const Upload = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const refPreview = useRef(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        refPreview.current.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <UploadWrap>
      <Label htmlFor="input-file">Upload</Label>
      <InputFile
        type="file"
        id="input-file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <PreviewImg ref={refPreview} />
    </UploadWrap>
  );
};

export default Upload;

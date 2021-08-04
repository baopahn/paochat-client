import { useAuth } from "contexts/AuthProvider";
import { useQuery } from "hooks/useQuery";
import React, { useEffect, useRef, useState } from "react";
import { HiPhoneMissedCall } from "react-icons/hi";
import UseAnimations from "react-useanimations";
import microphone2 from "react-useanimations/lib/microphone2";
import video2 from "react-useanimations/lib/video2";
import styled from "styled-components";

const CallWrap = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CallAction = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);

  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
  opacity: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: opacity 0.15s ease-in;
`;

const CustomButton = styled.div`
  background-color: unset;
  border-radius: 5px;
  width: 70px;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MyVideo = styled.video`
  position: absolute;
  bottom: 8px;
  right: 10px;
  border-radius: 8px;

  width: 250px;
  height: 150px;
  object-fit: contain;
  object-position: center;
  background-color: #000;

  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */

  border: 1px solid;
  &:hover {
    border-color: #fff;
  }
`;

const MainVideoWrap = styled.div`
  width: 80%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  &:hover > ${CallAction} {
    opacity: 1;
  }
  text-align: center;
`;

const FriendVideo = styled.video`
  width: 100%;
  height: inherit;
  object-fit: cover;
  object-position: center;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
  background-color: #000;
`;

const Call = () => {
  const query = useQuery();
  const myVideoRef = useRef(null);
  const friendVideoRef = useRef(null);
  const connection = useRef(null);
  const [stream, setStream] = useState(null);
  const { userInfo } = useAuth();

  const streamVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setStream(stream);
    myVideoRef.current.srcObject = stream;
  };

  useEffect(() => {
    streamVideo();
  }, []);

  return (
    <CallWrap>
      <MainVideoWrap>
        <FriendVideo autoPlay ref={friendVideoRef} />
        <CallAction>
          <CustomButton>
            <UseAnimations
              animation={microphone2}
              size={28}
              speed={4}
              style={{
                padding: 100,
                fill: "#fff",
                color: "#fff",
                cursor: "pointer",
              }}
              strokeColor="#fff"
            />
          </CustomButton>

          <CustomButton>
            <UseAnimations
              animation={video2}
              size={30}
              speed={4}
              style={{
                padding: 100,
                fill: "#fff",
                color: "#fff",
                cursor: "pointer",
              }}
              strokeColor="#fff"
            />
          </CustomButton>

          <CustomButton>
            <HiPhoneMissedCall color="red" size={20} />
          </CustomButton>
        </CallAction>
      </MainVideoWrap>
      <MyVideo autoPlay ref={myVideoRef} />
    </CallWrap>
  );
};

export default Call;

import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiShare, FiHeart } from "react-icons/fi";
import { useState } from "react";

const SmallTweet = (props) => {
  const {
    displayName,
    handle,
    avatarSrc,
    timestamp,
    status,
    mediaImage,
    tweetId,
  } = props;

  const [heart, setHeart] = useState(0);

  const navigate = useNavigate();

  const clickOnIconHandler = () => {
    if (heart === 0) {
      setHeart(heart + 1);
    } else if (heart === 1) {
      setHeart(heart - 1);
    }
  };

  const showTweetDetailsHandler = (event) => {
    event.stopPropagation();
    navigate(`/tweet/${tweetId}`);
  };

  return (
    <MainDiv>
      <Tweet onClick={showTweetDetailsHandler}>
        <AvatarImg src={avatarSrc} alt="Avatar " />

        <div>
          <DisplayInfo>
            <DisplayName
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/${handle}`);
              }}
              style={{
                marginRight: "10px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {displayName}
            </DisplayName>
            <Handle style={{ marginRight: "10px" }}>@{handle}.</Handle>
            <div style={{ marginRight: "10px" }}>
              {format(new Date(timestamp), "MMM d")}
            </div>
          </DisplayInfo>
          <Status>{status}</Status>
          {mediaImage.length === 0 ? (
            ""
          ) : (
            <MediaImg src={mediaImage} alt="media" />
          )}
        </div>
      </Tweet>
      <IconDiv>
        <ButtonIcon>
          <FaRegComment />
        </ButtonIcon>
        <ButtonIcon>
          <AiOutlineRetweet />
        </ButtonIcon>
        <ButtonIcon onClick={clickOnIconHandler}>
          <FiHeart
            style={{
              fill: heart === 1 ? "red" : "",
            }}
          />
          <InputNumIcon
            style={{ visibility: heart === 1 ? "" : "hidden" }}
            type="text"
            value={heart}
            onChange={clickOnIconHandler}
          />
        </ButtonIcon>
        <ButtonIcon>
          <FiShare />
        </ButtonIcon>
      </IconDiv>
    </MainDiv>
  );
};

export default SmallTweet;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  border-top: none;
`;

const Tweet = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: none;
  width: 800px;
  padding-top: 20px;
  padding-left: 10px;
  text-decoration: none;
  color: black;
  :hover {
    cursor: pointer;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const DisplayInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MediaImg = styled.img`
  border-radius: 10px;
  height: 400px;
  width: 600px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 600px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: none;
`;

const InputNumIcon = styled.input`
  border: none;
  width: 15px;
  font-size: smaller;
`;

const DisplayName = styled.a`
  border: none;
  text-decoration: none;
  color: black;
  background-color: white;
  :hover {
    background-color: #ecf0f1;
  }
`;

const Handle = styled.div`
  background-color: white;
  border: none;
  text-decoration: none;
  color: black;
`;

const Status = styled.p`
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 15px;
  max-width: 100%;
  border: none;
  resize: none;
  font-family: sans-serif;
`;

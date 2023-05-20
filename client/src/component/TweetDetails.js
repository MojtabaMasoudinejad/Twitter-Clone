import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";

import { UserContext } from "./CurrentUserContext";

import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiShare, FiHeart } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";

const TweetDetails = () => {
  const { twwetId } = useParams();

  const { error, setError } = useContext(UserContext);
  const [tweetInfo, setTweetInfo] = useState(null);
  const [heart, setHeart] = useState(0);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    fetch(`/api/tweet/${twwetId}`)
      .then((res) => {
        if (res.status >= 400) {
          setError(true);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTweetInfo(data);
      });
  }, []);

  if (!tweetInfo) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  if (error) {
    return (
      <DivError>
        <Icon icon="noto:bomb" width="60px" />
        <ErrorMsgOne> An unknown error has occurred.</ErrorMsgOne>
        <ErrorMsgTwo>
          Please try refreshing the page, or{" "}
          <a href="https://github.com/MojtabaMasoudinejad">contact support</a>{" "}
          if the problem persists
        </ErrorMsgTwo>
      </DivError>
    );
  }

  const clickOnIconHandler = () => {
    if (heart === 0) {
      setHeart(heart + 1);
    } else if (heart === 1) {
      setHeart(heart - 1);
    }
  };

  return (
    <Tweet>
      <AvatarNameHandler>
        <div>
          <AvatarImg src={tweetInfo.tweet.author.avatarSrc} alt="Avatar " />
        </div>
        <DisplayInfo>
          <DisplayName
            href={`/${tweetInfo.tweet.author.handle}`}
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {tweetInfo.tweet.author.displayName}
          </DisplayName>
          <Handle style={{ marginRight: "40px" }}>
            @{tweetInfo.tweet.author.handle}.
          </Handle>
        </DisplayInfo>
      </AvatarNameHandler>
      <div>
        <p
          style={{
            fontSize: "18px",
            marginTop: "35px",
            marginBottom: "35px",
            width: "700px",
            border: "none",
            resize: "none",
            fontFamily: "sans-serif",
          }}
        >
          {tweetInfo.tweet.status}
        </p>
        {tweetInfo.tweet.media.length === 0 ? (
          ""
        ) : (
          <MediaImg src={tweetInfo.tweet.media[0].url} alt="media" />
        )}
        <div style={{ margin: "15px 0", fontSize: "17px" }}>
          {format(new Date(tweetInfo.tweet.timestamp), "h:m aa . MMM d y")}
          {" . "}
          Critter web app
        </div>
        <hr />
        <IconDiv style={{ marginTop: "15px " }}>
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
      </div>
    </Tweet>
  );
};

export default TweetDetails;
const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  top: 40px;
  left: 500px;
`;

const DivError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 300px;
  top: 130px;
`;

const ErrorMsgOne = styled.div`
  font-size: x-large;
  font-weight: bold;
  padding: 15px;
`;

const ErrorMsgTwo = styled.div`
  font-size: large;
`;

const Tweet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  width: 800px;
  padding-top: 20px;
  padding-left: 10px;
  text-decoration: none;
  color: black;
`;

const AvatarNameHandler = styled.div`
  display: flex;
  margin-left: -500px;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const DisplayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MediaImg = styled.img`
  border-radius: 10px;
  height: 400px;
  width: 700px;
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
`;

const Handle = styled.div`
  background-color: white;
  border: none;
  text-decoration: none;
  color: black;
`;

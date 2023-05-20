import styled, { keyframes } from "styled-components";

import { useState, useEffect, useContext } from "react";

import SmallTweet from "./SmallTweet";
import { COLORS } from "../Constants";

import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Icon } from "@iconify/react";

import { UserContext } from "./CurrentUserContext";

const HomeFeed = () => {
  const [tweetIds, setTweetIds] = useState(null);
  const [tweetsById, setTweetsById] = useState(null);
  const [newTweetCaracter, setNewTweetCaracter] = useState(280);
  const [newTweetText, setnewTweetText] = useState("");
  const [postTweet, setPostTweet] = useState([]);

  const { currentUsersData, error, setError } = useContext(UserContext);

  const SpinnerIcon = withBaseIcon({ size: 50 });

  const NewTweetHandler = (e) => {
    e.preventDefault();

    if (newTweetCaracter >= 0 && newTweetCaracter < 279) {
      fetch("/api/tweet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newTweetText }),
      })
        .then((res) => {
          if (res.status >= 400) {
            setError(true);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
        });
      setPostTweet(newTweetText);
      setnewTweetText("");
      setNewTweetCaracter(280);
    }
  };

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => {
        if (res.status >= 400) {
          setError(true);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTweetIds(data.tweetIds);
        setTweetsById(Object.values(data.tweetsById));
      });
  }, [postTweet]);

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

  if (!error) {
    if (!tweetIds) {
      return (
        <>
          <NewTweet style={{ marginLeft: "60px" }}>
            <NewtweetText>
              <AvatarImg
                src={currentUsersData.profile.avatarSrc}
                alt="profileImg"
              />
              <InputNewTweet
                type="text"
                placeholder="What's happening? "
                value={newTweetText}
                onChange={(e) => {
                  setNewTweetCaracter(280 - e.target.value.length);
                  setnewTweetText(e.target.value);
                }}
              />
            </NewtweetText>
            <NewTweetbutton>
              <CaracterCounter
                newTweetCaracter={newTweetCaracter}
                style={{ marginRight: "15px" }}
              >
                {newTweetCaracter}
              </CaracterCounter>
              <Button onClick={NewTweetHandler} type="submit">
                Meow
              </Button>
            </NewTweetbutton>
          </NewTweet>
          <Spinner>
            <SpinnerIcon icon={spinner3} />
          </Spinner>
        </>
      );
    }
  }

  return (
    <Div>
      <NewTweet>
        <NewtweetText>
          <AvatarImg
            src={currentUsersData.profile.avatarSrc}
            alt="profileImg"
          />
          <InputNewTweet
            type="text"
            placeholder="What's happening? "
            value={newTweetText}
            onChange={(e) => {
              setNewTweetCaracter(280 - e.target.value.length);
              setnewTweetText(e.target.value);
              // handleuserInput();
            }}
          />
        </NewtweetText>
        <NewTweetbutton>
          <CaracterCounter
            newTweetCaracter={newTweetCaracter}
            style={{ marginRight: "15px" }}
          >
            {newTweetCaracter}
          </CaracterCounter>
          <Button onClick={NewTweetHandler} type="submit">
            Meow
          </Button>
        </NewTweetbutton>
      </NewTweet>

      {tweetIds.map((item) => {
        return tweetsById.map((tweet, index) => {
          if (item === tweet.id) {
            return (
              <SmallTweet
                key={index}
                tweetId={tweet.id}
                displayName={tweet.author.displayName}
                handle={tweet.author.handle}
                avatarSrc={tweet.author.avatarSrc}
                timestamp={tweet.timestamp}
                status={tweet.status}
                mediaImage={tweet.media.length === 0 ? "" : tweet.media[0].url}
              />
            );
          }
        });
      })}
    </Div>
  );
};

export default HomeFeed;

const Div = styled.div`
  margin-left: 60px;
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

const InputNewTweet = styled.textarea`
  font-family: sans-serif;
  font-size: x-large;
  border: none;
  width: 740px;
  height: 150px;
  padding-left: 20px;
  padding-top: 20px;
  outline: 0px none transparent;
  resize: none;
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const NewTweet = styled.div`
  display: flex;
  flex-direction: column;
  width: 801px;
  border: 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-top: 20px;
  padding-left: 10px;
  border-bottom: 10px solid #ecf0f1;
`;

const NewtweetText = styled.div`
  display: flex;
  align-items: flex-start;
`;

const NewTweetbutton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 13px;
  font-size: larger;
  padding: 7px;
`;

const CaracterCounter = styled.p`
  color: ${(props) => (props.newTweetCaracter < 55 ? "#f39c12" : "")};
  color: ${(props) => (props.newTweetCaracter < 0 ? "red" : "")};
  font-size: large;
`;

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  top: 320px;
  left: -350px;
`;

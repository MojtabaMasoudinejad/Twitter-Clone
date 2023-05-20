import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { GoLocation } from "react-icons/go";
import { AiFillControl, AiOutlineRetweet } from "react-icons/ai";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";

import SmallTweet from "./SmallTweet";
import { COLORS } from "../Constants";

const Profile = () => {
  const { profileId } = useParams();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tweetsById, setTweetsById] = useState(null);
  const [loadingOne, setLoadingOne] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    setLoadingOne(true);
    setLoadingTwo(true);

    fetch("/api/me/home-feed")
      .then((res) => {
        if (res.status >= 400) {
          navigate("/error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTweetsById(Object.values(data.tweetsById));

        setLoadingOne(false);
      });

    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        if (res.status >= 400) {
          navigate("/error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUserData(data.profile);
        setLoadingTwo(false);
      });
  }, [profileId]);

  if (loadingOne || loadingTwo) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <Div>
      <Img src={userData.bannerSrc} />
      <AvatarButtonDiv>
        <AvatarImg src={userData.avatarSrc} alt="Avatar " />
        <FollowingButton>Following</FollowingButton>
      </AvatarButtonDiv>

      <div>
        <UserName>{userData.displayName}</UserName>
        <HandleFollowsYou>
          <Userhandle>@{userData.handle}</Userhandle>
          {userData.isFollowingYou ? <FollowsYou>Follows you</FollowsYou> : ""}
        </HandleFollowsYou>
        <UserBio>{userData.bio}</UserBio>
        <LocationJoin>
          {"location" in userData ? (
            <div>
              <span style={{ marginRight: "5px" }}>
                <GoLocation />
              </span>
              <span style={{ marginRight: "20px" }}>{userData.location}</span>
            </div>
          ) : (
            ""
          )}

          <div>
            <span style={{ marginRight: "5px" }}>
              <AiFillControl />
            </span>
            <span>Joined {format(new Date(userData.joined), "MMMM y")} </span>
          </div>
        </LocationJoin>
        <LocationJoin>
          <div style={{ marginRight: "20px" }}>
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>
              {userData.numFollowing}
            </span>
            Following
          </div>
          <div style={{ marginRight: "20px" }}>
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>
              {userData.numFollowers}
            </span>
            Followers
          </div>
        </LocationJoin>
        <TweetsMediaLink>
          <TweetButton>Tweets</TweetButton>
          <MediaButton>Media</MediaButton>
          <LikesButton>Likes</LikesButton>
        </TweetsMediaLink>
        <div>
          {tweetsById.map((item, index) => {
            if ("retweetFrom" in item) {
              if (item.retweetFrom.handle === userData.handle) {
                return (
                  <div key={index}>
                    <RetweetMsg>
                      <span
                        style={{
                          marginLeft: "80px",
                          marginRight: "10px",
                        }}
                      >
                        <AiOutlineRetweet />
                      </span>
                      <div style={{ fontSize: "18px" }}>
                        {userData.displayName} Remeowed
                      </div>
                    </RetweetMsg>

                    <SmallTweet
                      tweetId={item.id}
                      displayName={item.author.displayName}
                      handle={item.author.handle}
                      avatarSrc={item.author.avatarSrc}
                      timestamp={item.timestamp}
                      status={item.status}
                      mediaImage={
                        item.media.length === 0 ? "" : item.media[0].url
                      }
                    />
                  </div>
                );
              }
            }
          })}
        </div>
        <div>
          {tweetsById.map((item, index) => {
            if (item.author.handle === userData.handle) {
              return (
                <SmallTweet
                  key={index}
                  tweetId={item.id}
                  displayName={item.author.displayName}
                  handle={item.author.handle}
                  avatarSrc={item.author.avatarSrc}
                  timestamp={item.timestamp}
                  status={item.status}
                  mediaImage={item.media.length === 0 ? "" : item.media[0].url}
                />
              );
            }
          })}
        </div>
      </div>
    </Div>
  );
};

export default Profile;

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

const Div = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid gray;
  width: 810px;
  margin-top: 20px;
  margin-left: 20px;
`;

const Img = styled.img`
  object-fit: cover;
  height: 300px;
  z-index: 0;
  border: 1px solid gray;
  width: 810px;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-left: 20px;
  margin-top: 20px;
  position: relative;
  top: -80px;
  z-index: 999;
`;

const AvatarButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 800px;
  height: 80px;
`;

const FollowingButton = styled.button`
  position: relative;
  top: 30px;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 13px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  padding: 7px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-left: 15px;
  font-size: 22px;
  font-family: sans-serif;
`;

const Userhandle = styled.div`
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
const HandleFollowsYou = styled.div`
  display: flex;
`;

const FollowsYou = styled.div`
  background-color: #ecf0f1;
  border-radius: 5px;
  padding-bottom: 2px;
  height: 18px;
`;

const UserBio = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: 15px;
`;

const LocationJoin = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: 15px;
`;
const TweetsMediaLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
  border-bottom: 1px solid #bdc3c7;
`;

const TweetButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  border-bottom: 3px solid ${COLORS.primary};
  width: 180px;
  padding-bottom: 15px;
  padding-left: 100px;
`;

const MediaButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 15px;
  margin-right: 50px;
`;

const LikesButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 15px;
  margin-right: 100px;
`;

const RetweetMsg = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

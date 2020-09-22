import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import "./TweetBox.scss";

// Icons
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { db } from "../../firebase/firebase";

const TweetBox = () => {
  const [tweetMsg, setTweetMsg] = useState("");
  const [tweetMsgImg, setTweetMsgImg] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    // save into Firebase database
    db.collection("tweets").add({
      displayName: "Robert Koteles",
      username: "RobertKoteles1",
      verified: true,
      timestamp: Date.now() / 1000,
      text: tweetMsg,
      image: tweetMsgImg,
      imageAlt: "",
      avatar: "https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg",
      comments: "",
      numComments: Math.floor(Math.random() * 1000) + 1,
      retweets: Math.floor(Math.random() * 1000) + 1,
      likes: Math.floor(Math.random() * 1000) + 1,
      share: Math.floor(Math.random() * 1000) + 1,
    });

    // reset
    setTweetMsg("");
    setTweetMsgImg("");
  };

  return (
    <div className="tweetBox">
      <form action="">
        <div className="tweetBox__input">
          <Avatar
            lassName="tweetBox__avatar"
            alt=""
            src="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
          />
          <input
            type="text"
            placeholder="What's happening?"
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="tweetBox__imageInput"
          placeholder="Just for demo: Enter image url"
          value={tweetMsgImg}
          onChange={(e) => setTweetMsgImg(e.target.value)}
        />

        <div className="tweetBox__footer">
          <div className="tweetBox__footerIcons">
            <CropOriginalIcon />
            <GifIcon />
            <EqualizerIcon />
            <InsertEmoticonIcon />
            <ScheduleIcon />
          </div>
          <Button
            type="button"
            variant="outlined"
            className="tweetBox__tweetButton"
            onClick={sendTweet}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;

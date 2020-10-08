import React, { useState } from "react";
import "./TweetBox.scss";

// Icons
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { db } from "../../firebase/firebase";
import { Avatar, Button } from "@material-ui/core";

// React Context
import { useStateValue } from "../../StateProvider";

const TweetBox = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();
  console.log("user >>>", user);

  const [tweetMsg, setTweetMsg] = useState("");
  const [tweetMsgImg, setTweetMsgImg] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    if (!tweetMsg) {
      return;
    }
    // save into Firebase database
    db.collection("tweets").add({
      displayName: user.displayName,
      username: user.username,
      verified: user.verified,
      timestamp: Date.now() / 1000,
      text: tweetMsg,
      image: tweetMsgImg,
      imageAlt: "",
      avatar: user.photoURL,
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

  const showDemoMessage = () => {
    alert("This is just a demo app!");
  };

  return (
    <div className="tweetBox">
      <form action="">
        <div className="tweetBox__input">
          <Avatar
            className="tweetBox__avatar"
            alt={user.username}
            src={user.photoURL}
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
            <CropOriginalIcon onClick={showDemoMessage} />
            <GifIcon onClick={showDemoMessage} />
            <EqualizerIcon onClick={showDemoMessage} />
            <InsertEmoticonIcon onClick={showDemoMessage} />
            <ScheduleIcon onClick={showDemoMessage} />
          </div>
          <Button
            type="button"
            variant="outlined"
            className="tweetBox__tweetButton button"
            onClick={sendTweet}
            disabled={tweetMsg ? false : true}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;

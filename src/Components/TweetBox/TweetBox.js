import { Avatar, Button } from "@material-ui/core";
import React from "react";
import "./TweetBox.scss";

// Icons
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ScheduleIcon from "@material-ui/icons/Schedule";

const TweetBox = () => {
  return (
    <div className="tweetBox">
      <form action="">
        <div className="tweetBox__input">
          <Avatar
            lassName="tweetBox__avatar"
            alt=""
            src="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
          />
          <input type="text" placeholder="What's happening?" />
        </div>
        <input
          type="text"
          className="tweetBox__imageInput"
          placeholder="Just for demo: Enter image url"
        />

        <div className="tweetBox__footer">
          <div className="tweetBox__footerIcons">
            <CropOriginalIcon />
            <GifIcon />
            <EqualizerIcon />
            <InsertEmoticonIcon />
            <ScheduleIcon />
          </div>
          <Button variant="outlined" className="tweetBox__tweetButton">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;

import React from "react";
import "./Post.scss";

import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Post = ({
  displayName,
  username,
  verified,
  timestamp,
  text,
  image,
  imageAlt,
  avatar,

  comments,
  retweets,
  likes,
  share,
}) => {
  return (
    <div className="post">
      <ExpandMoreIcon className="post__dropDown" />
      <div className="post__avatar">
        <Avatar lassName="tweetBox__avatar" alt="" src={avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}
              <span className="post__headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />} @
                {username} - {timestamp}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>

        <img src={image} alt={imageAlt} />

        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;

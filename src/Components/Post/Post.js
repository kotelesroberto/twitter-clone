import React from "react";
import "./Post.scss";

import Moment from "react-moment";
import "moment-timezone";

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
  numComments,
  retweets,
  likes,
  share,
}) => {
  return (
    <article className="post">
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
                {username} -{" "}
                <Moment interval={30000} fromNow unix>
                  {timestamp}
                </Moment>
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>

        <img src={image} alt={imageAlt} />

        <div className="post__footer">
          <div>
            <ChatBubbleOutlineIcon fontSize="small" />{" "}
            {numComments && <span>{numComments}</span>}
          </div>
          <div>
            <RepeatIcon fontSize="small" />{" "}
            {retweets && <span>{retweets}</span>}
          </div>
          <div>
            <FavoriteBorderIcon fontSize="small" />{" "}
            {likes && <span>{likes}</span>}
          </div>
          <div>
            <PublishIcon fontSize="small" /> {share && <span>{share}</span>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;

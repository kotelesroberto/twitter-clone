import React, { forwardRef, useState } from "react";
import "./Post.scss";

import Moment from "react-moment";
import "moment-timezone";

// icons
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// popup components
import PopupMenu from "./PopupMenu";
// for React flip move animation we have to use forwardRef wrapping!

const Post = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const [dialog, setDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const [menuitems, setMenuitems] = useState([]);
    const [liked, setLiked] = useState(false);

    const addComment = () => {
      alert("adding comment is not available in this demo");
    };

    return (
      <article className="post" ref={ref}>
        <ExpandMoreIcon
          className="post__dropDown"
          onClick={(e) => {
            setMenuitems([
              {
                text: "Not interested in this Tweet",
                link: "",
                icon: "SentimentVeryDissatisfiedIcon",
              },
              {
                text: "Unfollow @Twitter",
                link: "",
                icon: "PersonAddDisabledIcon",
              },
              {
                text: "Add/remove from Lists",
                link: "",
                icon: "PostAddIcon",
              },
              {
                text: "Mute @Twitter",
                link: "",
                icon: "VolumeOffIcon",
              },
              {
                text: "Block @Twitter",
                link: "",
                icon: "BlockIcon",
              },
              {
                text: "Embed Tweet",
                link: "",
                icon: "CodeIcon",
              },
              {
                text: "Report Tweet",
                link: "",
                icon: "EmojiFlagsIcon",
              },
            ]);
            setAnchorEl(e.currentTarget);
            setDialog(!dialog);
          }}
        />
        <div className="post__avatar">
          <Avatar className="tweetBox__avatar" alt="" src={avatar} />
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
              <ChatBubbleOutlineIcon
                fontSize="small"
                onClick={() => {
                  addComment();
                }}
              />{" "}
              {numComments && <span>{numComments}</span>}
            </div>
            <div>
              <RepeatIcon
                fontSize="small"
                onClick={(e) => {
                  setMenuitems([
                    {
                      text: "Retweet",
                      link: "",
                      icon: "RepeatIcon",
                    },
                    {
                      text: "Quote Tweet",
                      link: "",
                      icon: "CreateIcon",
                    },
                  ]);
                  setAnchorEl(e.currentTarget);
                  setDialog(!dialog);
                }}
              />{" "}
              {retweets && <span>{retweets}</span>}
            </div>
            <div>
              <FavoriteBorderIcon
                fontSize="small"
                onClick={() => {
                  setLiked(!liked);
                }}
                className={liked ? "liked" : ""}
              />{" "}
              {likes && <span>{likes}</span>}
            </div>
            <div>
              <PublishIcon
                fontSize="small"
                onClick={(e) => {
                  setMenuitems([
                    {
                      text: "Send via Direct Message",
                      link: "",
                      icon: "MailOutlineIcon",
                    },
                    {
                      text: "Add Tweet to Bookmarks",
                      link: "",
                      icon: "BookmarkBorderIcon",
                    },
                    {
                      text: "Copy link to Tweet",
                      link: "",
                      icon: "LinkIcon",
                    },
                  ]);
                  setAnchorEl(e.currentTarget);
                  setDialog(!dialog);
                }}
              />{" "}
              {share && <span>{share}</span>}
            </div>
          </div>
        </div>

        <PopupMenu
          dialog={dialog}
          setDialog={setDialog}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuitems={menuitems}
        />
      </article>
    );
  }
);

export default Post;

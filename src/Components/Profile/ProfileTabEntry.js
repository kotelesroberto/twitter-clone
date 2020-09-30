import React from "react";
import "./ProfileTabEntry.scss";

import { Avatar, Button } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ProfileTabEntry = ({ displayName, username, verified, text, avatar }) => {
  const followProfile = (e, username) => {
    e.preventDefault();
    alert(`follow: ${username}`);
  };

  return (
    <article className="profileTabEntry">
      <div className="profileTabEntry__avatar">
        <Avatar className="tweetBox__avatar" alt="" src={avatar} />
      </div>
      <div className="profileTabEntry__body">
        <div className="profileTabEntry__header">
          <div className="profileTabEntry__headerText">
            <h3>
              {displayName}
              <span className="profileTabEntry__headerSpecial">
                {verified && (
                  <VerifiedUserIcon className="profileTabEntry__badge" />
                )}{" "}
                <span className="profileTabEntry__headerUsername">
                  @{username}
                </span>
              </span>
            </h3>

            <Button
              type="button"
              variant="outlined"
              className="profileTabEntry__button button button--outline"
              onClick={(e) => {
                followProfile(e, username);
              }}
            >
              Follow
            </Button>
          </div>
          <div className="profileTabEntry__headerDescription">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileTabEntry;

import React from "react";
import "./Widgets.scss";

import SearchIcon from "@material-ui/icons/Search";

import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input type="text" className="" placeholder="Search Twitter" />
      </div>

      {/* Embed Twitter stuffs */}
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId={"1273727663123898371"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="JimiHendrix"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://www.facebook.com/JimiHendrix"}
          options={{
            text:
              "𝙿𝙾𝚆𝙴𝚁 𝚝𝚘 𝚝𝚑𝚎 𝚙𝚎𝚘𝚙𝚕𝚎 / 𝙵𝚁𝙴𝙴𝙳𝙾𝙼 𝚘𝚏 𝚝𝚑𝚎 𝚜𝚘𝚞𝚕 / 𝙿𝙰𝚂𝚂 𝙸𝚃 𝙾𝙽 𝚝𝚘 𝚝𝚑𝚎 𝚢𝚘𝚞𝚗𝚐 𝚊𝚗𝚍 𝚘𝚕𝚍",
            via: "JimiHendrix",
          }}
        />
      </div>
    </div>
  );
};

export default Widgets;

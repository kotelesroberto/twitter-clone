import React, { useEffect, useRef, useState } from "react";
import "./TweetBox.scss";

// Icons
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import { Avatar, Button } from "@material-ui/core";

import { db } from "../../firebase/firebase";
import { uploadFile } from "../../Utils/uploadFile";

// React Context
import { useStateValue } from "../../StateProvider";

const TweetBox = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();
  console.log("user >>>", user);

  const [tweetMsg, setTweetMsg] = useState("");

  const imageUploader = useRef(null);
  const imageUploaderGif = useRef(null);
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });
  const [imageAsBlob, setImageAsBlob] = useState({ imgUrl: "" });
  const [imageAsFile, setImageAsFile] = useState("");

  useEffect(() => {
    if (imageAsUrl.imgUrl) {
      sendTweet_02();
    }
  }, [imageAsUrl]);

  // IMAGE HANDLERS
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];

    // set blob before upload - display image locally
    setImageAsBlob({
      imgUrl: URL.createObjectURL(image),
    });
    setImageAsFile((imageFile) => image);
    resetImageUploader();
  };

  // reset file upload field
  const resetImageUploader = () => {
    imageUploader.current.value = null;
    imageUploaderGif.current.value = null;
  };

  // first step of posting a tweet
  const sendTweet_01 = (e) => {
    e.preventDefault();

    if (!imageAsFile) {
      // no image but text
      sendTweet_02();
    } else {
      // upload image first and after the content
      uploadFile({
        folder: "images",
        imageAsFile: imageAsFile,
        setUrl: (resp) => {
          setImageAsUrl({ imgUrl: resp });
        },
      });
    }
  };

  // handle form submit
  const handleForm = (e) => {
    e.preventDefault();
  };

  const showDemoMessage = () => {
    alert("This is just a demo app!");
  };

  const sendTweet_02 = () => {
    if (!tweetMsg || !imageAsUrl) {
      return;
    }
    // save into Firebase database
    db.collection("tweets").add({
      displayName: user.displayName,
      username: user.username,
      verified: user.verified,
      timestamp: Date.now() / 1000,
      text: tweetMsg,
      image: imageAsUrl.imgUrl,
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
    setImageAsBlob({ imgUrl: "" });
    setImageAsUrl({ imgUrl: "" });
  };

  return (
    <div className="tweetBox">
      <form action="" onSubmit={handleForm}>
        <div className="tweetBox__input">
          <Avatar
            className="tweetBox__avatar"
            alt={user.username}
            src={user.photoURL}
          />

          <div className="tweetBox__body">
            <input
              type="text"
              placeholder="What's happening?"
              value={tweetMsg}
              onChange={(e) => setTweetMsg(e.target.value)}
            />

            {imageAsBlob.imgUrl && (
              <div className="tweetBox__previewContainer">
                <IconButton
                  className="tweetBox__closePreview"
                  onClick={() => {
                    setImageAsBlob({ imgUrl: "" });
                    setImageAsFile("");
                  }}
                >
                  <CloseIcon fontSize="small"></CloseIcon>
                </IconButton>

                <img
                  src={imageAsBlob.imgUrl}
                  alt=""
                  className="tweetBox__preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="tweetBox__footer">
          <div className="tweetBox__footerIcons">
            <form onSubmit={handleForm}>
              <input
                type="file"
                accept="image/*"
                ref={imageUploader}
                onChange={handleImageAsFile}
                className="hidden"
              />
            </form>
            <form onSubmit={handleForm}>
              <input
                type="file"
                accept="image/*"
                accept="image/gif"
                ref={imageUploaderGif}
                onChange={handleImageAsFile}
                className="hidden"
              />
            </form>

            <CropOriginalIcon onClick={() => imageUploader.current.click()} />
            <GifIcon onClick={() => imageUploaderGif.current.click()} />
            <EqualizerIcon onClick={showDemoMessage} />
            <InsertEmoticonIcon onClick={showDemoMessage} />
            <ScheduleIcon onClick={showDemoMessage} />
          </div>
          <Button
            type="button"
            variant="outlined"
            className="tweetBox__tweetButton button"
            onClick={sendTweet_01}
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

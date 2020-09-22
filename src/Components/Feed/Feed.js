import React, { useEffect, useState } from "react";
import "./Feed.scss";

import { db } from "../../firebase/firebase";

// Components
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";

// Animation (using forwardRef)
import FlipMove from "react-flip-move";

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("tweets")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setTweets(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        )
      );
    //effect
    return () => {
      // cleanup
      unsubscribe(); // this function is given back by onSnapshot
    };
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      <FlipMove>
        {tweets.map((tweet) => (
          <Post
            key={tweet.id}
            avatar={tweet.avatar}
            displayName={tweet.displayName}
            username={tweet.username}
            text={tweet.text}
            timestamp={tweet.timestamp}
            verified={tweet.verified}
            image={tweet.image}
            imageAlt={tweet.imageAlt}
            comments={tweet.comments}
            numComments={tweet.numComments}
            retweets={tweet.retweets}
            likes={tweet.likes}
            share={tweet.share}
          />
        ))}
      </FlipMove>

      {/* 
      
      <Post
        avatar="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
        displayName="Robert Koteles"
        username="kotelesroberto"
        text="This is the place where I would like to work. :)"
        timestamp="1m"
        verified
        image="https://s3.amazonaws.com/images.seroundtable.com/twitter-london-office-1403005449.jpg"
        imageAlt="Twitter London"
        comments={[]}
        numComments={5}
        retweets={13}
        likes={35}
        share={23}
      />
      <Post
        avatar="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
        displayName="Robert Koteles"
        username="kotelesroberto"
        text="Twitter is an American microblogging and social networking service on which users post and interact with messages known as tweets."
        timestamp="5m"
        verified
        image="https://www.tothepoint.co.uk/wp-content/uploads/2015/11/Twitter_London_Interiors_01_2014_01_14.jpg"
        imageAlt="Twitter London"
      />
      <Post
        avatar="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
        displayName="Robert Koteles"
        username="kotelesroberto"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              nisi autem quidem voluptate corrupti vero corporis consectetur
              molestias iste magni sunt, obcaecati, id dolores sequi minus,
              minima iure provident soluta."
        timestamp="15m"
        verified
        image="https://www.tothepoint.co.uk/wp-content/uploads/2015/11/Twitter_London_Interiors_01_2014_01_14.jpg"
        imageAlt="Twitter London"
      />
      <Post
        avatar="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
        displayName="Robert Koteles"
        username="kotelesroberto"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              nisi autem quidem voluptate corrupti vero corporis consectetur
              molestias iste magni sunt, obcaecati, id dolores sequi minus,
              minima iure provident soluta."
        timestamp="25m"
        verified
        image="https://www.tothepoint.co.uk/wp-content/uploads/2015/11/Twitter_London_Interiors_01_2014_01_14.jpg"
        imageAlt="Twitter London"
      />
      */}
    </div>
  );
};

export default Feed;

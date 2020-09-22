import React from "react";
import "./Feed.scss";

// Components
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* Post */}
      <Post
        avatar="https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg"
        displayName="Robert Koteles"
        username="kotelesroberto"
        text="This is the place where I would like to work. :)"
        timestamp="1m"
        verified
        image="https://s3.amazonaws.com/images.seroundtable.com/twitter-london-office-1403005449.jpg"
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
    </div>
  );
};

export default Feed;

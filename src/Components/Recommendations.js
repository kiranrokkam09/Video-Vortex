import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { video_recommendations_api } from "../utils/constants";
import RecVideo from "./RecVideo";
import ShimmerRecommemdedVideo from "./ShimmerRecommemdedVideo";
import { Link } from "react-router-dom";

// Recomendations that appear in Watch Page
const Recommendations = () => {
  const channelId = useSelector((store) => store.channelId.channelId);
  const [recVideoList, setRecVideoList] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(video_recommendations_api + channelId);
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const jsondata = await data.json();
      setRecVideoList(jsondata?.response.items);
    } catch (error) {
      console.error("Error in Giving Video Recommendations :", error);
    }
  };

  // Shimmer UI until the Api data is Obtained
  return recVideoList == null ? (
    <div>
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
      <ShimmerRecommemdedVideo />
    </div>
  ) : (
    <div>
      {
        // Recommended Video Lists
        recVideoList.map((recvideo, index) => (
          <Link
            to={"/watch?v=" + recvideo?.contentDetails?.upload?.videoId}
            key={index}
          >
            <RecVideo data={recvideo} />
          </Link>
        ))
      }
    </div>
  );
};

export default Recommendations;

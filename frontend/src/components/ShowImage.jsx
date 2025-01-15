import React from "react";

const ShowImage = ({ item }) => {
  return (
    <div>
      <div className="px-5">
        <img src={`http://localhost:8000/upload/${item._id}`} alt="" />
      </div>
    </div>
  );
};

export default ShowImage;

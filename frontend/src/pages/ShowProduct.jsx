import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowImage from "../components/ShowImage";

const ShowProduct = () => {
  const [img, setImg] = useState("");

  const [list, setList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const formdata = new FormData();

  formdata.append("image", img);

  const handleSubmit = async (e) => {
    await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getImage = async () => {
      const result = await axios.get(`${apiUrl}/upload`);
      setList(result.data);
    };
    getImage();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-5">
        <h1 className="mb-5">Show your product to cart</h1>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="max-w-lg mx-auto mb-5 sm:mb-10">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Upload file (Product Picture)
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              name="image"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="user_avatar_help"
            >
              A product picture is used to view the product by the user.
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {/*  MyRef */}
      <div>
        {list.map((item) => (
          <ShowImage key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;

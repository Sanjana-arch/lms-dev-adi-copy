import React, { useState } from "react";
import axios from "axios";
import {toast}from 'react-hot-toast'
import NavBar from '../Navbar'

const AddPoster = ({user}) => {
  const [image, setImage] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const addToDB =  async(path) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/posters`;
     await await axios
        .post(
          url,
          {
            path,
            title,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setTitle('');
          setImage('')
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response);
      }
    }
  };
  const uploadImage =  async() => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "madiee");
    data.append("cloud_name", "dnhslyteh");
 await  fetch("  https://api.cloudinary.com/v1_1/dnhslyteh/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
        if(data.url)  {
          addToDB(data.url)
       toast.success('Success')} 
       else
       toast.error('please try again')
      })
      .catch((err) => console.log(err));
  
  };
  return (
    <div>
      <NavBar user={user}></NavBar>
      <div>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        ></input>

        <button onClick={()=>
        {
          if(image && title.length)
          {
            uploadImage()
          }
          else
          toast.error("Please enter valid data")
        }}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={imageUrl} />
      </div>
    </div>
  );
};

export default AddPoster;
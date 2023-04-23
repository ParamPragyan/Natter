import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import avatar1 from "../assets/user.png"
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/45678945`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const xyxy = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate("/login");
    };
    xyxy();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const randomapi = async () => {
      const data = [`https://api.multiavatar.com/45678945.png`,`https://api.multiavatar.com/45678995.png`, `https://api.multiavatar.com/45628995.png`, `https://api.multiavatar.com/15628995.png`,`https://api.multiavatar.com/29628995.png`, `https://api.multiavatar.com/46628995.png`, `https://api.multiavatar.com/55628995.png`,`https://api.multiavatar.com/65628995.png`,`https://api.multiavatar.com/75628995.png`];
      try {
        // for (let i = 0; i < 4; i++) {
        //   // const url = `${api}${Math.round(Math.random() * 1000)}`;
        //   // console.log(url);
        //   const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
        //   // console.log(image);
        //   const buffer = new Buffer(image.data);
        //   data.push(buffer.toString("base64"));
        //   console.log(data);
        // }
        setAvatars(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.response.data);
        setIsLoading(false);
      }
    };
    randomapi();
  }, [api]);



    // const avtr = [
    //   "https://api.multiavatar.com/459978945.png",
    //   "https://api.multiavatar.com/45672945.png",
    //   "https://api.multiavatar.com/45678945.png"
    // ]







  return (
    <>
      {isLoading ? (
        
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1 className="text-[black] text-[3rem] font-[900] ">CHOOSE YOUR AVATAR</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div 
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })} 
          </div>
          <button onClick={setProfilePicture} className="submit-btn text-[white] text-[2rem] rounded-[50%] p-[3rem] bg-[black]">
            select
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #9bfaf8;
  gap: 3rem;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

 
  .avatars {
    display: flex;
    
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #000;
      filter: drop-shadow(0px 0px 50px black);

    }
  }
  
  }
`;

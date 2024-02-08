import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hello from "../assets/hello.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container className="bg-[#010101ac] border-l-[1px] text-[2rem] border-[#4f4f4f]">
      <img className=" rounded-[50%] " src={Hello} alt="" />
      <h1 id="welcome" className="welcome pt-[3rem] text-[7rem] bg-clip-text"> Welcome, <span >{userName}!</span>
      </h1>
      <h3 id="welcome">Please tap on a chat to proceede</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
    filter: drop-shadow(0px 0px 80px #085866);
  }
  
  h1{
    font-family: 'Rubik Wet Paint', cursive;
    }
  .welcome {
    background: linear-gradient(
      90deg,
      #ff4800,
      rgb(223, 223, 2),
      rgb(137, 201, 0),
      rgb(89, 255, 18),
      rgb(0, 127, 25),
      rgb(0, 201, 167),
      rgb(0, 50, 201),
      rgb(97, 0, 201),
      rgb(171, 0, 201),
      #ff4800
    );
    background-size: 400%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    animation: name-animation 15s linear infinite;
  }
  @keyframes name-animation {
    0% {
      background-position: 0%;
    }
  
    100% {
      background-position: 400%;
    }
  }
`;

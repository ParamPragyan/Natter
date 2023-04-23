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
      <h1 className="pt-[3rem] text-[5rem]">
        Welcome, <span className="text-[yellow]" >{userName}!</span>
      </h1>
      <h3>Please tap on a chat to proceede</h3>
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
  span {
    
  }
  h1{
    font-family: 'Rubik Pixels', cursive;
  }
`;

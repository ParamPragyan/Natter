import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import loginimg from "../assets/NATTER.png"

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="container h-[100vh] w-full bg-[#070707] flex justify-center items-center">
          <div className="flex drop1" >
          
            <img className="h-[30rem] rounded-l-[20px] " src={loginimg} alt="" />
          
        <form className=" flex flex-col justify-center items-center gap-[1.5rem] h-[30rem] w-[30rem] p-[5rem] py-[8rem] rounded-r-[20px] bg-[#000000] " action="" onSubmit={(event) => handleSubmit(event)}>
          <div  className="brand flex item-center justify-center">
            <img className="h-[5rem]" src={Logo} alt="logo" />
            <h1 className="text-[2rem] pl-[.5rem] text-center flex items-center justify-center font-[netter] text-[white]">NATTER</h1>
          </div>
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] text-[white] border-b-[2px]"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] text-[white] border-b-[2px]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="text-[white] border-[white] border-[2px] p-[.9rem] mt-[1rem] rounded-[5px] w-full text-[1.2rem]
           hover:bg-[#fff70f] hover:text-[black] hover:border-[#fff70f]" type="submit">LOG IN</button>
          <span className="text-white">
            Don't have an account ? <Link to="/register" className="text-[#cbef39]" >Creat one.</Link>
          </span>
        </form>
        </div>
          </div>
          </FormContainer>
        
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`

.container {
  background-color: #080808;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24.98' height='25' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='96' height='96' fill-opacity='0.85' fill='%23000000'/%3E%3C/svg%3E");
}


`;

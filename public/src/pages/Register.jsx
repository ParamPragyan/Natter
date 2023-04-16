import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
      {/* <FormContainer> */}
      <div className="h-[100vh] w-full bg-[#070707] flex justify-center items-center">
      <form className=" drop1 flex flex-col justify-center items-center gap-[1.5rem] h-[40rem] w-[30rem] p-[5rem] py-[8rem] rounded-[20px] bg-[#000000] " action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand flex item-center justify-center">
            <img className="h-[5rem]" src={Logo} alt="logo" />
            <h1 className="text-[2rem] pl-[.5rem] text-center flex items-center justify-center text-[white]" >NATTER</h1>
          </div>
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] border-b-[2px]"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] border-b-[2px]"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] border-b-[2px]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input className="w-full p-[1rem] rounded-[5px] bg-[#000000] border-[#ffffff8f] border-b-[2px]"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className="text-[white] border-[white] border-[2px] p-[.9rem] mt-[1rem] rounded-[5px] w-full text-[1.2rem]
           hover:bg-[#fff70f] hover:text-[black] hover:border-[#fff70f] " type="submit">Create User</button>
          <span className="text-white">
            Already have an account ? <Link className="text-[#cbef39]" to="/login">Login.</Link>
          </span>
        </form>
      </div>
        
      {/* </FormContainer> */}
      <ToastContainer />
    </>
  );
}


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import me from "../assets/me.png"
import avatar1 from "../assets/user.png"



export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };



  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container  >
      

          <div className="brand  ">
            <img  className="" src={Logo} alt="logo" />
            <h3 className="font-[netter] text-[white] ">NATTER</h3>
          </div>
          <div className="contacts flex flex-col items-center overflow-auto ">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact bg-[#000000] border-b-[1px] border-[#a8a8a8] backdrop:blur-[10px] w-full hover:bg-[#136b8890] h-[5rem] ${
                    index === currentSelected ? "selected bg-[#085866]" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      // src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      src={contact.avatarImage}

                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user border-t-[1px]  border-[#a8a8a8] backdrop:blur-[90px] bg-[#085866]">
            <div className="avatar">
              <img className="h-[5rem] rounded-[50%] "
                 src={currentUserImage}
              
                alt="avatar"
              />
            </div>
            <div className="username ">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          
          
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080808;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24.98' height='25' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='96' height='96' fill-opacity='0.85' fill='%23000000'/%3E%3C/svg%3E");
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #000;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      filter: drop-shadow(0px 0px 1px white);

      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
    }
  }

  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

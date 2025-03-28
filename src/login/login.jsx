import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

export const Login = () => {
  // Navigation menu items data
  const navItems = [
    {
      icon: "https://c.animaapp.com/m8qroov3KCtN5L/img/service.svg",
      label: "SERVICE",
    },
    {
      icon: "https://c.animaapp.com/m8qroov3KCtN5L/img/icon-1.svg",
      label: "EQUIPMENT",
    },
    {
      icon: "https://c.animaapp.com/m8qroov3KCtN5L/img/icon.svg",
      label: "ABOUT US",
    },
    {
      icon: "https://c.animaapp.com/m8qroov3KCtN5L/img/blog.svg",
      label: "BLOG",
    },
  ];

  // Footer credits data
  const creators = [
    { name: "Duy", link: true },
    { name: "Vy", link: true },
    { name: "Khoa", link: true },
    { name: "Anh", link: true },
  ];

  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AxiosInstance.post(`auth/signin/`, {
      email: email,
      pass: pass,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data);
        // navigate(`/home`);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in: ", error);
        toast.error("Login failed!");
      });
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <div className="bg-transparent flex flex-row justify-center w-full">
        <div className=" h-[1080px]">
          <div className="relative h-[1080px]">
            <div className="absolute  h-[1080px] top-0 left-0">
              <div className="relative h-[1080px] bg-white">
                <div className="absolute w-[985px] h-[18px] top-[1020px] left-[169px] flex justify-between">
                  <div className="w-[423px] h-[18px]">
                    <div className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-400 text-xs tracking-[0] leading-[12.0px]">
                      <span className="text-[#a0aec0] leading-[18.0px]">
                        @ 2025, Made with ❤ by
                      </span>
                      {creators.map((creator, index) => (
                        <React.Fragment key={index}>
                          <span className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#38b2ac] leading-[18.0px]">
                            {creator.name}
                          </span>
                          {index < creators.length - 1 && (
                            <span className="text-[#a0aec0] leading-[18.0px]">
                              &amp;
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                      <span className="text-[#a0aec0] leading-[18.0px]">
                        for helping HCMUT student
                      </span>
                    </div>
                  </div>

                  <div className="w-[114px] h-[18px] flex justify-between">
                    <div className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-400 text-xs tracking-[0] leading-[18.0px] whitespace-nowrap">
                      Group 6
                    </div>
                    <div className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-400 text-xs tracking-[0] leading-[18.0px] whitespace-nowrap">
                      License
                    </div>
                  </div>
                </div>

                <div className="absolute w-[50px] h-[895px] top-0 left-[56px]">
                  <div className="absolute w-[50px] h-[895px] top-0 left-0">
                    <img
                      className="absolute w-[862px] h-[895px] top-0 left-[592px]"
                      alt="Login background"
                      src="https://c.animaapp.com/m8qroov3KCtN5L/img/image.png"
                    />

                    <div
                      className="absolute top-[25px] left-[200px]
                        w-[988px] h-[72px]
                        rounded-[15px]
                        border border-white
                        shadow-[0_7px_23px_rgba(0,0,0,0.05)]
                        backdrop-blur-[10.5px]
                        [background:linear-gradient(137deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.8)_100%)]
                        flex items-center px-4"
                    >
                      <div className="flex items-center h-[23px]">
                        <div className="w-[22px] h-[23px] relative">
                          <img
                            className="absolute w-[15px] h-4 top-1 left-[3px]"
                            alt="Fill"
                            src="https://c.animaapp.com/m8qroov3KCtN5L/img/fill-1.svg"
                          />
                          <img
                            className="absolute w-[3px] h-[3px] top-2.5 left-[9px]"
                            alt="Fill"
                            src="https://c.animaapp.com/m8qroov3KCtN5L/img/fill-2.svg"
                          />
                          <div className="absolute w-[22px] h-[23px] top-0 left-0 bg-[100%_100%]">
                            <img
                              className="absolute w-[22px] h-[23px] top-0 left-0"
                              alt="Mask group"
                              src="https://c.animaapp.com/m8qroov3KCtN5L/img/mask-group-1.png"
                            />
                          </div>
                        </div>
                        <div className="ml-[12px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#2d3748] text-sm">
                          SMARTGEAR
                        </div>
                      </div>

                      <div className="flex gap-4 ml-8">
                        {navItems.map((item, index) => (
                          <StyledButton
                            key={index}
                            className="h-6 rounded-xl flex items-center justify-center px-2 py-0 bg-transparent"
                          >
                            <img
                              className="w-[11px] h-[11px]"
                              alt={item.label}
                              src={item.icon}
                            />
                            <span className="ml-1 text-[#2d3748] font-bold text-[10px] leading-[15px]">
                              {item.label}
                            </span>
                          </StyledButton>
                        ))}
                      </div>

                      <StyledButton
                        className="ml-auto w-[150px] h-[37px] rounded-[34.5px]
                [background:linear-gradient(41deg,rgba(49,56,96,1)_0%,rgba(21,25,40,1)_100%)]
                flex items-center justify-center"
                      >
                        <div className="w-[89.5px] h-[15px] text-white font-bold text-[10px] leading-[15px]">
                          FREE SIGN UP!
                        </div>
                      </StyledButton>
                    </div>
                  </div>

                  <form onSubmit={handleLogin}>
                    <div className="absolute w-[355px] h-[457px] top-[289px] left-0">
                      <div className="absolute w-[202px] top-[437px] left-[77px] [font-family:'Arial-Regular',Helvetica] font-normal text-graygray-400 text-sm text-center tracking-[0] leading-[14.0px]">
                        <span className="text-[#a0aec0] leading-[19.6px]">
                          Don&#39;t have an account?
                        </span>
                        <span className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#a0aec0] leading-[19.6px]">
                          &nbsp;
                        </span>
                        <span className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#4fd1c5] leading-[0.1px] cursor-pointer">
                          Sign up
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-[350px] h-[47px] absolute top-[385px] left-[3px] !bg-[#4fd1c5] rounded-xl text-white [font-family:'Arial-Bold',Helvetica] font-bold text-[10px] text-center tracking-[0] leading-[15px]"
                      >
                        SIGN IN
                      </Button>

                      <div className="absolute w-32 h-[35px] top-[312px] left-[3px] flex items-center">
                        <div className="flex items-center space-x-2">
                          <input
                            id="remember-me"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <Label
                            htmlFor="remember-me"
                            className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-700 text-xs tracking-[0] leading-[18px]"
                          >
                            Remember me
                          </Label>
                        </div>
                      </div>

                      <div className="absolute w-[352px] h-[92px] top-[210px] left-[3px]">
                        <Label
                          htmlFor="password"
                          className="absolute w-[62px] top-0 left-1 [font-family:'Arial-Regular',Helvetica] font-normal text-graygray-700 text-sm tracking-[0] leading-[19.6px]"
                        >
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Your password"
                          className="w-[350px] h-[53px] absolute top-[39px] left-0 bg-blackampwhitewhite rounded-[15px] border border-solid border-slate-200 px-5"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          required
                        />
                      </div>

                      <div className="absolute w-[352px] h-[89px] top-[109px] left-[3px]">
                        <Label
                          htmlFor="email"
                          className="absolute w-9 top-0 left-1 [font-family:'Arial-Regular',Helvetica] font-normal text-graygray-700 text-sm tracking-[0] leading-[19.6px]"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                          className="w-[350px] h-[53px] absolute top-[37px] left-0 bg-blackampwhitewhite rounded-[15px] border border-solid border-slate-200 px-5"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="absolute w-[283px] h-[72px] top-0 left-0">
                        <div className="text-[#a0aec0] absolute w-[274px] top-[52px] left-1 [font-family:'Arial-Bold',Helvetica] font-bold text-graygray-400 text-sm text-center tracking-[0] leading-[19.6px]">
                          Enter your email and password to sign in
                        </div>
                        <span className="text-[#4fd1c5] absolute w-[226px] top-0 left-0 [font-family:'Arial-Bold',Helvetica] font-bold text-tealteal-300 text-[32px] text-center tracking-[0] leading-[41.6px]">
                          Welcome Back
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios/AxiosInstance";
import { toast } from "react-toastify";

// Tạo global styles (thay thế cho :root và body)
const GlobalStyle = createGlobalStyle`
    :root {
      font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;

      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
      background-color: #242424;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
    }

    @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
    }
  `;

// Tạo styled components cho các phần tử
const StyledLink = styled.a`
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;

  &:hover {
    color: #535bf2;
  }

  @media (prefers-color-scheme: light) {
    &:hover {
      color: #747bff;
    }
  }
`;

const StyledHeading = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;

const StyledButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    background-color: #f9f9f9;
  }
`;

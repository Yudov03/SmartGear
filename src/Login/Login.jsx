// import React from "react";
// import gear from "../assets/gear.svg";
// import gear1 from "../assets/gear-1.svg";

// export const Login = () => {
//   return (
//     <div className="container-fluid d-flex flex-column">
//       {/* Thanh Navigation */}
//       <NavigationBar />

//       {/* Nội dung chính */}
//       <div className="row flex-grow-1">
//         {/* Cột trái: Form đăng nhập */}
//         <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
//           <SignInComponent />
//         </div>

//         {/* Cột phải: Ảnh/biểu tượng */}
//         <div
//           className="col-md-6 d-flex align-items-center justify-content-center"
//           style={{ backgroundColor: "#14b8a6" }}
//         >
//           {/* Giới hạn chiều ngang ảnh bằng chiều ngang form (450px) */}
//           <img
//             src={gear}
//             alt="Gear"
//             style={{
//               // maxWidth: "1250px",
//               width: "100%", // Hoặc "99%", tùy ý
//               height: "auto", // Quan trọng: auto để giữ nguyên tỉ lệ
//               display: "block", // Tránh khoảng trống dưới ảnh do inline element
//               objectFit: "cover", // Tùy chọn, dùng cho ảnh raster. Với SVG thường không cần.
//             }}
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// const SignInComponent = () => {
//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center px-4 mx-auto w-100"
//       style={{ maxWidth: "500px" }}
//     >
//       <div className="w-100" style={{ maxWidth: "450px" }}>
//         <div
//           className="mb-3 fs-3 fw-bold text-center"
//           style={{ color: "#5eead4" }}
//         >
//           Welcome Back
//         </div>
//         <div
//           className="mb-4 small fw-bold text-center"
//           style={{ color: "#94a3b8" }}
//         >
//           Enter your email and password to sign in
//         </div>
//         <div className="mb-4">
//           <div className="mb-2 small" style={{ color: "#374151" }}>
//             Email
//           </div>
//           <div
//             className="d-flex align-items-center px-4 bg-white rounded"
//             style={{ border: "1px solid #e2e8f0", height: "53px" }}
//           >
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="w-100 bg-transparent"
//               style={{
//                 border: "none",
//                 color: "#94a3b8",
//                 outline: "none",
//                 boxShadow: "none",
//               }}
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <div className="mb-2 small" style={{ color: "#374151" }}>
//             Password
//           </div>
//           <div
//             className="d-flex align-items-center px-4 bg-white rounded"
//             style={{ border: "1px solid #e2e8f0", height: "53px" }}
//           >
//             <input
//               type="password"
//               placeholder="Your password"
//               className="w-100 bg-transparent"
//               style={{
//                 border: "none",
//                 color: "#94a3b8",
//                 outline: "none",
//                 boxShadow: "none",
//               }}
//             />
//           </div>
//         </div>
//         <div className="d-flex align-items-center mb-4">
//           <div className="d-flex align-items-center gap-2">
//             <div
//               className="position-relative"
//               style={{
//                 width: "2.25rem",
//                 height: "19px",
//                 backgroundColor: "#5eead4",
//                 borderRadius: "50px",
//               }}
//             >
//               <div
//                 className="position-absolute"
//                 style={{
//                   top: "2.75px",
//                   right: "3px",
//                   width: "13.5px",
//                   height: "13.5px",
//                   background: "white",
//                   borderRadius: "50%",
//                 }}
//               />
//             </div>
//             <span className="small" style={{ color: "#374151" }}>
//               Remember me
//             </span>
//           </div>
//         </div>
//         <button
//           className="mb-4 w-100 fw-bold"
//           style={{
//             fontSize: "0.75rem",
//             color: "white",
//             backgroundColor: "#5eead4",
//             border: "none",
//             borderRadius: "0.5rem",
//             height: "47px",
//           }}
//         >
//           SIGN IN
//         </button>
//         <div className="text-center">
//           <span className="small" style={{ color: "#94a3b8" }}>
//             Don't have an account?
//           </span>
//           <span
//             className="small fw-bold"
//             style={{ color: "#5eead4", cursor: "pointer" }}
//           >
//             {" "}
//             Sign up
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="d-flex justify-content-between align-items-center px-4 py-3 mt-auto">
//       <div className="small" style={{ color: "#94a3b8" }}>
//         <span>@ 2025, Made with ❤️ by </span>
//         <span className="fw-bold" style={{ color: "#5eead4" }}>
//           Duy
//         </span>
//         <span> & </span>
//         <span className="fw-bold" style={{ color: "#5eead4" }}>
//           Vy
//         </span>
//         <span> & </span>
//         <span className="fw-bold" style={{ color: "#5eead4" }}>
//           Khoa
//         </span>
//         <span> & </span>
//         <span className="fw-bold" style={{ color: "#5eead4" }}>
//           Anh
//         </span>
//         <span> for helping HCMUT student</span>
//       </div>
//       <div className="d-flex" style={{ gap: "1.5rem" }}>
//         <span className="small" style={{ color: "#94a3b8" }}>
//           Group 6
//         </span>
//         <span className="small" style={{ color: "#94a3b8" }}>
//           License
//         </span>
//       </div>
//     </footer>
//   );
// };

// const NavigationBar = () => {
//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingLeft: "24px",
//         paddingRight: "24px",
//         paddingTop: "16px",
//         paddingBottom: "16px",
//         backgroundColor: "rgba(255,255,255,0.82)",
//         backdropFilter: "blur(10.5px)",
//         borderWidth: "1.5px",
//         borderStyle: "solid",
//         borderColor: "#FFF",
//         boxShadow: "0px 7px 23px 0px rgba(0,0,0,0.05)",
//         marginBottom: "24px",
//         borderRadius: "15px",
//       }}
//     >
//       {/* Logo hoặc tên ứng dụng */}
//       <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <img src={gear1} alt="Logo" />
//       </div>

//       {/* Menu điều hướng */}
//       <div style={{ display: "flex", gap: "1.5rem" }}>
//         <a
//           href="#"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "0.95rem",
//             fontWeight: 500,
//           }}
//         >
//           Share & Chat
//         </a>
//         <a
//           href="#"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "0.95rem",
//             fontWeight: 500,
//           }}
//         >
//           Home
//         </a>
//         <a
//           href="#"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "0.95rem",
//             fontWeight: 500,
//           }}
//         >
//           Assessment
//         </a>
//         <a
//           href="#"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "0.95rem",
//             fontWeight: 500,
//           }}
//         >
//           Report
//         </a>
//         <a
//           href="#"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "0.95rem",
//             fontWeight: 500,
//           }}
//         >
//           Sign In
//         </a>
//       </div>
//     </nav>
//   );
// };

import React from "react";
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

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[0] h-[1080px]">
        <div className="relative h-[1080px]">
          {/* <div className="w-[1920px] h-[1052px] bg-[url(https://c.animaapp.com/m8qroov3KCtN5L/img/screencapture-demos-creative-tim-soft-ui-dashboard-pages-sign-in.png)] bg-cover bg-[50%_50%] absolute top-0 left-0" /> */}

          <div className="absolute w-[0] h-[1080px] top-0 left-0">
            <div className="relative h-[1080px] bg-white">
              {/* Footer */}
              <div className="absolute w-[985px] h-[18px] top-[1020px] left-[169px] flex justify-between">
                <div className="w-[423px] h-[18px]">
                  <div className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-400 text-xs tracking-[0] leading-[12.0px]">
                    <span className="text-[#a0aec0] leading-[18.0px]">
                      @ 2025, Made with ❤ by{" "}
                    </span>
                    {creators.map((creator, index) => (
                      <React.Fragment key={index}>
                        <span className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#38b2ac] leading-[18.0px]">
                          {creator.name}{" "}
                        </span>
                        {index < creators.length - 1 && (
                          <span className="text-[#a0aec0] leading-[18.0px]">
                            &amp;{" "}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                    <span className="text-[#a0aec0] leading-[18.0px]">
                      {" "}
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

              <div className="absolute w-[1454px] h-[895px] top-0 left-[56px]">
                <div className="absolute w-[1454px] h-[895px] top-0 left-0">
                  {/* Right side image */}
                  <img
                    className="absolute w-[862px] h-[895px] top-0 left-[592px]"
                    alt="Login background"
                    src="https://c.animaapp.com/m8qroov3KCtN5L/img/image.png"
                  />

                  {/* Navigation bar */}
                  <div className="absolute w-[988px] h-[72px] top-[25px] left-[200px]">
                    <div className="relative h-[72px]">
                      <Card className="w-[988px] h-[72px] absolute top-0 left-0">
                        <CardContent className="relative w-[991px] h-[75px] -top-0.5 -left-0.5 rounded-[15px] border-[1.5px] border-solid border-white shadow-[0px_7px_23px_#0000000d] backdrop-blur-[10.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10.5px)_brightness(100%)] [background:linear-gradient(137deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.8)_100%)] p-0">
                          {/* Sign up button */}
                          <Button className="flex w-[150px] h-[37px] px-2 py-0 absolute top-[19px] left-[814px] rounded-[34.5px] [background:linear-gradient(41deg,rgba(49,56,96,1)_0%,rgba(21,25,40,1)_100%)] items-center justify-center">
                            <div className="w-[89.5px] h-[15px] text-white [font-family:'Arial-Bold',Helvetica] font-bold text-[10px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
                              FREE SIGN UP!
                            </div>
                          </Button>

                          {/* Navigation menu */}
                          <div className="absolute w-[350px] h-6 top-[26px] left-[333px] flex justify-between">
                            {navItems.map((item, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                className="h-6 rounded-xl flex items-center justify-center px-2 py-0"
                              >
                                <img
                                  className="w-[11px] h-[11px]"
                                  alt={item.label.toLowerCase()}
                                  src={item.icon}
                                />
                                <span className="w-fit text-graygray-700 ml-1 [font-family:'Arial-Bold',Helvetica] font-bold text-[10px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
                                  {item.label}
                                </span>
                              </Button>
                            ))}
                          </div>

                          {/* Logo */}
                          <div className="absolute flex items-center h-[23px] top-[26px] left-[23px]">
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
                              <div className="absolute w-[22px] h-[23px] top-0 left-0 bg-[url(https://c.animaapp.com/m8qroov3KCtN5L/img/mask-group.png)] bg-[100%_100%]">
                                <img
                                  className="absolute w-[22px] h-[23px] top-0 left-0"
                                  alt="Mask group"
                                  src="https://c.animaapp.com/m8qroov3KCtN5L/img/mask-group-1.png"
                                />
                              </div>
                            </div>
                            <div className="ml-[12px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#2d3748] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                              SMARTGEAR
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Login form */}
                <div className="absolute w-[355px] h-[457px] top-[289px] left-0">
                  {/* Sign up link */}
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

                  {/* Sign in button */}
                  <Button className="w-[350px] h-[47px] absolute top-[385px] left-[3px] !bg-[#4fd1c5] rounded-xl text-white [font-family:'Arial-Bold',Helvetica] font-bold text-[10px] text-center tracking-[0] leading-[15px]">
                    SIGN IN
                  </Button>

                  {/* Remember me toggle */}
                  <div className="absolute w-32 h-[35px] top-[312px] left-[3px] flex items-center">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="remember-me"
                        className="bg-tealteal-300 data-[state=checked]:bg-tealteal-300"
                      />
                      <Label
                        htmlFor="remember-me"
                        className="[font-family:'Arial-Regular',Helvetica] font-normal text-graygray-700 text-xs tracking-[0] leading-[18.0px]"
                      >
                        Remember me
                      </Label>
                    </div>
                  </div>

                  {/* Password field */}
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
                    />
                  </div>

                  {/* Email field */}
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
                    />
                  </div>

                  {/* Header */}
                  <div className="absolute w-[283px] h-[72px] top-0 left-0">
                    <div className="text-[#a0aec0] absolute w-[274px] top-[52px] left-1 [font-family:'Arial-Bold',Helvetica] font-bold text-graygray-400 text-sm text-center tracking-[0] leading-[19.6px]">
                      Enter your email and password to sign in
                    </div>
                    <span className="text-[#4fd1c5] absolute w-[226px] top-0 left-0 [font-family:'Arial-Bold',Helvetica] font-bold text-tealteal-300 text-[32px] text-center tracking-[0] leading-[41.6px]">
                      Welcome Back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

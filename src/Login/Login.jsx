// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export const Login = () => {
//   // Navigation menu items data
//   const navItems = [
//     { icon: "/service.svg", label: "SERVICE" },
//     { icon: "/icon-1.svg", label: "EQUIPMENT" },
//     { icon: "/icon.svg", label: "ABOUT US" },
//     { icon: "/blog.svg", label: "BLOG" },
//   ];

//   // Footer creators data
//   const creators = [
//     { name: "Duy", separator: "&" },
//     { name: "Vy", separator: "&" },
//     { name: "Khoa", separator: "&" },
//     { name: "Anh", separator: null },
//   ];

//   return (
//     <div className="bg-transparent d-flex justify-content-center w-100">
//       <div className="w-100" style={{ maxWidth: "1920px", height: "1080px" }}>
//         <div className="position-relative" style={{ height: "1080px" }}>
//           <div
//             className="w-100 position-absolute top-0 start-0"
//             style={{
//               maxWidth: "1920px",
//               height: "1052px",
//               backgroundImage:
//                 "url(/screencapture-demos-creative-tim-soft-ui-dashboard-pages-sign-in.png)",
//               backgroundSize: "cover",
//               backgroundPosition: "50% 50%",
//             }}
//           />

//           <div
//             className="position-absolute w-100 top-0 start-0"
//             style={{ maxWidth: "1920px", height: "1080px" }}
//           >
//             <div className="position-relative h-100 bg-white">
//               {/* Footer */}
//               <div
//                 className="position-absolute bottom-0 start-50 translate-middle-x"
//                 style={{ width: "985px", height: "18px", marginBottom: "42px" }}
//               >
//                 <div
//                   className="position-absolute top-0 end-0"
//                   style={{ width: "114px", height: "18px" }}
//                 >
//                   <div className="position-absolute top-0 end-0 text-muted small">
//                     License
//                   </div>
//                   <div className="position-absolute top-0 start-0 text-muted small">
//                     Group 6
//                   </div>
//                 </div>

//                 <div
//                   className="position-absolute top-0 start-0"
//                   style={{ width: "423px", height: "18px" }}
//                 >
//                   <div className="text-muted small">
//                     @ 2025, Made with ❤ by{" "}
//                     {creators.map((creator, index) => (
//                       <React.Fragment key={index}>
//                         <span className="fw-bold text-info">
//                           {creator.name}{" "}
//                         </span>
//                         {creator.separator && (
//                           <span className="text-muted">
//                             {creator.separator}{" "}
//                           </span>
//                         )}
//                       </React.Fragment>
//                     ))}
//                     for helping HCMUT student
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="position-absolute top-0 end-0"
//                 style={{ width: "1454px", height: "895px" }}
//               >
//                 <div className="position-absolute w-100 h-100 top-0 start-0">
//                   {/* Hero image */}
//                   <img
//                     className="position-absolute end-0"
//                     alt="Login hero image"
//                     src="/image.png"
//                     style={{ width: "862px", height: "895px" }}
//                   />

//                   {/* Navigation bar */}
//                   <div
//                     className="position-absolute top-0 start-0 card"
//                     style={{
//                       width: "988px",
//                       height: "72px",
//                       marginTop: "25px",
//                       borderRadius: "15px",
//                       border: "1.5px solid white",
//                       boxShadow: "0px 7px 23px rgba(0, 0, 0, 0.05)",
//                       backdropFilter: "blur(10.5px)",
//                       background:
//                         "linear-gradient(137deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.8) 100%)",
//                     }}
//                   >
//                     <div className="card-body p-0 h-100">
//                       {/* Sign up button */}
//                       <button
//                         className="btn position-absolute top-0 end-0 mt-3 me-3"
//                         style={{
//                           height: "37px",
//                           width: "150px",
//                           borderRadius: "34.5px",
//                           background:
//                             "linear-gradient(41deg, rgba(49,56,96,1) 0%, rgba(21,25,40,1) 100%)",
//                           color: "white",
//                           fontSize: "10px",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         FREE SIGN UP!
//                       </button>

//                       {/* Navigation menu */}
//                       <div
//                         className="position-absolute d-flex gap-4"
//                         style={{
//                           top: "26px",
//                           left: "333px",
//                           width: "350px",
//                           height: "24px",
//                         }}
//                       >
//                         {navItems.map((item, index) => (
//                           <button
//                             key={index}
//                             className="btn btn-link p-2 d-flex align-items-center gap-1"
//                             style={{ height: "24px", borderRadius: "12px" }}
//                           >
//                             <img
//                               style={{ width: "11px", height: "11px" }}
//                               alt={item.label}
//                               src={item.icon}
//                             />
//                             <span
//                               className="text-secondary fw-bold"
//                               style={{ fontSize: "10px" }}
//                             >
//                               {item.label}
//                             </span>
//                           </button>
//                         ))}
//                       </div>

//                       {/* Logo */}
//                       <div
//                         className="position-absolute d-flex align-items-center"
//                         style={{ height: "23px", top: "26px", left: "23px" }}
//                       >
//                         <div
//                           className="position-relative"
//                           style={{ width: "22px", height: "23px" }}
//                         >
//                           <img
//                             className="position-absolute"
//                             alt="Fill"
//                             src="/fill-1.svg"
//                             style={{
//                               width: "15px",
//                               height: "16px",
//                               top: "4px",
//                               left: "3px",
//                             }}
//                           />
//                           <img
//                             className="position-absolute"
//                             alt="Fill"
//                             src="/fill-2.svg"
//                             style={{
//                               width: "3px",
//                               height: "3px",
//                               top: "10px",
//                               left: "9px",
//                             }}
//                           />
//                           <div
//                             className="position-absolute w-100 h-100 top-0 start-0"
//                             style={{
//                               background: "url(/mask-group.png) 100% 100%",
//                             }}
//                           >
//                             <img
//                               className="position-absolute w-100 h-100 top-0 start-0"
//                               alt="Mask group"
//                               src="/mask-group-1.png"
//                             />
//                           </div>
//                         </div>
//                         <span
//                           className="ms-3 fw-bold text-secondary"
//                           style={{ fontSize: "14px" }}
//                         >
//                           SMARTGEAR
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Login form */}
//                   <div
//                     className="position-absolute"
//                     style={{
//                       width: "355px",
//                       height: "457px",
//                       top: "289px",
//                       left: "0",
//                     }}
//                   >
//                     {/* Sign up link */}
//                     <div
//                       className="position-absolute text-center text-muted"
//                       style={{
//                         width: "202px",
//                         top: "437px",
//                         left: "77px",
//                         fontSize: "14px",
//                       }}
//                     >
//                       Don't have an account?{" "}
//                       <a
//                         href="#"
//                         className="text-info fw-bold text-decoration-none"
//                       >
//                         Sign up
//                       </a>
//                     </div>

//                     {/* Sign in button */}
//                     <button
//                       className="btn btn-info position-absolute text-white fw-bold"
//                       style={{
//                         width: "350px",
//                         height: "47px",
//                         top: "385px",
//                         left: "3px",
//                         borderRadius: "12px",
//                         fontSize: "10px",
//                       }}
//                     >
//                       SIGN IN
//                     </button>

//                     {/* Remember me toggle */}
//                     <div
//                       className="position-absolute d-flex align-items-center"
//                       style={{ height: "35px", top: "312px", left: "3px" }}
//                     >
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           id="remember-me"
//                         />
//                         <label
//                           className="form-check-label text-secondary small"
//                           htmlFor="remember-me"
//                         >
//                           Remember me
//                         </label>
//                       </div>
//                     </div>

//                     {/* Password field */}
//                     <div
//                       className="position-absolute"
//                       style={{
//                         width: "352px",
//                         height: "92px",
//                         top: "210px",
//                         left: "3px",
//                       }}
//                     >
//                       <label
//                         htmlFor="password"
//                         className="form-label text-secondary"
//                         style={{ marginLeft: "4px" }}
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         placeholder="Your password"
//                         style={{
//                           height: "53px",
//                           width: "350px",
//                           borderRadius: "15px",
//                         }}
//                       />
//                     </div>

//                     {/* Email field */}
//                     <div
//                       className="position-absolute"
//                       style={{
//                         width: "352px",
//                         height: "89px",
//                         top: "109px",
//                         left: "3px",
//                       }}
//                     >
//                       <label
//                         htmlFor="email"
//                         className="form-label text-secondary"
//                         style={{ marginLeft: "4px" }}
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         placeholder="Your email address"
//                         style={{
//                           height: "53px",
//                           width: "350px",
//                           borderRadius: "15px",
//                         }}
//                       />
//                     </div>

//                     {/* Heading */}
//                     <div
//                       className="position-absolute"
//                       style={{
//                         width: "283px",
//                         height: "72px",
//                         top: "0",
//                         left: "0",
//                       }}
//                     >
//                       <h2
//                         className="position-absolute text-muted text-center fw-bold"
//                         style={{
//                           width: "274px",
//                           top: "52px",
//                           left: "4px",
//                           fontSize: "14px",
//                         }}
//                       >
//                         Enter your email and password to sign in
//                       </h2>
//                       <h1
//                         className="position-absolute text-info text-center fw-bold"
//                         style={{
//                           width: "226px",
//                           fontSize: "32px",
//                         }}
//                       >
//                         Welcome Back
//                       </h1>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

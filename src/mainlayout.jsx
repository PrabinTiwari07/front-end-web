// import React, { useEffect, useState } from "react";
// import NotificationComponent from "./core/public/pages/notification";

// const MainLayout = ({ children }) => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/users", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         const user = await response.json();
//         setUserId(user._id);
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to CleanEase</h1>
//       {userId ? <NotificationComponent userId={userId} /> : <p>Loading user info...</p>}
//       <div>{children}</div>
//     </div>
//   );
// };

// export default MainLayout;

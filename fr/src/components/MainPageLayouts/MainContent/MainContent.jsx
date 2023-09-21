import { useAuthContext } from "../../../context/AuthProvider";
import { MainPageAdministration } from "../../Administration/MainPageAdministration/MainPageAdministration";
import { MainPageUser } from "../../User/MainPageUser/MainPageUser";
import "./MainContent.css";

export const MainContent = () => {
  const currentUser = useAuthContext();

  return (
    <main className="main-content">
      <div className="main-content__container">
        {currentUser.login ? (
          <>{currentUser.role === "admin" ? <MainPageAdministration currentUser={currentUser} /> : <MainPageUser/>}</>
        ) : (
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, rerum maxime. Voluptatum beatae iure
            animi minus omnis soluta quasi, sapiente nemo dignissimos. Non, quam aut?
          </>
        )}
      </div>
    </main>
  );
};

// import { useAuthContext } from "../../../context/AuthProvider";
// import "./MainContent.css";

// export const MainContent = () => {
//   const currentUser = useAuthContext();

//   let content;
//   if (currentUser.login) {
//     if (currentUser.role === "admin") {
//       content = <div>admin</div>;
//     } else {
//       content = <div>USER</div>;
//     }
//   } else {
//     content = <div>ВОЙДИТЕ</div>;
//   }

//   return (
//     <main className="main-content">
//       <div className="main-content__container">{content}</div>
//     </main>
//   );
// };

// import { useAuthContext } from "../../../context/AuthProvider";
// import "./MainContent.css";

// export const MainContent = () => {
//   const currentUser = useAuthContext();

//   return (
//     <main className="main-content">
//       <div className="main-content__container">
//         {currentUser.login && (
//           <>
//             {currentUser.role === "admin" ? <div>admin</div> : <div>USER</div>}
//           </>
//         )}
//         {!currentUser.login && <div>ВОЙДИТЕ</div>}
//       </div>
//     </main>
//   );
// };

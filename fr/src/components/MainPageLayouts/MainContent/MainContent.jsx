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
          <>
            {currentUser.role === "admin" ? (
              <MainPageAdministration currentUser={currentUser} />
            ) : (
              <MainPageUser currentUser={currentUser}/>
            )}
          </>
        ) : (
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium, rerum maxime. Voluptatum beatae iure animi minus omnis
            soluta quasi, sapiente nemo dignissimos. Non, quam aut?
          </>
        )}
      </div>
    </main>
  );
};
import "./TasksView.css";
import { useAuthContext } from "../../../../context/AuthProvider";
import { UserComponents } from "../ComponentsToRender/UserComponents/UserComponents";
import { V2UserComponents } from "../ComponentsToRender/V2UserComponents/V2UserComponents";
import { ChifComponents } from "../ComponentsToRender/ChifComponents/ChifComponents";
import { GeneralComponents } from "../ComponentsToRender/GeneralComponents/GeneralComponents";

export const TasksView = () => {
  const {role} = useAuthContext();
  let componentToRender;

  const renderGeneralComponents = () => {
    return <GeneralComponents />;
  };

  const renderChifComponents = () => {
    return <ChifComponents />;
  };

  const renderUserComponents = () => {
    // return <UserComponents/>
    return <V2UserComponents/>
  }

  if(role === 'general'){
    componentToRender = renderGeneralComponents()
  } else if (role === 'chife') {
    componentToRender = renderChifComponents()
  } else if (role === 'user') {
    componentToRender = renderUserComponents()
  }  

  return <div className="render-components">{componentToRender}</div>;
};

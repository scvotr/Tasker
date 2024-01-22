import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [dep, setDep] = useState('');
  const [subDep, setSubDep] = useState('');
  const [position, setPosition] = useState('');
  const [login, setLogin] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
      setToken(token);
    } else {
      setLogin(false);
    }
  };

  const getUserData = () => {
    try {
      const id = localStorage.getItem('userId');
      setId(id);
      const role = localStorage.getItem('userRole');
      setRole(role);
      const name = localStorage.getItem('userName');
      setName(name);
      const dep = localStorage.getItem('dep');
      setDep(dep);
      const subDep = localStorage.getItem('subDep');
      setSubDep(subDep);
      const position = localStorage.getItem('position');
      setPosition(position);
    } catch (error) {
      console.error('Ошибка при получении данных из localStorage:', error);
    }
  };

  const logout = () => {
    setLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('dep');
    localStorage.removeItem('subDep');
    localStorage.removeItem('position');
    localStorage.removeItem('initialData');
  };

  return (
    <AuthContext.Provider
      value={{
        id,
        name,
        role,
        token,
        login,
        dep,
        subDep,
        position,
        checkToken,
        getUserData,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

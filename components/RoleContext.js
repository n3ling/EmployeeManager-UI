import { createContext, useContext } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children, isManager }) => {
  return (
    <RoleContext.Provider value={isManager}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);


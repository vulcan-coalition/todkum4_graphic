import React, { useState } from "react";

interface UserContextProps {
  email?: string;
  setEmail?: any;
  isTutorial?: boolean;
  setIsTutorial?: any;
  isUpdateUserInfo?: boolean;
  setIsUpdateUserInfo?: any;
  isUserProfileUpdate?: boolean;
  setIsUserProfileUpdate?: any;
  isUpdate?: string;
  setIsUpdate?: any;
  isHelp?: boolean;
  setIsHelp?: any;
  username?: any;
  setUsername?: any;
  dayweekcombo? : number;
  setDayWeekCombo? : any;
  userType?: string;
  setUserType?: any;
  typeSetting? : string;
  setTypeSetting?: any;
}
export const UserContext = React.createContext<UserContextProps>({});
const UserProvider = (props: { children: React.ReactNode;}) => {
  const [email, setEmail] = useState('');
  const [isTutorial, setIsTutorial] = useState(true);
  const [isUpdateUserInfo, setIsUpdateUserInfo] = useState(false);
  const [isUserProfileUpdate, setIsUserProfileUpdate] = useState(false);
  const [isUpdate, setIsUpdate] = useState('');
  const [isHelp, setIsHelp] = useState(false);
  const [username, setUsername] = useState('');
  const [dayweekcombo, setDayWeekCombo] = useState(0);
  const [userType, setUserType] = useState("");
  const [typeSetting, setTypeSetting] = useState("");

  return (
    <UserContext.Provider value={{ 
      email, 
      setEmail, 
      isTutorial, 
      setIsTutorial,
      isUpdateUserInfo,
      setIsUpdateUserInfo,
      isUserProfileUpdate, 
      setIsUserProfileUpdate,
      isUpdate,
      setIsUpdate,
      isHelp,
      setIsHelp,
      username,
      setUsername,
      dayweekcombo,
      setDayWeekCombo,
      userType,
      setUserType,
      typeSetting,
      setTypeSetting }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

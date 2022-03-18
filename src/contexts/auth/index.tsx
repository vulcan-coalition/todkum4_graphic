import { createContext } from "react";

interface AuthContextProps {
  token: string;
  login: any;
  logout?: any;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  login: () => {},
  logout: () => {},
});

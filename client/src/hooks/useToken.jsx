import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useToken = () => {
  return useContext(AuthContext);
};

export default useToken;

import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../axios";

enum Sex {
  Male = "Male",
  Female = "Female",
}

type ContextProps = {
  children: JSX.Element;
};

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  admin: boolean;
  sex: Sex;
  address: string;
  valid_id_type: string;
  valid_id_pic: string;
  birthday: Date;
  age: number;
};

export const AuthContext = createContext({
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  sex: "",
  birthday: new Date(),
  age: 0,
  address: "",
  valid_id_type: "",
  valid_id_pic: "",
  isAdmin: false,
  authenticated: false,
  accessToken: "",
  loading: true,
  authenticate: (user: User, token: string) => {},
  logout: () => {},
});

export default (props: ContextProps): JSX.Element => {
  const navigate = useNavigate();

  const [authentication, setAuthentication] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    sex: "",
    birthday: new Date(),
    age: 0,
    address: "",
    valid_id_type: "",
    valid_id_pic: "",
    isAdmin: false,
    authenticated: false,
    accessToken: "",
    loading: true,
  });

  const checkAuthentication = () => {
    axios
      .post("/auth/check")
      .then((res) => authenticate(res.data.user, res.data.accessToken, false))
      .catch((error) => {
        console.log(error);
        setAuthentication({ ...authentication, loading: false });
      });
  };

  useEffect(() => {
    checkAuthentication();

    const interval = setInterval(checkAuthentication, 5 * 1000);

    return () => clearInterval(interval);
  }, []);

  const authenticate = (
    user: User,
    token: string,
    redirect: boolean = true
  ) => {
    setAuthentication({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      sex: user.sex,
      address: user.address,
      birthday: user.birthday,
      age: user.age,
      valid_id_type: user.valid_id_type,
      valid_id_pic: user.valid_id_pic,
      isAdmin: user.admin,
      authenticated: true,
      accessToken: token,
      loading: false,
    });

    if (redirect) navigate("/");
  };

  const logout = async () => {
    await axios.post("/auth/logout");

    setAuthentication({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      sex: "",
      birthday: new Date(),
      age: 0,
      address: "",
      valid_id_type: "",
      valid_id_pic: "",
      isAdmin: false,
      authenticated: false,
      accessToken: "",
      loading: false,
    });

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        id: authentication.id,
        first_name: authentication.first_name,
        last_name: authentication.last_name,
        email: authentication.email,
        sex: authentication.sex,
        birthday: authentication.birthday,
        age: authentication.age,
        address: authentication.address,
        valid_id_type: authentication.valid_id_type,
        valid_id_pic: authentication.valid_id_pic,
        isAdmin: authentication.isAdmin,
        authenticated: authentication.authenticated,
        accessToken: authentication.accessToken,
        loading: authentication.loading,
        authenticate,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

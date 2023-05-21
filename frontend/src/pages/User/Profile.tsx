import React, { useContext } from "react";
import { RouteProps } from "react-router";
import { AuthContext } from "../../contexts/Auth";

const Profile = (props: RouteProps) => {
  const authContext = useContext(AuthContext);

  console.log({ authContext });

  return (
    <div className="profile-wrapper">
      <div className="left-panel">
        <div className="person-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="text-normal username">{authContext.first_name} {authContext.last_name}</div>
        <button onClick={authContext.logout} className="button-primary">
          Logout
        </button>
      </div>

      <div className="right-panel">
        <span className="title-small">Profile</span>

        <div className="skeleton">Email: {authContext.email}</div>
        <div className="skeleton">Sex: {authContext.sex}</div>
        <div className="skeleton">Birthday: {authContext.birthday}</div>
        <div className="skeleton">Age: {authContext.age}</div>
        <div className="skeleton">Address: {authContext.address}</div>
      </div>
    </div>
  );
};

export default Profile;

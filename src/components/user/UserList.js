import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { ProfileContext } from "../auth/AuthProvider.js";
import { useHistory, Link } from "react-router-dom";

export const UserList = () => {
  const {  users, getAllUsers, getUserById } = useContext(UserContext);
  const history = useHistory();
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getAllUsers();
    getProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedUsers = [...users].sort((a, b) => {
    return a.full_name.localeCompare(b.label);
  });

  // const handleUserClick = (id) => {
  //   getUserById(id)
  //   .then(() => history.push(`/users/${id}`))
  // }

  return (
    <>
      <h1>All Users</h1>
      <br></br>
      {sortedUsers.map((user) => {
        return (
          <>
            <div>Name: <Link className="title_link" onClick={() => history.push(`/profile/${user.id}`)}>{user.full_name}</Link></div>
            <div>Bio: {user.bio}</div>
            <div>Profile Image URL: {user.profile_image_url}</div>
            <div>Is Staff: {user.user?.is_staff.toString()}</div>
          </>
  );
        })}
        </>)
};

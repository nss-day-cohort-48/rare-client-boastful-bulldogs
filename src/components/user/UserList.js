import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { ProfileContext } from "../auth/AuthProvider.js";
import { useHistory, Link } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export const UserList = () => {
  const { users, getAllUsers, getUserById, updateUser } =
    useContext(UserContext);
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
            <div>
              Name:{" "}
              <Link
                className="title_link"
                onClick={() => history.push(`/profile/${user.id}`)}
              >
                {user.full_name}
              </Link>
            </div>
            <div>Bio: {user.bio}</div>
            <div>Profile Image URL: {user.profile_image_url}</div>
            <div>Is Staff: {user.user?.is_staff.toString()}</div>
            <div>Is Active: {user.user?.is_active.toString()}</div>
            {/* -------------------- TOGGLES -------------------- */}
            <FormControlLabel
              control={
                <Checkbox
                  value={user.is_active ? 0 : 1}
                  checked={user.is_active}
                  onChange={(e) => {
                    const newUserObj = { ...user };
                    newUserObj.approved = parseInt(e.target.value);
                    updateUser(newUserObj).then(getAllUsers());
                  }}
                  name="is_active_toggle"
                />
              }
              label="Is active? (Toggle)"
            />
            {/* -------------------- TOGGLES -------------------- */}
          </>
        );
      })}
    </>
  );
};

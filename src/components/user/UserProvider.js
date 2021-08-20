import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const getAllUsers = () => {
    return fetch("http://localhost:8000/users", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data)); // updates state with User from server
  };

  const getUserById = (userId) => {
    return fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    }).then((res) => res.json());
    // .then(setuserObj);
  };

  //   const adduserObj = (newuserObjObj) => {
  //     return fetch(`http://localhost:8000/User`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
  //       },
  //       body: JSON.stringify(newuserObjObj),
  //     }).then(getAllUser);
  //   };

  //   const deleteuserObj = (userObjId) => {
  //     return fetch(`http://localhost:8000/User/${userObjId}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
  //       },
  //     }).then(getAllUser);
  //   };

  const updateUser = (userObj) => {
    return fetch(`http://localhost:8000/user/${userObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(userObj),
    });
    // .then(setuserObj(userObj));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        getAllUsers,
        getUserById,
        updateUser,
        // adduserObj,
        // deleteuserObj,
        // edituserObj,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

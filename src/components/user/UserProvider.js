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
    // .then(setTag);
  };

//   const addTag = (newTagObj) => {
//     return fetch(`http://localhost:8000/User`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
//       },
//       body: JSON.stringify(newTagObj),
//     }).then(getAllUser);
//   };

//   const deleteTag = (tagId) => {
//     return fetch(`http://localhost:8000/User/${tagId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
//       },
//     }).then(getAllUser);
//   };

//   const editTag = (tag) => {
//     return fetch(`http://localhost:8000/User/${tag.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
//       },
//       body: JSON.stringify(tag),
//     });
//     // .then(setTag(tag));
//   };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        getAllUsers,
        getUserById,
        // addTag,
        // deleteTag,
        // editTag,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

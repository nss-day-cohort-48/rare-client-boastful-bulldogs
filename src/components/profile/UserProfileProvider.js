import React, { useState, createContext } from 'react'

export const UserProfileContext = createContext()


export const UserProfileProvider = (props) => {
    const [userProfile, setUserProfile] = useState({})

    const getUserProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
        })
        .then(res => res.json())
        .then((data) => setUserProfile(data))
    }
    
    const getProfileByUserId = userId => {
        return fetch(`http://localhost:8000/profile?userId=${userId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
        .then(res => res.json())
        .then(setUserProfile)
    }


    return (
        <UserProfileContext.Provider value = {
            {
                getUserProfile, userProfile, getProfileByUserId
            }
        }>
            {props.children}
        </UserProfileContext.Provider>
    )
}
import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UserProfileContext } from './UserProfileProvider'


export const ProfileDetail = () => {
    const { userProfile, getProfileByUserId } = useContext(UserProfileContext)
    const history = useHistory();
    const { userId } = useParams();

    useEffect(() => {
        getProfileByUserId(userId)
    }, [userId])
    
  


    return (
        <>
            <section>
                <div>
                    <h2>{userProfile.user?.first_name}'s Profile</h2>
                </div>
                <div>
                    <div>Full Name: {userProfile.full_name}</div>
                    <div>Image:</div>
                    <div>Display Name: {userProfile.user?.username}</div>
                    <div>Email: {userProfile.user?.email}</div>
                    <div>Profile Created On: {userProfile.user?.date_joined}</div>
                    <div>Profile Type:
                        {
                            userProfile.user?.is_staff
                            ? <> Admin</>
                            : <> Author</>
                        }
                    </div>
                </div>
                <br></br>
                <button onClick={() => history.push("/users")}>Go Back</button>
            </section>
        </>
    )
}
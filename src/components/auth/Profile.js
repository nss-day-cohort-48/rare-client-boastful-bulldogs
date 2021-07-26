import React, { useEffect, useContext } from "react"
import { EventContext } from "../event/EventProvider.js"
import { HumanDate } from "../utils/HumanDate.js"
import { ProfileContext } from "./AuthProvider.js"
import "./Profile.css"


export const Profile = (props) => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.gamer && profile.gamer.user.first_name} {profile.gamer && profile.gamer.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.gamer && profile.gamer.user.username}</div>
                <div className="profile__bio">About you: {profile.gamer && profile.gamer.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Events</h3>
                </header>
                <div className="registrations">
                    {
                        profile.events.map(event => {
                            return <div key={event.id} className="registration">
                                <div className="registration__game">{event.game.title}</div>
                                <div>{event.description}</div>
                                <div>
                                    <HumanDate date={event.date} /> @ {event.time}
                                </div>
                                <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id).then(getProfile)}
                                >Leave</button>
                            </div>
                        })
                    }
                </div>
            </section>
            <section className="profile__games">
                <header className="games__header">
                    <h3>Your Games</h3>
                </header>
                <div className="games">
                    {
                        profile.gamer && profile.gamer.games.map(game => {
                            return <section key={`game--${game.id}`} className="game">
                                <div className="game__title">{game.title} by {game.maker}</div>
                                <div className="game__players">{game.number_of_players} players needed</div>
                                <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                                <button className="btn btn-4"
                                    onClick={() => props.history.push(`/games/${game.id}/edit`)}
                                >Edit</button>
                            </section>
                        })
                    }
                </div>
            </section>
        </article>
    )
}
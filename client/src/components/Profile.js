import React, { useEffect } from 'react'
import Feed from './Feed'
import {NavLink, useRouteMatch, useParams} from 'react-router-dom'
import {getProfile} from '../redux/actions/user'
import {Grid, Image, Icon, Menu} from 'semantic-ui-react'
import '../styles/profile.css'
import { useDispatch } from 'react-redux'

const Profile = () => {
    const params = useParams()
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const user = window.location.pathname

    useEffect(() => {
        dispatch(getProfile(user))
        console.log(user)
    }, [])

    return (
        <>
            <Grid.Row id="top">
                <NavLink to="/home"><Icon name="arrow left"/></NavLink>
                <div>
                    <h3>David Kalina</h3>
                    <small> 0 posts</small>
                </div>
            </Grid.Row>
            <Grid.Row id="banner">
                <Image src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/88/4d/9a.jpg" fluid/>
            </Grid.Row>
            <Grid.Row id="information">
               <Icon name="user circle"/>
                <div className="information-text">
                    <h3>David Kalina</h3>
                    <p>@DavidKalina</p>
                    <div className="profile-stats">
                    <span className="num">0</span> Following <span className="num">0</span> Followers
                    </div>
                </div>
                <Menu pointing secondary id="profile-nav">
                <NavLink exact to={`/${match.params.username}`}>Cards</NavLink>
                <NavLink exact to={`/${match.params.username}/likes`}>Likes</NavLink>
                </Menu>
            </Grid.Row>
            <Feed/>
        </>
    );
}
 
export default Profile;
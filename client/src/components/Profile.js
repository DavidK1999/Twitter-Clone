import React, { useEffect } from 'react'
import Feed from './Feed'
import Follow from './Follow'
import Followed from './Followed'
import {NavLink, useRouteMatch} from 'react-router-dom'
import {getProfile} from '../redux/actions/user'
import {Grid, Image, Icon, Menu} from 'semantic-ui-react'
import '../styles/profile.css'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const user = window.location.pathname
    const profile = useSelector(state => state.user.userData)
    const currentUser = useSelector(state => state.auth.currentUser)

    useEffect(() => {
        dispatch(getProfile(user))
    }, [profile.followers && profile.followers.length])

    return (
        <>
            <Grid.Row id="top">
                <NavLink to="/home"><Icon name="arrow left"/></NavLink>
                <div>
                    <h3>{profile.username}</h3>
                    <small> 0 posts</small>
                </div>
            </Grid.Row>
            <Grid.Row id="banner">
                <Image src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/88/4d/9a.jpg" fluid/>
            </Grid.Row>
            <Grid.Row id="information">
               <Icon name="user circle"/>
                <div className="information-text">
                    <div>
                        <h3>{profile.username}</h3>
                        <p>{profile.email}</p>
                    </div>
                    
                    {profile.isFollowing 
                        ?
                            <Followed/>
                        :   
                            <Follow userToFollow={profile.username}/>
                    }
                </div>

                
                <div className="profile-stats">
                    <span className="num">{profile.following && profile.following.length}</span> Following <span className="num">{profile.followers && profile.followers.length}</span> Followers
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
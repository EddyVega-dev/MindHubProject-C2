import React, { useState, useEffect } from 'react'
import Header from './Header'
import { connect } from "react-redux";
import usersActions from '../redux/actions/usersActions';
import { GoogleLogin } from 'react-google-login';

const LogIn = (props) => {

    const [newUser, setNewUser] = useState({

    });

    const readInput = e => {
        const camp = e.target.name
        const value = e.target.value
        setNewUser({
            ...newUser,
            [camp]: value
        })
    };

    const sendInfo = e => {
        e.preventDefault()

        if (newUser.username === '' || newUser.password === '') {
            alert('All camps are required, please take a look again')
        }
        else {
            const userToLogIn = { username: newUser.username, password: newUser.password }
            props.userLogIn(userToLogIn)
        }
    };
    const responseGoogle = (response) => {
        props.userLogIn({
            username: response.profileObj.email,
            password: response.profileObj.googleId
        })
    }

    useEffect(() => {
        if (props.token) {
            alert(`Welcome back ${props.name}`)
            props.history.push('/Home')/* CREAR HOME */
        }
    }, [props.token]);

    return (
        <>
            <div className='d-flex'>
                <div style={{ backgroundImage: 'url(https://www.playerone.vg/wp-content/uploads/2019/07/cd-projekt-red-creacion-personaje-jugabilidad-cyberpunk-2077-1-772x1024.jpg)', width: '45%', height: '100vh', backgroundPosition: 'top right', backgroundSize: 'cover' }}>

                </div>
                <div className='form section container center d-flex flex-column align-items-center login' style={{ width: '55%', height: '100vh' }}>
                    <h1>Please, choose your account</h1>
                    <input type='text' name='username' placeholder='Type your username'
                        onChange={readInput} />
                    <input type='password' name='password' placeholder='Type your password'
                        onChange={readInput} />

                    <button onClick={sendInfo}>Log In</button>
                    <GoogleLogin
                        clientId="575358746516-8ot9u4rh9irr4uf17ogf1bcqjt2aqneu.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
        /</div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        name: state.usersReducer.name,
        token: state.usersReducer.token
    }
}

const mapDispatchToProps = {
    userLogIn: usersActions.userLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
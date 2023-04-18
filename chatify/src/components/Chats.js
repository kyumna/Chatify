import React, { useRef, useEffect, useState } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'


const Chats = () => {
    const didMountRef=useRef(false)
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const { user } = useAuth();
    console.log(user)
    const handleLogout = async () => {
        await auth.signOut();
        history('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current=true
            if (!user || user ===null){
                
                history('/');
                return;
            }
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'project-id': "51eb9f2c-dcf4-42aa-899a-7882c1d70e70",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData()
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append('avatar', avatar,avatar.name)
                        axios.post('https://api.chatengine.io/users',
                            formdata,
                            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                        )
                            .then(() => {
                                setLoading(false)

                            })
                            .catch((error) => console.log('e',error.response))


                    })
            })
    }, [user, history])
    if (!user || loading) return <div/>
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Chatify
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>
            <div style={{ backgroundColor: 'red' }}>
                <ChatEngine
                    height="calc(100vh-66px)"
                    projectID="51eb9f2c-dcf4-42aa-899a-7882c1d70e70"
                    userName={user.email}
                    userSecret={user.uid} /></div>
        </div>
    )
}

export default Chats


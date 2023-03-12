import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import axios from 'axios'
import { url } from '../const'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../authSlice'


export const Header = () => {
    const auth = useSelector((state) => state.auth.isSignIn)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [cookies, removeCookie] = useCookies()
    const navigate = useNavigate()

    
    useEffect(() => {
        if (auth) {
            axios
                .get(`${url}/users`, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${cookies.token}`,
                    }
                })
                .then((res) => {
                    // console.log(res.data)
                    setName(res.data.name)
                })
        }
    }, [])
    

    const handleSignup = () => {
        navigate('/signup')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleProfile = () => {
        navigate('/profile')
    }
    const handleLogout = () => {
        dispatch(signOut())
        removeCookie('token')
        navigate('/login')
    }
 
    return (
        <header className="header">
            <h1>書籍レビューアプリ</h1>
            {auth? (
                <>
                    {name}でログイン中
                    <button onClick={handleProfile} className="change-profile-button">
                        ユーザー名変更
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        ログアウト
                    </button>
                </>
            ): (
                <>
                    <button onClick={handleSignup} className="sign-out-button">
                        サインアップ
                    </button>
                    <button onClick={handleLogin} className="sign-out-button">
                        ログイン
                    </button>
                </>
            )}
        </header>
    )
}
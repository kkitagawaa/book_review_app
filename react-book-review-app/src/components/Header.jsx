import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { url } from '../const'
import { useCookies } from 'react-cookie'


export const Header = () => {
    const auth = useSelector((state) => state.auth.isSignIn)
    const [name, setName] = useState("")
    const [cookies] = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
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

    return (
        <header className="header">
            <h1>書籍レビューアプリ</h1>
            <button onClick={handleSignup} className="sign-out-button">
                サインアップ
            </button>
            {auth? (
                <>
                    {name}でログイン中
                    <button onClick={handleProfile} className="change-profile-button">
                        ユーザー名変更
                    </button>
                </>
            ): (
                <>
                    <button onClick={handleLogin} className="sign-out-button">
                        ログイン
                    </button>
                </>
            )}
        </header>
    )
}
import React from 'react'
import { useNavigate } from 'react-router-dom'

import './header.css'

export const Header = () => {
    const navigate = useNavigate()

    const handleSignup = () =>{
        navigate('/signup')
    }
    const handleLogin = () =>{
        navigate('/login')
    }

    return (
        <header className="header">
            <h1>書籍レビューアプリ</h1>
            <button onClick={handleSignup} className="sign-out-button">
                サインアップ
            </button>
            <button onClick={handleLogin} className="sign-out-button">
                ログイン
            </button>
        </header>
    )
}
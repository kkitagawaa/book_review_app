import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { LogIn } from '../pages/Login'
import { Home } from '../pages/Home'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    )
}
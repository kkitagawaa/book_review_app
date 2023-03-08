import React from 'react'
import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { LogIn } from '../pages/Login'
import { ReviewList } from '../pages/ReviewList'
import { Profile } from '../pages/Profile'
import { NewReview } from '../pages/NewReview'

export const Router = () => {
    const auth = useSelector((state) => state.auth.isSignIn)

    return (
        <BrowserRouter>
            <Routes>
                {auth? (
                    <>
                        <Route exact path="/signup" element={<Navigate to="/" />} />
                        <Route exact path="/login" element={<Navigate to="/" />} />
                        <Route exact path="/" element={<ReviewList />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/new" element={<NewReview />} />
                    </>
                ) : (
                    <>
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path="/login" element={<LogIn />} />
                        <Route exact path="/" element={<Navigate to="/signup" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}
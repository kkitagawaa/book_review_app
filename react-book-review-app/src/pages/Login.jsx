import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import './login.css'
import { url } from '../const'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../authSlice'

export const LogIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie] = useCookies()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onLogIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie('token', res.data.token)
        console.log("ログインに成功しました")
        dispatch(signIn())
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

  if (auth) return navigate('/')

  return (
    <div>
      <Header />
      <main className="login">
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="login-form" onSubmit={handleSubmit(onLogIn)}>
          <label className="email-label" htmlFor='login-email-input'>メールアドレス</label>
          <input
            className="email-input"
            id='login-email-input'
            label="メールアドレス"
            // type="email"
            {...register("email", { 
              required: "必須項目です",
              pattern: {
                value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                message: '正しいメールアドレスを入力してください'
              }
            })}
            onChange={handleEmailChange}
          />
          <span className="error-message">
            {errors.email?.message}<br />
          </span>
          <label className="password-label">パスワード</label>
          <input
            className="password-input"
            label="パスワード"
            type="password"
            {...register("password", { 
              required: '必須項目です',
              minLength: {
                value: 6,
                message: 'パスワードは6文字以上で入力してください',
              }
            })}
            onChange={handlePasswordChange}
          />
          <span className="error-message">
            {errors.password?.message}<br />
          </span>
          <input className="login-button" type="submit" value="ログイン" />
        </form>

        <Link to="/signup">サインアップ</Link>
      </main>
    </div>
  )
}
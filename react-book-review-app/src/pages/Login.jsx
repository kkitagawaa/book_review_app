import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/Header'
// import './signin.scss'
import { url } from '../const'
import { useForm } from "react-hook-form"

export const LogIn = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie] = useCookies()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const { register, handleSubmit} = useForm();

  const onLogIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie('token', res.data.token)
        console.log("ログインに成功しました")
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`)
      })
  }

//   if (auth) return navigate('/')

  return (
    <div>
      <Header />
      <main className="login">
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="login-form" onSubmit={handleSubmit(onLogIn)}>
          <label className="email-label">メールアドレス</label>
          <input
            className="email-input"
            label="メールアドレス"
            type="email"
            {...register("email", { required: true})}
            onChange={handleEmailChange}
          /><br />
          <label className="password-label">パスワード</label>
          <input
            className="password-input"
            label="パスワード"
            type="password"
            {...register("password", { required: true})}
            onChange={handlePasswordChange}
          /><br />
          <input className="login-button" type="submit" value="ログイン" />
        </form>

        <Link to="/signup">サインアップ</Link>
      </main>
    </div>
  )
}
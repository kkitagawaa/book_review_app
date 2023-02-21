import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { url } from '../const'
// import './signUp.scss'
import { useForm } from "react-hook-form"
import Compressor from 'compressorjs'

export const SignUp = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessge] = useState()
  const [cookies, setCookie] = useCookies()
  const { register, handleSubmit } = useForm();

  const onSignUp = (data) => {
    const usersPayload = {
      email: data.email,
      name: data.name,
      password: data.password,
    }
    const iconRow = data.image[0]
    const iconCompressor = new Compressor(iconRow, {
      quality: 0.8,
      success: (result) => {
          console.log("画像圧縮成功")
          const resultFile = new File([result], 'image.jpeg', {
            type: result.type,
        });
          return resultFile
      }});  

    axios
      .post(`${url}/users`, usersPayload)
      .then((res) => {
        const token = res.data.token
        setCookie('token', token)
        console.log("user作成成功")
        
        axios
          .post(
            `${url}/uploads`,
            {icon: iconCompressor.file},
            {headers:
              {
                'Accept': 'application/json',
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${cookies.token}`
              }
            }) 
          .then(() => {
            console.log("画像アップロード成功")
            navigate('/')
          })
          .catch((err) => {
            setErrorMessge(`画像アップロードに失敗しました。 ${err}`)
          })
        
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`)
      })

    // if (auth) return navigate('/')
  }
  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        
        <form className="signup-form" onSubmit={handleSubmit(onSignUp)}>
          <label>メールアドレス</label>
          <input
            className="email-input"
            label="メールアドレス"
            type="email"
            {...register("email", { required: true})}
          /><br />
          <label>ユーザ名</label>
          <input
            className="name-input"
            label="ユーザ名"
            type="text"
            {...register("name", { required: true})}
          /><br />
          <label>パスワード</label>
          <input
            className="password-input"
            label="パスワード"
            type="password"
            {...register("password", { required: true})}
          /><br />
          <label>画像</label>
          <input
            className="image-input"
            label="画像"
            type="file"
            accept="image/*"
            {...register("image", { required: true})}
          /><br />
          <input className="signup-button" type="submit" value="サインアップ" />
        </form>
      </main>
    </div>
  )
}
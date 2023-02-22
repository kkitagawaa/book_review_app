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
  const { register, handleSubmit, formState: { errors } } = useForm();

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
            {...register("email", { 
              required: "必須項目です",
              pattern: {
                value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                message: '正しいメールアドレスを入力してください'
              }
            })}
          />
          <span className="error-message">
            {errors.email?.message}<br />
          </span><br />
          <label>ユーザ名</label>
          <input
            className="name-input"
            label="ユーザ名"
            type="text"
            {...register("name", { 
              required: '必須項目です',
            })}
          />
          <span className="error-message">
            {errors.name?.message}<br />
          </span><br />
          <label>パスワード</label>
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
          />
          <span className="error-message">
            {errors.password?.message}<br />
          </span><br />
          <label>画像</label>
          <input
            className="image-input"
            label="画像"
            type="file"
            accept="image/*"
            {...register("image", { 
              required: '必須項目です',
            })}
          />
          <span className="error-message">
            {errors.image?.message}<br />
          </span><br />
          <input className="signup-button" type="submit" value="サインアップ" />
        </form>
      </main>
    </div>
  )
}
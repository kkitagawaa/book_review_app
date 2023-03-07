import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies] = useCookies()
    const [name, setName] = useState("")    
    const { register, handleSubmit, formState: { errors } } = useForm();

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
    }, [name])


    const onProfileChange = (data) => {
        const payload = {
            name: data.name
        }

        axios
            .put(`${url}/users`, payload, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log("変更成功")
                navigate('/')
            })
            .catch((err) => {
                setErrorMessage(`ユーザ名変更に失敗しました。 ${err}`)
            })
    }

    return (
        <div>
            <Header />
            <div className="profile">
                <h2>ユーザ名変更</h2>
                <p className="error-message">{errorMessage}</p>

                <form className="change-profile-form" onSubmit={handleSubmit(onProfileChange)}>
                    <label>ユーザ名</label>
                    <input 
                        type="text"
                        className="name-input"
                        label="ユーザ名"
                        // value={name}
                        defaultValue={name}
                        {...register("name", {
                            required
                            : "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.name?.message}
                    </div>
                    <input className="change-profile-button" type="submit" value="変更" />
                </form>
            </div>
        </div>
    )
}
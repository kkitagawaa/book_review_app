import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form"

export const EditReview = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies] = useCookies()
    const reviewID = useParams().reviewID
    const [title, setTitle] = useState('')
    const [bookurl, setBookUrl] = useState('')
    const [detail, setDetail] = useState('')
    const [review, setReview] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        axios
            .get(`${url}/books/${reviewID}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                // console.log(res.data)
                setTitle(res.data.title)
                setBookUrl(res.data.url)
                setDetail(res.data.detail)
                setReview(res.data.review)
            })
    }, [])



    const onEditReview = (data) => {
        const editReviewPayload = {
            title: data.title,
            url: data.url,
            detail: data.detail,
            review: data.review,
        }

        axios
            .put(`${url}/books/${reviewID}`, editReviewPayload, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log("レビュー編集に成功")
                navigate('/')
            })
            .catch((err) => {
                setErrorMessage(`レビューの編集に失敗しました。 ${err}`)
            })
    }

    const handleDeleteReview = () => {
        axios
            .delete(`${url}/books/${reviewID}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log("レビュー削除に成功")
                navigate('/')
            })
            .catch((err) => {
                setErrorMessage(`レビューの削除に失敗しました。 ${err}`)
            })

    }  

    return(
        <div>
            <Header />
            <h2>編集</h2>
            <p className="error-message">{errorMessage}</p>

            <form className="change-profile-form" onSubmit={handleSubmit(onEditReview)}>
            <label>書籍タイトル</label>
                    <input
                        className="title-input"
                        label="title"
                        defaultValue={title}
                        {...register("title", {
                            required: "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.title?.message}
                    </div>
                    <label>書籍情報参照URL</label>
                    <input
                        className="url-input"
                        label="url"
                        defaultValue={bookurl}
                        {...register("url", {
                            required: "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.url?.message}
                    </div>
                    <label>書籍情報詳細</label>
                    <textarea
                        cols="50"
                        rows="5"
                        className="detail-input"
                        label="detail"
                        defaultValue={detail}
                        {...register("detail", {
                            required: "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.detail?.message}
                    </div>
                    <label>読んだ感想</label>
                    <textarea
                        cols="50"
                        rows="5"
                        className="review-input"
                        label="review"
                        defaultValue={review}
                        {...register("review", {
                            required: "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.review?.message}
                    </div>
                    <button onClick={handleDeleteReview}>削除</button>
                    <input className="edit-review-button" type="submit" value="編集する" />
            </form>

        </div>
    )
}
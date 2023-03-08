import React, { useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const NewReview = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessge] = useState()
    const [cookies] = useCookies()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onPostNewReview = (data) => {
        const newReviewPayload = {
            title: data.title,
            url: data.url,
            detail: data.detail,
            review: data.review,
        }

        axios
            .post(`${url}/books`, newReviewPayload, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log("レビュー投稿に成功")
                navigate('/')
            })
            .catch((err) => {
                setErrorMessge(`レビューの投稿に失敗しました。 ${err}`)
            })
    }

    return (
        <div>
            <Header />
            <div className="post-new-review">
                <h2>新規レビュー作成</h2>
                <p className="error-message">{errorMessage}</p>

                <form className="post-new-review-form" onSubmit={handleSubmit(onPostNewReview)}>
                    <label>書籍タイトル</label>
                    <input
                        className="title-input"
                        label="title"
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
                        {...register("review", {
                            required: "必須項目です"
                        })}
                    />
                    <div className="error-message">
                        {errors.review?.message}
                    </div>
                    <input className="post-new-review-button" type="submit" value="投稿する" />
                </form>
            </div>
        </div>
    )
}
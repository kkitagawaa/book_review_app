import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewInfo = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies] = useCookies()
    const reviewID = useParams().reviewID;
    const [title, setTitle] = useState('')
    const [bookurl, setBookUrl] = useState('')
    const [detail, setDetail] = useState('')
    const [review, setReview] = useState('')
    const [reviewer, setReviewer] = useState('')
    const [isMine, setIsMine] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios
            .post(`${url}/logs`, { selectBookId: reviewID }, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log("ログを送信しました")
            })
            .catch((err) => {
                setErrorMessage(`ログの送信に失敗しました。${err}`)
            })
    },[])
    
    useEffect(() => {
        axios
            .get(`${url}/books/${reviewID}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                // setTimeout(()=>setIsLoaded(true),3000)
                setIsLoaded(true)
                setTitle(res.data.title)
                setBookUrl(res.data.url)
                setDetail(res.data.detail)
                setReview(res.data.review)
                setReviewer(res.data.reviewer)
                setIsMine(res.data.isMine)
            })
            .catch((err) => {
                setErrorMessage(`レビュー詳細の取得に失敗しました。${err}`)
            })
    }, [])


    return(
        <div>
            <Header />
            <h2>レビュー詳細</h2>
            { errorMessage }

            {isLoaded? (
                <div className="review-info">
                    <p className="review-title">本のタイトル： {title}</p>
                    <p className="review-url">書籍情報参照URL： {bookurl}</p>
                    <p className="review-detail">書籍情報詳細： {detail}</p>
                    <p className="review-review">読んだ感想： {review}</p>
                    <p className="review-reviewer">投稿者： {reviewer}</p>
                </div>
            ) : (
                <p>ロード中です...</p>
            )}
        </div>
    )        
}
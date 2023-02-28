import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { url } from '../const'
import './reviewList.css' 

export const ReviewList = () => {
    const [reviewList, setReviewList] = useState([])
    const [offset, setOffset] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies] = useCookies()

    useEffect(() => {
        axios
            .get(`${url}/books?offset=${offset}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cookies.token}`,
                }
            })
            .then((res) => {
                console.log(res.data)
                setReviewList(res.data)
            })
            .catch((err) => {
                setErrorMessage(`レビューの取得に失敗しました。${err}`)
            })
    }, [offset])

    return (
        <div>
            <Header />
            <h2>Review List</h2>
            { errorMessage }
            <div className='review-list'>
                <p className='review-list__errorMessage'>{ errorMessage }</p>
                {reviewList.map((review) => {
                    return (
                        <div className='review-list__link' key={review.id}>
                            {/* <Link to={'/' + review.id }> */}
                                <div className='' id={review.id}>
                                    <span className='review-list__title'>本のタイトル： {review.title}</span><br/>
                                    <span className='review-list__review'>レビュー： {review.review}</span><br/>
                                    <span className='review-list__reviewer'>投稿者： {review.reviewer}</span>
                                </div>
                            {/* </Link> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { url } from '../const'
import './reviewList.css' 
import ReactPaginate from 'react-paginate'

export const ReviewList = () => {
    const [reviewList, setReviewList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies] = useCookies()

    useEffect(() => {
        axios
            .get(`${url}/books?offset=0`, {
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
    }, [])


    const hanflePageClick = (e) => {
        const offset = e.selected * 10

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
    }

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
                                    <div className='review-list__title'>本のタイトル： {review.title}</div>
                                    <div className='review-list__review'>レビュー： {review.review}</div>
                                    <div className='review-list__reviewer'>投稿者： {review.reviewer}</div>
                                </div>
                            {/* </Link> */}
                        </div>
                    )
                })}

                <ReactPaginate
                    pageCount={5}
                    onPageChange={hanflePageClick}
                    containerClassName="pagination"
                    
                    previousLabel='<'
                    nextLabel='>'
                    
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    nextClassName='page-item'
                    previousLinkClassName='page-link'
                    nextLinkClassName='page-link'
                    
                    activeClassName='active'

                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                />
            </div>
        </div>
    )
}
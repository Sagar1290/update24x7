'use client'

import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsCard from './NewsCard.js'
import Loader from './Loader.js'

const Main = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("general")
    const [isLoading, setIsLoading] = useState(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=in&category=${category}`;

    async function initialFetch() {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}&page=${page}`);
            const data = await response.json();
            setData(data.articles);
        }
        catch (error) {
            console.log("error while fetching data initially: ", error)
        }
        finally {
            setIsLoading(false);
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`${url}&page=${page}`);
            const fetchedData = await response.json();
            setData((prevData) => [...prevData, ...fetchedData.articles])
        }
        catch (error) {
            console.log("error whiel fetching : ", error)
            alert("error while fetching")
        }

    }

    useEffect(() => {
        const fetchOnPageBasis = () => {
            (page <= 1) ? initialFetch() : fetchData();
        }
        fetchOnPageBasis();
    }, [page, category])


    const handleNavigation = (category) => {
        setData([]);
        setPage(1)
        setCategory(category);
    }
    const handleInfiniteScroll = () => {
        setPage(page + 1);
    }

    return (
        <section>
            <h1 className="p-2 text-gray-900 font-bold flex flex-col">
                <span className="w-screen text-3xl text-center p-6 dark:text-white">Welcome to updates 24x7</span>
                <section>
                    <div className='flex flex-row dark:text-gray-200 flex-wrap'>
                        <button onClick={() => handleNavigation("general")} className='w-44 p-4 text-center hover:shadow-lg dark:hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]'>General</button>
                        <button onClick={() => handleNavigation("business")} className='w-44 p-4 text-center hover:shadow-lg dark:hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]'>Business</button>
                        <button onClick={() => handleNavigation("entertainment")} className='w-44 p-4 text-center hover:shadow-lg dark:hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]'>Entertainment</button>
                        <button onClick={() => handleNavigation("sports")} className='w-44 p-4 text-center hover:shadow-lg dark:hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]'>Sports</button>
                        <button onClick={() => handleNavigation("technology")} className='w-44 p-4 text-center hover:shadow-lg dark:hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]'>Technology</button>
                    </div>
                </section>
            </h1>
            {
                isLoading ? <Loader />
                    :
                    <div className=" flex flex-wrap justify-center">
                        {console.log("i have fetched more data on your request")}
                        {console.log(`current page is ${page}`)}
                        {
                            data.map((currElem, index) => {
                                return (
                                    (currElem.urlToImage && currElem.content) ?
                                        <div key={index} className="w-96 p-4 ">
                                            <NewsCard data={currElem} />
                                        </div> : null
                                )
                            })
                        }
                    </div>
            }
            {
                isLoading
                    ?
                    null
                    :
                    <div className="flex justify-center">
                        <button onClick={handleInfiniteScroll} type="button" className=" text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 ">Load More News! </button>
                    </div>
            }
        </section >
    )
}

export default Main

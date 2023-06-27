import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputUrlBox from '../components/InputUrlBox';
import ShortenUrlBox from '../components/ShortenUrlBox';
import Navbar from '../components/Navbar';


const IndexPage = () => {

    // const shortenedURLdata = useSelector(state => state.shortenedURLdata);

    const [shorten_URL, setShorten_URL] = useState(null);

    return (
        <>
            <Navbar />
            {!shorten_URL ? (
                <InputUrlBox setShorten_URL={setShorten_URL} />
            ) : (
                <ShortenUrlBox shorten_URL={shorten_URL} />
            )}
        </>
    )
}

export default IndexPage;


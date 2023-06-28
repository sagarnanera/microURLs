import React, { useState } from 'react';
import InputUrlBox from '../components/InputUrlBox';
import ShortenUrlBox from '../components/ShortenUrlBox';
import Navbar from '../components/Navbar';


const IndexPage = () => {

    const [shorten_URL, setShorten_URL] = useState(null);

    return (
        <>
            <Navbar />
            {!shorten_URL ? (
                <InputUrlBox setShorten_URL={setShorten_URL} />
            ) : (
                <ShortenUrlBox shorten_URL={shorten_URL} setShorten_URL={setShorten_URL} />
            )}
        </>
    )
}

export default IndexPage;


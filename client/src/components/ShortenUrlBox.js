import React, { useState } from 'react'
import { useNavigation } from "react-router-dom";
import { FaCopy, FaFacebookSquare, FaShare, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa"
import { Tooltip } from 'react-tooltip'


const ShortenUrlBox = ({ shorten_URL, setShorten_URL }) => {

    // const [shortenUrl, setShortenUrl] = useState("");

    // const navigate = useNavigation();


    const handleClick = () => {
        // navigate("/");
        setShorten_URL(null);
    }


    // const handleshare = e => {
    //   if ("share" in navigator) {
    //     navigator
    //       .share({
    //         title: "Share Shorten URL With Someone",
    //         url: shorten_URL
    //       })
    //       .then(() => {
    //         console.log("Shared SuccessFully");
    //       })
    //       .catch(console.error);
    //   } else {
    //     alert(`Sorry this browser doesn't have native share`);
    //   }
    // };

    // const handleclick = () => {
    //   window.navigator.clipboard.writeText(shorten_URL).then(() => {
    //     alert("Shorten url has been copied to your clipboard.");
    //   });
    // };


    return (
        <>
            <div className="flex flex-col bg-white p-2 md:p-4 m-2 rounded" style={{ maxWidth: "600px" }}>
                <div>
                    <div>
                        <div className="flex flex-col mx-2">
                            <div className="flex">
                                <label className="m-1 font-medium text-xl  md:text-2xl" htmlFor="original-url">
                                    Your long URL
                                </label>
                            </div>
                            <input
                                className="w-full border rounded text-lg  md:text-xl p-2 outline-none"
                                type="url"
                                name="original-url"
                                id="original-url"
                                value={shorten_URL.Original_URL}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <div className="flex">
                            <label className="m-1 font-medium text-xl  md:text-2xl mx-2" htmlFor="shorten-url">
                                microURL
                            </label>
                        </div>
                        <div className="w-full mx-2 ml-1">
                            <input
                                className="w-full border rounded text-lg  md:text-xl p-2 outline-none"
                                type="text"
                                name="shorten-url"
                                id="shorten-url"
                                value={shorten_URL.shorten_URL}
                                placeholder="shorten-url"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="m-2 flex">
                        <button
                            className='text-blue-800 mx-1 border border-blue-800 bg-transparent rounded hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg p-2 px-4'
                            data-tooltip-id='visit'
                            onClick={() => window.open(shorten_URL.shorten_URL)}
                        >
                            <FaShare /></button>
                        <Tooltip id='visit' content='Visit URL' />
                        <button
                            className='text-blue-800 mx-1 border border-blue-800 bg-transparent rounded hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg px-2'
                        >
                            <FaFacebookSquare className='text-4xl' />
                        </button>
                        <button className='text-blue-800 mx-1 border border-blue-800 bg-transparent rounded hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg px-2'><FaWhatsappSquare className='text-4xl' /></button>
                        <button className='text-blue-800 mx-1 border border-blue-800 bg-transparent rounded hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg px-2'><FaTwitterSquare className='text-4xl' /></button>
                        <button
                            className='text-white mx-1 border bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg p-2 px-4'
                            data-tooltip-id='copy'
                            onClick={() => navigator.clipboard.write(shorten_URL.shorten_URL)}
                        >
                            <FaCopy className='text-xl inline-block mr-2' />Copy
                        </button>
                        <Tooltip id='copy' content='Copy URL to the clipboard' />
                    </div>
                    <div className="mx-2">
                        <button
                            className="w-full mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-xl"
                            onClick={handleClick}
                        >
                            Create another microURL
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortenUrlBox

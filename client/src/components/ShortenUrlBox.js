import React, { useState } from 'react'
import { useNavigation } from "react-router-dom";


const ShortenUrlBox = ({ shorten_URL }) => {

    // const [shortenUrl, setShortenUrl] = useState("");

    const navigate = useNavigation();


    const handleClick = () => {
        navigate("/");
    }


    return (
        <>
            <div className="flex flex-col bg-white p-2 md:p-4 rounded" style={{ maxWidth: "600px" }}>
                <div>
                    <div>
                        <div className="flex flex-col mx-2">
                            <div className="flex">
                                <label className="m-1 font-medium text-xl  md:text-2xl" htmlFor="original-url">
                                    Your long URL
                                </label>
                            </div>
                            <input
                                className="w-full border rounded text-lg  md:text-xl p-2"
                                type="url"
                                name="original-url"
                                id="original-url"
                                value={shorten_URL}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <div className="flex">
                            <label className="m-1 font-medium text-xl  md:text-2xl mx-2" htmlFor="shorten-url">
                                Add custom Slug
                            </label>
                        </div>
                        <div className="w-full mx-2 ml-1">
                            <input
                                className="w-full border rounded text-lg  md:text-xl p-2"
                                type="text"
                                name="shorten-url"
                                id="shorten-url"
                                value={shorten_URL}
                                placeholder="shorten-url"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mx-2">
                        <button
                            className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-xl"
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

import axios from "axios";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { setShortenURLdata } from '../store/actions/setShortenURLdata';


const key = process.env.REACT_APP_CAPTCHA_KEY;

const InputUrlBox = ({ setShorten_URL }) => {

  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");

  const recaptchaRef = useRef(0);
  // const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    if (originalUrl === "" || !originalUrl) {

      toast.error("Provide Long URL!", {
        position: toast.POSITION.TOP_RIGHT
      });

      return;
    }


    try {
      const captchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      console.log("host : " + process.env.REACT_APP_HOST);

      const res = await axios.post("http://" + process.env.REACT_APP_HOST + "/add", {
        URL: originalUrl,
        customSlug: customSlug,
        captchaToken: captchaToken
      });

      if (res.data.status === 200) {
        console.log(res.data);
        setShorten_URL(res.data);
      } else {
        console.log("some error occurred...........");
      }
    } catch (error) {
      console.log("Unknown error ocurred... : " + error.message);
    }
  };

  // const handleclick = () => {
  //   window.navigator.clipboard.writeText(shorten_URL).then(() => {
  //     alert("Shorten url has been copied to your clipboard.");
  //   });
  // };

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

  return (
    <div className="flex flex-col bg-white p-2 md:p-4 m-2 rounded" style={{ maxWidth: "600px" }}>
      <div>
        <div>
          <div className="flex flex-col mx-2">
            <div className="flex">
              <label className="m-1 font-medium text-xl  md:text-2xl" htmlFor="original-url">
                Enter long URL
              </label>
            </div>
            <input
              className="w-full border rounded text-lg  md:text-xl p-2"
              type="url"
              name="original-url"
              id="original-url"
              value={originalUrl}
              onChange={e => {
                setOriginalUrl(e.target.value);
              }}
              required
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex">
            <label className="m-1 font-medium text-xl  md:text-2xl mx-2" htmlFor="shorten-url">
              Add custom Slug
            </label>
          </div>
          <div className="w-full flex">
            <div className="w-1/2 mx-2 mr-1">
              <input
                className="w-full border rounded text-lg  md:text-xl p-2 outline-none"
                type="text"
                name="host-url"
                id="host-url"
                readOnly
                value={`http://${process.env.REACT_APP_HOST}/`}
              />
            </div>
            <div className="w-1/2 mx-2 ml-1">
              <input
                className="w-full border rounded text-lg  md:text-xl p-2"
                type="text"
                name="custom-slug"
                id="custom-slug"
                value={customSlug}
                onChange={e => {
                  setCustomSlug(e.target.value)
                }}
                placeholder="custom-slug"
              />
            </div>
          </div>
        </div>
        <div className="mx-2">
          <button
            className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-xl"
            onClick={handleSubmit}
          >
            Create microURL
          </button>
        </div>
      </div>
      <div>
        <ReCAPTCHA sitekey={key} ref={recaptchaRef} size="invisible" />
      </div>
    </div>
  );
}

export default InputUrlBox;
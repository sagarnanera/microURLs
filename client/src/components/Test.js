import axios from "axios";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const key = process.env.REACT_APP_CAPTCHA_KEY;

export default function Test() {
  const [data, setData] = useState("");
  const [shorten_URL, setShorten_URL] = useState("");
  const [button, setButton] = useState(true);

  const recaptchaRef = useRef(0);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const captchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      console.log("host : " + process.env.REACT_APP_HOST);

      const res = await axios.post("http://" + process.env.REACT_APP_HOST + "/add", {
        URL: data,
        captchaToken: captchaToken
      });

      if (res.data.status === 200) {
        setShorten_URL(res.data.shorten_URL);
        setButton(false);
      } else {
        console.log("some error occurred...........");
      }
    } catch (error) {
      console.log("Unknown error ocurred... : " + error.message);
    }
  };

  const handleclick = () => {
    window.navigator.clipboard.writeText(shorten_URL).then(() => {
      alert("Shorten url has been copied to your clipboard.");
    });
  };

  const handleshare = e => {
    if ("share" in navigator) {
      navigator
        .share({
          title: "Share Shorten URL With Someone",
          url: shorten_URL
        })
        .then(() => {
          console.log("Shared SuccessFully");
        })
        .catch(console.error);
    } else {
      alert(`Sorry this browser doesn't have native share`);
    }
  };

  return (
    <div className="form-wrapper d-flex flex-column">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <label className="m-1" htmlFor="original-url">
              URL
            </label>
          </div>
          <input
            className="m-1"
            type="url"
            name="original-url"
            id="original-url"
            value={data}
            onChange={e => {
              setData(e.target.value);
            }}
            required
          />
        </div>
        <div className="my-2">
          <ReCAPTCHA sitekey={key} ref={recaptchaRef} size="invisible" />
        </div>
        <div className="">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>

      <div className="d-flex flex-column mt-4">
        <div className="d-flex">
          <label className="m-1" htmlFor="shorten-url">
            Shorten URL
          </label>
        </div>
        <input
          className="my-2"
          type="text"
          name="shorten-url"
          id="shorten-url"
          readOnly
          value={shorten_URL}
        />
        <div className="btns d-flex justify-content-evenly">
          <div className="copy-btn">
            <button
              className="btn btn-primary"
              onClick={handleclick}
              disabled={button}
            >
              Copy
            </button>
          </div>
          <div className="share-btn">
            <button
              className="btn btn-primary"
              onClick={handleshare}
              disabled={button}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

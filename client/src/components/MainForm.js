import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
// import env from 'react-dotenv'

const key = "6Lco0EsiAAAAABwF3o3ZQRgyQbD8-gEmGQXPN1-I";

export default function MainForm(props) {

    const onChange = (value) => {
        console.log("Captcha value:", value);
    }


    return (
        <div>
            {/* <h1>slug : {props.slug}</h1> */}

            <div className='form-control'>

                <label htmlFor="original-url">URL</label>

                <input type="url" name="original-url" id="original-url" placeholder='Enter your url here'/>

            </div>

            <div className='m-2'>
                <ReCAPTCHA
                    sitekey={key}
                    onChange={onChange}
                />
            </div>

            <div className='m-2'>
                <div className="d-flex flex-column">
                    <label htmlFor="shorten_url" className="">Shorten URL : </label>
                    <div className='d-inline-flex'>
                        <input type="text" readOnly className="form-control m-2" id="shorten_url" placeholder="....." />
                        <div className=''>
                            <button className='btn btn-success m-2'>Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

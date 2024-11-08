import React, { useState } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios";

export default function App(){

  const [URL, setURL] = useState("");

  const handleURL = (event) =>{
    event.preventDefault();
    setURL(event.target.value);
  }

  const downloadSong = async () =>{
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };
    try {
      setURL("");
      const res = await axios.request(options)
      window.location.href=res.data.data.downloadLink;
    } catch (error) {
      console.log(error);
    }
  }

  return(
      <div
        className="text-black-600 w-screen h-screen
        bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
        from-rose-600 via-emerald-600 to-amber-500
        flex items-center justify-center flex-col"
        >

        <div className="flex items-center justify-center">
          <SlSocialSpotify size={100}/>
          <p className="text-2xl ml-4 font-bold">Song Downloader</p>
        </div>

        <div className="mt-4">
          <input type="url" placeholder="    paste the link of song here" className="rounded-lg h-8 w-60" onChange={handleURL} value={URL}></input>
          <button className="ml-4 bg-blue-400 text-black border border-black rounded-lg h-8 w-20 text-sm" onClick={downloadSong}>Download</button>
        </div>
      </div>
  )
}

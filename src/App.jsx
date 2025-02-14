import React, { useState } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios";

export default function App() {
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleURL = (event) => {
    event.preventDefault();
    setURL(event.target.value);
    setError("");
  };

  const extractSpotifyId = (url) => {
    try {
      // Handle different Spotify URL formats
      const regex = /track\/([a-zA-Z0-9]+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  };

  const downloadSong = async () => {
    if (!URL) {
      setError("Please enter a Spotify URL");
      return;
    }

    const songId = extractSpotifyId(URL);
    if (!songId) {
      setError("Invalid Spotify URL. Please enter a valid Spotify song link.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: songId
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const res = await axios.request(options);
      if (res.data && res.data.data && res.data.data.downloadLink) {
        window.location.href = res.data.data.downloadLink;
      } else {
        throw new Error("Download link not found in response");
      }
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download song. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
      setURL("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-fuchsia-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-75"></div>
          <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl">
          {/* Logo and Title */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
              <SlSocialSpotify className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Song Downloader
            </h1>
          </div>

          {/* Input Group */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="url"
                placeholder="Paste Spotify song link here (e.g., https://open.spotify.com/track/...)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                onChange={handleURL}
                value={URL}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={downloadSong}
              disabled={isLoading || !URL}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 
                ${isLoading || !URL 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25'
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Download Song'
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Enter a valid Spotify song link to download
          </p>
        </div>
      </div>
    </div>
  );
}

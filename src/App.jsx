import React, { useState, useEffect } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import { FiLink, FiDownload, FiGithub } from "react-icons/fi";
import axios from "axios";

export default function App() {
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    const smoothCursor = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
      }));
      requestAnimationFrame(smoothCursor);
    };
    smoothCursor();
  }, [mousePosition]);

  const handleURL = (event) => {
    event.preventDefault();
    setURL(event.target.value);
    setError("");
  };

  const extractSpotifyId = (url) => {
    try {
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
      params: { songId },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const res = await axios.request(options);
      if (res.data?.data?.downloadLink) {
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
      {/* Custom Cursor */}
      <div 
        className="cursor"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          left: -10,
          top: -10
        }}
      />
      <div 
        className="cursor-dot"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          left: -2,
          top: -2
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-gradient-animate bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-cyan-900/20"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
          }}
        ></div>
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(calc(-50% + ${(mousePosition.x - window.innerWidth / 2) * 0.05}px), calc(-50% + ${(mousePosition.y - window.innerHeight / 2) * 0.05}px))`
            }}
          ></div>
          <div 
            className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-75"
            style={{
              transform: `translate(calc(-50% + ${(mousePosition.x - window.innerWidth / 2) * 0.03}px), calc(-50% + ${(mousePosition.y - window.innerHeight / 2) * 0.03}px))`
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-150"
            style={{
              transform: `translate(calc(50% + ${(mousePosition.x - window.innerWidth / 2) * 0.04}px), calc(50% + ${(mousePosition.y - window.innerHeight / 2) * 0.04}px))`
            }}
          ></div>
        </div>
        <div className="noise"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md glass-morphism rounded-2xl p-8 hover-glow">
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg animate-float">
                <SlSocialSpotify className="w-12 h-12 text-white animate-glow" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-title">
              Spotify Downloader
            </h1>
            <p className="text-gray-400 text-center max-w-sm">
              Download your favorite Spotify tracks with just one click
            </p>
          </div>

          {/* Input Group */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-green-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FiLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="Paste Spotify song link here"
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  onChange={handleURL}
                  value={URL}
                />
              </div>
            </div>

            {error && (
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-sm"></div>
                <div className="relative text-red-400 text-sm text-center p-3 rounded-lg border border-red-500/20 bg-black/30">
                  {error}
                </div>
              </div>
            )}

            <button
              onClick={downloadSong}
              disabled={isLoading || !URL}
              className={`relative w-full group ${
                isLoading || !URL 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg blur group-hover:blur-xl transition-all duration-300"></div>
              <div className={`relative w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 
                ${isLoading || !URL 
                  ? 'bg-gray-800/80' 
                  : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white hover:shadow-lg hover:shadow-green-500/50'
                }`}
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
                  <>
                    <FiDownload className="w-5 h-5" />
                    <span>Download Song</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Made with ❤️ for music lovers
            </p>
          </div>
        </div>
      </div>

      {/* GitHub Button */}
      <a
        href="https://github.com/JeninSutradhar/Spotify_Dw"
        target="_blank"
        rel="noopener noreferrer"
        className="github-btn p-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-green-500/50"
      >
        <FiGithub className="w-6 h-6" />
      </a>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
  const formRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(
          /\/?$/,
          ""
        )}/openai`,
        {
          prompt,
        }
      );
      let data = res.data;
      setResponse(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let root: any = document.querySelector(":root");

    if (localStorage.getItem("isDarkTheme") === "true") {
      root.style.setProperty("--theme-color-scheme", "dark");
      setIsDarkMode(true);
    } else if (localStorage.getItem("isDarkTheme") === "false") {
      root.style.setProperty("--theme-color-scheme", "light");
      setIsDarkMode(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.style.setProperty("--theme-color-scheme", "dark");
      localStorage.setItem("isDarkTheme", "true");
      setIsDarkMode(true);
    }

    if (response) {
      type();
    }
  }, [response]);

  // Typewriter effect start
  let index = 0;
  let timer: any = null;

  const type = () => {
    clearTimeout(timer);

    const typewriter: any = document.getElementById("typewriter");

    if (index < response.length) {
      typewriter.innerHTML =
        response.slice(0, index) + '<span className="blinking-cursor">|</span>';
      index++;
      timer = setTimeout(type, 20);
    } else {
      typewriter.innerHTML = response.slice(0, index);
    }
  };
  // Typewriter effect end

  return (
    <main
      className={`flex min-h-screen flex-col gap-[24px] ${inter.className}`}
    >
      <div className="sticky top-0 py-[20px] px-[30px] flex items-center justify-between">
        <h1 className="gradient-text text-3xl font-[800] text-center">
          ChatGpt
        </h1>

        <button
          className="p-[16px] border rounded-md border-neutral-700 transition-colors hover:border-gray-300"
          onClick={() => {
            let root: any = document.querySelector(":root");
            if (isDarkMode) {
              localStorage.setItem("isDarkTheme", "false");
              root.style.setProperty("--theme-color-scheme", "light");
            } else {
              localStorage.setItem("isDarkTheme", "true");
              root.style.setProperty("--theme-color-scheme", "dark");
            }
            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="px-[16px]">
        <div className="min-h-[50vh] lg:max-w-4xl md:max-w-3xl mx-auto w-full group rounded-lg border px-5 py-4 transition-colors hover:dark:border-gray-300 hover:bg-gray-100 border-neutral-700 hover:dark:bg-neutral-800/30">
          <div
            id={"typewriter"}
            className={`prose w-full break-words prose-stone dark:prose-invert mx-auto`}
          >
            <h2
              className={`text-center mb-3 text-2xl font-semibold text-inherit`}
            >
              Response
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[16px] text-center sticky bottom-[0px] pb-[40px] mt-[60px]">
        <form
          ref={formRef}
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex items-end justify-center gap-[16px] relative max-w-[800px] mx-auto"
        >
          <textarea
            name="prompt"
            placeholder="Type your prompt here..."
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setPrompt(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prompt.length > 0) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="p-[1rem] pr-[48px] min-h-[58px] rounded-md w-full border transition-colors hover:border-gray-300"
          />

          <div className="absolute right-[.75rem] bottom-[.75rem]">
            <button
              type="submit"
              disabled={prompt.length === 0}
              className="disabled:opacity-50 !bg-[black] dark:bg-transparent max-w-[32px] max-h-[32px] relative inline-flex items-center justify-center px-3 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
              {/* <!-- Top glass gradient --> */}
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              {/* <!-- Bottom gradient --> */}
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              {/* <!-- Left gradient --> */}
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              {/* <!-- Right gradient --> */}
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4"
                  strokeWidth="2"
                >
                  <path
                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Index;

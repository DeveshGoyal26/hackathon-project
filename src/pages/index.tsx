import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import Query from "@/components/query";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
  const formRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(
          /\/?$/,
          ""
        )}/openai`,
        {
          userData,
          prompt,
        }
      );

      let data = res.data;

      localStorage.setItem("userData", JSON.stringify([...data]));
      setResponse(data);
      setUserData([...data]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Theme
  useEffect(() => {
    if (localStorage.getItem("isDarkTheme") === "true") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (localStorage.getItem("isDarkTheme") === "false") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDarkTheme", "true");
      setIsDarkMode(true);
    }

    const localdata: any = localStorage.getItem("userData") || null;

    if (localdata) {
      setUserData(JSON.parse(localdata));
    }
  }, [response]);

  return (
    <main
      className={`flex min-h-screen flex-col gap-[24px] justify-between ${inter.className}`}
    >
      <div className="bg-white dark:bg-black sticky top-0 py-[20px] px-[30px] flex items-center justify-between">
        <h1 className="gradient-text text-3xl font-[800] text-center">
          ChatGpt
        </h1>

        <button
          className="p-[8px] border rounded-md border-neutral-700 transition-colors hover:border-gray-300"
          onClick={() => {
            let root: any = document.querySelector(":root");
            if (isDarkMode) {
              localStorage.setItem("isDarkTheme", "false");
              document.documentElement.classList.remove("dark");
            } else {
              localStorage.setItem("isDarkTheme", "true");
              document.documentElement.classList.add("dark");
            }
            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="px-[16px]">
        <h2 className={`text-center mb-3 text-2xl font-semibold text-inherit`}>
          Response
        </h2>

        {userData &&
          userData.length > 0 &&
          userData.map((item: any, index: number) => (
            <Query key={index} {...item} />
          ))}
      </div>

      <div
        className="px-[16px] text-center sticky bottom-[0px] pb-[40px] mt-[60px]"
        style={{
          background: `linear-gradient(180deg,rgba(53,55,64,0),${
            isDarkMode ? "#121212" : "#f0efef"
          } 58.85%)`,
        }}
      >
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
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prompt.length > 0) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="p-[1rem] pr-[48px] min-h-[58px] rounded-md w-full border-neutral-600 transition-colors hover:border-gray-300"
          />

          <div className="absolute right-[.75rem] bottom-[.75rem]">
            <button
              type="submit"
              disabled={prompt.length === 0 || isLoading}
              className="disabled:cursor-not-allowed disabled:opacity-50 !bg-[black] dark:bg-transparent max-w-[32px] max-h-[32px] relative inline-flex items-center justify-center px-3 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
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
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
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
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Index;

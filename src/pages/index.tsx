import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import PromptInput from "@/components/PromptInput";
import Query from "@/components/Query";
import { axiosErrorHandler } from "@/util/error";
import SideNav from "@/components/SideNav";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userSlug, setUserSlug] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/?$/, "")}/user`,
        {
          userData,
          prompt,
          slug: userSlug,
        }
      );

      let data = res.data;

      if (!userSlug) {
        localStorage.setItem("userSlug", JSON.stringify(data.slug));
        setUserSlug(data.slug);
      }
      setResponse(data);
      setUserData([...data.conversation]);
    } catch (error) {
      const err: any = axiosErrorHandler(error);
      console.log("err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async (slug: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(
          /\/?$/,
          ""
        )}/getUserData`,
        {
          slug: slug ? slug : "",
        }
      );

      let data = res.data;

      if (!userSlug) {
        localStorage.setItem("userSlug", data.slug);
        setUserSlug(data.slug);
      }

      setResponse(data);
      setUserData([...data.conversation]);
    } catch (error) {
      const err: any = axiosErrorHandler(error);
      console.log("err:", err);
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
    const userSlug = localStorage.getItem("userSlug");

    if (userSlug) {
      setUserSlug(userSlug);
      getUserData(userSlug);
    } else {
      getUserData("");
    }

    if (localdata) {
      setUserData(JSON.parse(localdata));
    }
  }, []);

  return (
    <main
      className={`flex max-h-screen overflow-hidden flex-col justify-between ${inter.className}`}
    >
      <div
        className="max-h-[64px] bg-white dark:bg-black sticky z-[3] top-0 py-[20px] px-[30px] flex items-center justify-between"
        style={{
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        }}
      >
        {isDarkMode ? (
          <img src="/img/Navbar/masai-logo-white.svg" alt="logo" />
        ) : (
          <img src="/img/Navbar/masai-logo-black.svg" alt="logo" />
        )}

        <button
          className="p-[8px] border rounded-md border-neutral-700 transition-colors hover:border-gray-300"
          onClick={() => {
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
          {isDarkMode ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className="fill-transparent"
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className="fill-slate-400 dark:fill-slate-500"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                className="fill-slate-400 dark:fill-slate-500"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6"
            >
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                className="fill-sky-400/20 stroke-sky-500"
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className="stroke-sky-500"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className="w-full flex items-start justify-between max-w-[1440px] mx-auto">
        <div className="hidden md:flex flex-1 w-full min-w-[600px] overflow-y-scroll border-r">
          <div className="max-h-screen">
            <SideNav isDarkMode={isDarkMode} />
            <div className="h-20 flex-shrink-0"></div>
          </div>
        </div>
        <div className="w-full min-h-screen">
          <div className="flex flex-wrap justify-between border-b px-[24px] py-[16px]">
            <p>Results</p>
          </div>
          <div className="overflow-hidden min-h-screen">
            <div className="overflow-y-auto ">
              <div className="max-h-screen w-full">
                {userData &&
                  userData.length > 0 &&
                  userData.map((item: any, index: number) => {
                    return (
                      <Query
                        key={index}
                        {...item}
                        queryIndex={index}
                        typeEffect={index === userData.length - 1}
                      />
                    );
                  })}
                <div className="h-60 flex-shrink-0"></div>
              </div>
            </div>
          </div>
          <PromptInput
            prompt={prompt}
            isLoading={isLoading}
            setPrompt={setPrompt}
            isDarkMode={isDarkMode}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default Index;

import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import PromptInput from "@/components/PromptInput";
import Query from "@/components/Query";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
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
      className={`flex max-h-screen overflow-hidden flex-col justify-between ${inter.className}`}
    >
      <div className="bg-white dark:bg-black sticky z-[3] top-0 py-[20px] px-[30px] flex items-center justify-between">
        <h1 className="gradient-text text-3xl font-[800] text-center">
          ChatGpt
        </h1>

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
          {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="overflow-y-auto">
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

        <PromptInput
          prompt={prompt}
          isLoading={isLoading}
          setPrompt={setPrompt}
          isDarkMode={isDarkMode}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
};

export default Index;

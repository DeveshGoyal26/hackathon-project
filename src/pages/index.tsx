import React, { useRef, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const Index = () => {
  const formRef = useRef(null);
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

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
      console.log("data.message:", data.message);
      setResponse(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col gap-[24px]  p-24 ${inter.className}`}
    >
      <h1 className="text-6xl text-center">Test</h1>

      <div className="text-center">
        <form
          ref={formRef}
          id="form"
          onSubmit={handleSubmit}
          className="flex items-center justify-start flex-col gap-[16px]"
        >
          <textarea
            placeholder="Type your prompt here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            name="prompt"
            className="p-[8px] rounded-md h-[200px] w-[500px] border border-transparent transition-colors hover:border-gray-300"
          />

          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
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
            <span className="relative">Button Text</span>
          </button>
        </form>
      </div>

      <h2 className={`text-center mb-3 text-2xl font-semibold`}>
        Response{" "}
        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span> */}
      </h2>
      <div className="min-h-screen max-w-[1440px] w-full group rounded-lg border px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        {response && <p className={`m-0 max-w-[30ch] text-md`}>{response}</p>}
      </div>
    </main>
  );
};

export default Index;

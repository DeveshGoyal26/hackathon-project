import ClipBoardIcon from "@/assets/ClipBoardIcon";
import ShareIcon from "@/assets/ShareIcon";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const Query = ({
  role,
  content,
  showUser = true,
  typeEffect,
  queryIndex,
}: {
  role: string;
  prompt: string;
  content: string;
  response: string;
  showUser: boolean;
  queryIndex: number;
  typeEffect: boolean;
}) => {
  // Typewriter effect start
  let index = 0;
  let timer: any = null;
  let markDownText = "";

  // const type = async () => {
  //   clearTimeout(timer);
  //   let id = ".typewriter" + queryIndex;

  //   const typewriter: any = document.querySelector(id);

  //   if (!typewriter) return;

  //   if (!markDownText) {
  //     markDownText = typewriter.innerHTML;
  //   }

  //   if (index < markDownText.length) {
  //     typewriter.innerHTML =
  //       markDownText.slice(0, index) +
  //       '<span className="blinking-cursor">|</span>';
  //     index++;
  //     timer = setTimeout(type, 60);
  //   } else {
  //     typewriter.innerHTML = markDownText.slice(0, index);
  //   }
  // };

  // React.useEffect(() => {
  //   if (
  //     Number(localStorage.getItem("typeEffectIndex")) !== queryIndex &&
  //     typeEffect
  //   ) {
  //     type();
  //     localStorage.setItem("typeEffectIndex", queryIndex.toString());
  //   }
  // }, [typeEffect]);
  // Typewriter effect end

  return (
    <div className="flex flex-col">
      {role === "user" ? (
        <div className="">
          {/* <div className="flex items-start gap-[1.5rem] py-[30px] mx-auto px-[16px]">
            {showUser && (
              <div className="bg-[#D4A486] flex items-center justify-center overflow-hidden rounded-[500px] min-w-[40px] min-h-[40px] sticky top-[10px]">
                You
              </div>
            )}
            <div className="w-[calc(100% - 50px)]">{content}</div>
          </div> */}
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-[12px] py-[8px] mx-auto px-[16px]">
            {showUser && (
              <div className="bg-[#3D8DFE] flex items-center justify-center overflow-hidden rounded-[500px] min-w-[40px] min-h-[40px] sticky top-[10px]">
                <img src="/img/chat/bot.svg" alt="bot" />
              </div>
            )}

            <div className="flex w-full gap-[8px] group h-full">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`${
                  "typewriter" + queryIndex
                } w-[calc(100%-50px)] p-[16px] rounded-[12px] border border-[#D1D5DB] prose prose-slatec dark:prose-invert lg:prose-lg break-words`}
                children={content}
              ></ReactMarkdown>

              <div className=" sticky top-[10px] h-full flex flex-col gap-[16px] opacity-0 transition-opacity delay-200 group-hover:opacity-[1]">
                <button className="text-[#6B7280] dark:text-white">
                  <ShareIcon />
                </button>
                <button className="text-[#6B7280] dark:text-white">
                  <ClipBoardIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;

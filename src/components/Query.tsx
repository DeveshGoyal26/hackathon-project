import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const Query = ({
  role,
  content,
  typeEffect,
  queryIndex,
}: {
  role: string;
  prompt: string;
  response: string;
  queryIndex: number;
  typeEffect: boolean;
}) => {
  // Typewriter effect start
  let index = 0;
  let timer: any = null;
  let markDownText = "";

  const type = async () => {
    clearTimeout(timer);
    let id = ".typewriter" + queryIndex;

    const typewriter: any = document.querySelector(id);

    if (!typewriter) return;

    if (!markDownText) {
      markDownText = typewriter.innerHTML;
    }

    if (index < markDownText.length) {
      typewriter.innerHTML =
        markDownText.slice(0, index) +
        '<span className="blinking-cursor">|</span>';
      index++;
      timer = setTimeout(type, 100);
    } else {
      typewriter.innerHTML = markDownText.slice(0, index);
    }
  };

  React.useEffect(() => {
    if (
      Number(localStorage.getItem("typeEffectIndex")) !== queryIndex &&
      typeEffect
    ) {
      type();
      localStorage.setItem("typeEffectIndex", queryIndex.toString());
    }
  }, [typeEffect]);
  // Typewriter effect end

  return (
    <div className="flex flex-col">
      {role === "user" ? (
        <div className="bg-[#f3f3f3] dark:bg-[#242424]">
          <div className="flex items-start gap-[1.5rem] py-[30px] mx-auto px-[16px]">
            <div className="w-[30px] sticky top-[100px]">You</div>
            <div className="w-[calc(100% - 50px)]">{content}</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-[1.5rem] py-[30px] mx-auto px-[16px]">
            <div className="w-[30px] sticky top-[10px]">Gpt</div>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={`${
                "typewriter" + queryIndex
              } w-[calc(100%-50px)] prose prose-slatec dark:prose-invert lg:prose-lg break-words`}
              children={content}
            ></ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;

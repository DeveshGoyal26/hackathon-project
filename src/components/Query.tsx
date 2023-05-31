import React from "react";

const Query = ({ prompt, response }: { prompt: string; response: string }) => {
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

  React.useEffect(() => {
    type();
  }, [response]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div>You</div>
        <div>{prompt}</div>
      </div>
      <div
        id={"typewriter"}
        className={`prose prose-slate mx-auto dark:prose-invert lg:prose-lg w-full break-words`}
      ></div>
    </div>
  );
};

export default Query;

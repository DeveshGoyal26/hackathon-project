import { axiosErrorHandler } from "@/util/error";
// import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-vaeLNbS1FdlSwFHPnavineId",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("data:", data);

    try {
      //   const response = await axios.post(
      //     "https://api.openai.com/v1/engines/davinci/completions",
      //     {
      //       prompt: "Say this is a test",
      //       max_tokens: 7,
      //       temperature: 0,
      //     },
      //     {
      //       headers: {
      //         Authorization:
      //           "Bearer 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",
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });

      console.log("response:", response.data);

      res.status(200).json({ message: response.data.choices[0].text });
    } catch (error) {
      const err = axiosErrorHandler(error);
      console.log("err:", err);
      if (err?.error?.message) {
        res.status(500).json({ error: err.error.message });
      } else {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

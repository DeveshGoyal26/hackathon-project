import { axiosErrorHandler } from "@/util/error";
// import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

// This is the real api

const configuration = new Configuration({
  organization: process.env.NEXT_PUBLIC_OPENAI_API_ORGANIZATION_KEY,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData");
    // Use the localStorage data as needed
    console.log(data);
  }

  if (req.method === "POST") {
    const data = req.body;

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Return the answer as a markdown.\n" + data.prompt,
        max_tokens: 300,
        temperature: 0.5,
      });

      const userData: any = data.userData;

      res.status(200).json([
        ...userData,
        {
          prompt: data.prompt,
          createdAt: new Date(),
          response: response.data.choices[0].text,
        },
      ]);
    } catch (error) {
      // console.log("error:", error);
      const err: any = axiosErrorHandler(error);
      console.log("err:", err);

      if (err?.error?.message) {
        res.status(500).json({ error: err?.error?.message });
      } else {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

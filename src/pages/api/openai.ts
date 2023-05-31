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
  if (req.method === "POST") {
    const data = req.body;

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: data.prompt,
        max_tokens: 3000,
        temperature: 0.5,
      });

      // console.log("response:", response.data);

      const userData: any = localStorage.getItem("userData") || [];

      localStorage.setItem(
        "userData",
        JSON.stringify([
          ...userData,
          {
            prompt: data.prompt,
            createdAt: new Date(),
            response: response.data.choices[0].text,
          },
        ])
      );

      res.status(200).json([
        ...userData,
        {
          prompt: data.prompt,
          createdAt: new Date(),
          response: response.data.choices[0].text,
        },
      ]);
    } catch (error) {
      const err: any = axiosErrorHandler(error);

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

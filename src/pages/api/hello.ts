// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This is a test api

import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.NEXT_PUBLIC_OPENAI_API_ORGANIZATION_KEY,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
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
  try {
    if (req.method === "POST") {
      const data = req.body;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      console.log("response:", response);
      // Do something with the submitted data
      res.status(200).json({ message: data.name });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (e) {
    console.log("e:", e);
  }
}

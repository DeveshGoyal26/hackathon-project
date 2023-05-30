// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";
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
  bodyParser.urlencoded({ extended: true })(req, res, async () => {
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
      // console.log("e:", e);
    }
  });
}

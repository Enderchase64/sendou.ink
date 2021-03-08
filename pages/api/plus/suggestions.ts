import plusService from "app/plus/service";
import { NextApiRequest, NextApiResponse } from "next";
import { getMySession } from "utils/api";
import { UserError } from "utils/errors";
import { ZodError } from "zod";

const suggestionsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = await getMySession(req);

  switch (req.method) {
    case "GET":
      await getHandler(req, res);
      break;
    case "POST":
      await postHandler(req, res);
      break;
    default:
      res.status(405).end();
  }

  async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!user) return res.status(401).end();

    try {
      await plusService.addSuggestion({ data: req.body, userId: user.id });
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({ message: e.message });
      } else if (e instanceof UserError) {
        res.status(400).json({ message: e.message });
      } else {
        console.error(e.message);
        res.status(500).end();
      }

      return;
    }

    res.status(200).end();
  }

  async function getHandler(_req: NextApiRequest, res: NextApiResponse) {
    try {
      res.status(200).json(await plusService.getSuggestions());
    } catch (e) {
      console.error(e.message);
      res.status(500).end();
    }
  }
};

export default suggestionsHandler;

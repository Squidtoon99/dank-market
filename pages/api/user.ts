import config from "config";
import { User } from "types/user";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function user(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== "GET") return res.redirect("/");
        res.status(200).json({ ...req.session.user as User });
    },
    config.sessionOptions
);
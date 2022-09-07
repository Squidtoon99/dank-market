import config from "config";
import { User } from "types/user";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function logout(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== "GET") return res.redirect("/");
        await req.session.destroy();
        res.status(200).redirect("/");
    },
    config.sessionOptions
);
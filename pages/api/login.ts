import config from "config";
import { User } from "types/user";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
const scope = ["identify", "email"].join(" ");

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.redirect("/");

    const { code = null, error = null } = req.query;

    let hostname = req.headers.host;
    if (hostname === "localhost:3000")
      hostname = "http://localhost:3000";
    else
      hostname = "https://" + hostname;

    let redirect = `${hostname}/api/login`;
    console.log(redirect);
    // @ts-ignore
    const OAUTH_QS = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirect,
      response_type: "code",
      scope,
    }).toString();

    const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

    if (error) {
      return res.redirect(`/?error=${req.query.error}`);
    }

    if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

    // @ts-ignore
    const body = new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirect,
      code,
      scope,
    }).toString();

    const { access_token = null, token_type = "Bearer" } = await fetch("https://discord.com/api/oauth2/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body,
    }).then((res: { json(): any; }) => res.json());

    if (!access_token || typeof access_token !== "string") {
      return res.redirect(OAUTH_URI);
    }

    const me: User | { unauthorized: true; } = await fetch("http://discord.com/api/users/@me", {
      headers: { Authorization: `${token_type} ${access_token}` },
    }).then((res) => res.json());

    if (!("id" in me)) {
      return res.redirect(OAUTH_URI);
    }

    // store user auth
    req.session.user = me;
    await req.session.save();

    res.redirect("/");
  },
  config.sessionOptions
);
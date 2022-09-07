import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { Item } from "types";
const imageURL = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, format = "gif" } = req.query;
    console.log(id);
    const d = await getDoc(doc(firestore, `items`, id as string));

    if (!d.exists()) {
        res.status(404).json({ error: "Image not found" });
        return;
    }
    let item = d.data() as Item;
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, item.icon.replace("gif", format as string));
};

export default imageURL;
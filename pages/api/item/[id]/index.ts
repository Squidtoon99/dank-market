import { NextApiRequest, NextApiResponse } from "next";
import { firestore, itemToJSON } from "lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { Item } from "types";

const item = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const d = await getDoc(doc(firestore, `items`, id as string));

    if (!d.exists()) {
        res.status(404).json({ error: "Image not found" });
        return;
    }
    let item = itemToJSON(d);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(item);
};

export default item;
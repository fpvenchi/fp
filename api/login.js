import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Vyplňte všechna pole." });

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("authDB");
    const users = db.collection("users");

    const user = await users.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Špatné přihlašovací údaje." });
    }

    res.status(200).json({ message: "Přihlášení úspěšné!" });
}

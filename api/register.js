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

    const existingUser = await users.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Uživatel již existuje." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword });

    res.status(201).json({ message: "Registrace úspěšná!" });
}

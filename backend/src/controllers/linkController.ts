import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const createLink = async (req: Request, res: Response) => {
    try {
        const { title, targetUrl, price, swishNumber } = req.body;

        const userId = (req.user as { id: number }).id   ///// kanske fel!
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const newLink = await prisma.link.create({
            data: {
                title,
                targetUrl,
                price: Number(price),
                swishNumber,
                userId,
            }
        });

        res.status(201).json({ id: newLink.id });
       
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not create link"})
        
    }
}


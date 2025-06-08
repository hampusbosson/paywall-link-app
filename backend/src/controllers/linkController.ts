import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const createLink = async (req: Request, res: Response) => {
  try {
    const { title, targetUrl, price, swishNumber } = req.body;

    const userId = (req.user as { id: number }).id; ///// kanske fel!
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
      },
    });

    res.status(201).json({ id: newLink.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create link" });
  }
};

export const getLinksForUser = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const links = await prisma.link.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(links);
    return;
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Link ID is required" });
      return;
    }

    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      res.status(404).json({ message: "Link not found" });
      return;
    }

    // Optional: check ownership if needed
    const userId = (req.user as { id: number }).id;
    if (link.userId !== userId) {
      res.status(403).json({ message: "Unautharized" });
      return;
    }

    res.status(200).json(link);
    return;
  } catch (error) {
    console.error("Error fetching link:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};



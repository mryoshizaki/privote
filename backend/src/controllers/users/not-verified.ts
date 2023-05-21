import { Request, Response } from "express";
import { User } from "../../entity/User";

export default async (req: Request, res: Response) => {
  const users = await User.find({
    select: ["id", "first_name", "last_name", "email"],
    where: { verified: false },
  });

  return res.send({ users });
};

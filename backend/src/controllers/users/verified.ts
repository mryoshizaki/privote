import { Request, Response } from "express";
import { User } from "../../entity/User";

export default async (req: Request, res: Response) => {
  const users = await User.find({
    select: ["id", "first_name", "last_name", "email", "address", "age", "birthday", "sex", "valid_id_type", "valid_id_pic"],
    where: { verified: true, admin:false}, 
  });
  
  return res.send({ users });
};

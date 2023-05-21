import { Request, Response } from "express";
import * as yup from "yup";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

const schema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    first_name: yup.string().min(2).required(),
    last_name: yup.string().min(2).required(),
    sex: yup.string().oneOf(["Male", "Female"]).required(),
    address: yup.string().required(),
    valid_id_type: yup.string().required(),
    birthday: yup.date().required(),
    age: yup.number().min(18).required(),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  let hashedPassword = undefined;

  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return res.status(500).send({ error });
  }

  const newUser = new User();

  newUser.admin = false;
  newUser.first_name = req.body.first_name;
  newUser.last_name = req.body.last_name;
  newUser.email = req.body.email;
  newUser.password = hashedPassword;
  newUser.sex = req.body.sex;
  newUser.address = req.body.address;
  newUser.valid_id_type = req.body.valid_id_type;
  newUser.birthday = req.body.birthday;
  newUser.age = req.body.age;

  try {
    await User.save(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.send(newUser);
};

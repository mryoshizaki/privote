import { Request, Response } from "express";
import ElectionContract, { web3 } from "../../web3";
// import memoryCache from "memory-cache";
import * as yup from "yup";

const checkSchema = yup.object({
  body: yup.object({
    id: yup.string().required(),
  }),
});

export const checkVoteability = async (req: Request, res: Response) => {
  try {
    await checkSchema.validate(req);
  } catch (error) {
    return res.status(400).send({ error });
  }

  const instance = await ElectionContract.deployed();
  const chairpersonVoters: Array<any> = await instance.getChairpersonVoters();
  const memberVoters: Array<any> = await instance.getMemberVoters();
  const status: "not-started" | "running" | "finished" =
    await instance.getStatus();
  if (status !== "running") return res.status(400).send("election not running");
  
  const votes = await instance.getVotes();
  // console.log(votes);
  // for (const vote of votes) {
  //   console.log(await instance.getCandidateInfo(vote.candidate));
  // }
  
  const chairpersonCount = chairpersonVoters.filter((id) => id === req.body.id).length;
  const memberCount = memberVoters.filter((id) => id === req.body.id).length;

  // if (chairpersonCount >= 1) {
  //   return res.send("already-voted");
  // }

    if (memberCount >= 7) {
    return res.send("already-voted");
  }

  return res.send("not-voted");
};

const schema = yup.object({
  body: yup.object({
    id: yup.string().required(),
    name: yup.string().min(3).required(),
    candidate: yup.string().min(3).required(),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();
  const voters: Array<any> = await instance.getVoters();
  const chairpersonVoters: Array<any> = await instance.getChairpersonVoters();
  const candidates: Array<any> = await instance.getCandidates();
  const memberVoters: Array<any> = await instance.getMemberVoters();
  
  const chairpersonCount = chairpersonVoters.filter((id) => id === req.body.id).length;
  const memberCount = memberVoters.filter((id) => id === req.body.id).length;
  if (memberCount >= 7) {
    return res.send("already voted");
  }
  // if (chairpersonVoters.includes(req.body.id))
  //   return res.status(400).send("already voted");

  if (!candidates.includes(req.body.candidate))
    return res.status(400).send("no such candidate");

  await instance.vote(req.body.id, req.body.name, req.body.candidate, {
    from: accounts[0],
  });

  return res.send("successful");
};

import * as signupRepository from "../repository/signupRepository.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  const { name, id, pass, phone } = req.body;
  const hashpass = bcrypt.hashSync(pass, 12);
  const result = await signupRepository.signup({ name, id, hashpass, phone });
  res.json(result);
}

export async function getIdCheck(req, res) {
  const id = req.params.id;
  console.log(id);
  const result = await signupRepository.getIdCheck(id);
  res.json(result);
}

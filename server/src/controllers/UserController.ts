import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
  async create(req: Request, res: Response){
    const {
      name,
      email,
      password
    } =req.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      email,
      password
    }

    const user = userRepository.create(data);
    await userRepository.save(user);
    return res.json(user);
  },

  async index(req: Request, res: Response){
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      relations : ['favorites', 'ratings']
    });

    return res.json(users);
  }
}
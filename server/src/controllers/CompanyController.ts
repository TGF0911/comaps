import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Company from '../models/Company';

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cnpj,
      description,
      latitude,
      longitude,
      isPremium } = req.body;

    const companyRepository = getRepository(Company);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    })

    const data = {
      name,
      email,
      password,
      cnpj,
      description,
      latitude,
      longitude,
      isPremium,
      images
    }

    const company = companyRepository.create(data);

    await companyRepository.save(company);

    return res.json(company);
  },

  async index(req: Request, res: Response){
    const companyRepository = getRepository(Company);
    const companies = await companyRepository.find({
      relations: ['images', 'products', 'ratings', 'categories']
    });

    return res.json(companies);
  }
}
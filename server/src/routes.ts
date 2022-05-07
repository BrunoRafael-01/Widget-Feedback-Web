import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUC } from './use-cases/submit-feedback-uc';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUC = new SubmitFeedbackUC(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUC.execute({
    type, 
    comment,
    screenshot
  })

  return res.status(201).send()
})
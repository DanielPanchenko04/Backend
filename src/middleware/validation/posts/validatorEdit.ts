import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const errorsValidation: ErrorValidation[] = [];


  if (!title || !content) {
    if (!title) {
      errorsValidation.push({ message: 'Title is required' });
    }
    if (!content) {
      errorsValidation.push({ message: 'Content is required' });
    }
  }

  const postRepository = getRepository(Post);


  const post = await postRepository.findOne({ where: { title } });


  if (post && post.id !== Number(id)) {
    errorsValidation.push({ message: `Post with title '${title}' already exists for this user.` });
  }

  // Якщо є помилки, передаємо їх в наступний middleware
  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit post validation error', null, null, errorsValidation);
    return next(customError);
  }

  return next();
};

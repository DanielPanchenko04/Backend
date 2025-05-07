import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import {Post} from "../../orm/entities/users/Post";

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne(id, {
      select: ['id', 'title', 'content', 'published', 'create_at', 'updated_at'],
    });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Post found', post);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

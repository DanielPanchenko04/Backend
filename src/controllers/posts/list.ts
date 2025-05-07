import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';


import { CustomError } from 'utils/response/custom-error/CustomError';
import {Post} from "../../orm/entities/users/Post";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.find({
      select: ['id', 'title', 'content', 'published', 'create_at', 'updated_at'],
      relations: ['user'],
    });
    res.customSuccess(200, 'List of posts.', post);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of post.`, null, err);
    return next(customError);
  }
};


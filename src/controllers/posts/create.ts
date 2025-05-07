import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, published, userId } = req.body;

    if (!title || !content) {
        return next(new CustomError(400, 'Validation', 'Title, content, and user_id are required.'));
    }

    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOne(userId);

        if (!user) {
            return next(new CustomError(404, 'Raw', `User with id ${userId} not found.`));
        }

        const newPost = postRepository.create({
            title,
            content,
            published: !!published,
            user,
        });

        await postRepository.save(newPost);

        const postWithUser = await postRepository.findOne({
            where: { id: newPost.id },
            relations: ['user'],
        });

        res.customSuccess(201, 'Post successfully created.', postWithUser);
    } catch (err) {
        return next(new CustomError(500, 'Raw', 'Unable to create post.', null, err));
    }
};

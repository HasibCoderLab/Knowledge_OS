import { usersRepository } from './users.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { UpdateProfileInput } from './users.validation.js';

export const usersService = {
  async getProfile(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }
    const { password, refreshToken, verificationToken, resetToken, resetTokenExp, emailVerified, ...profile } = user;
    return profile;
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const existing = await usersRepository.findById(userId);
    if (!existing) {
      throw new NotFoundError('User');
    }

    const user = await usersRepository.update(userId, input);
    const { password, refreshToken, verificationToken, resetToken, resetTokenExp, emailVerified, ...profile } = user;
    return profile;
  },
};

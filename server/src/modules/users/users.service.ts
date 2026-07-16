import bcrypt from 'bcryptjs';
import { usersRepository } from './users.repository.js';
import { NotFoundError, ConflictError, UnauthorizedError } from '../../shared/errors.js';
import { env } from '../../app/config/environment.js';
import type { UpdateProfileInput, ChangePasswordInput } from './users.validation.js';

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

    if (input.username && input.username !== existing.username) {
      const usernameTaken = await usersRepository.findByUsername(input.username.toLowerCase());
      if (usernameTaken) {
        throw new ConflictError('Username is already taken');
      }
    }

    const user = await usersRepository.update(userId, input);
    const { password, refreshToken, verificationToken, resetToken, resetTokenExp, emailVerified, ...profile } = user;
    return profile;
  },

  async changePassword(userId: string, input: ChangePasswordInput) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    const isMatch = await bcrypt.compare(input.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(input.newPassword, env.bcryptSaltRounds);
    await usersRepository.updatePassword(userId, hashedPassword);
  },

  async clearData(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }
    await usersRepository.clearData(userId);
  },

  async deleteAccount(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }
    await usersRepository.deleteAccount(userId);
  },
};

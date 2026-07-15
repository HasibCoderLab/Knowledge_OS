import { settingsRepository } from './settings.repository.js';
import type { UpdateSettingsInput } from './settings.validation.js';

export const settingsService = {
  async getSettings(userId: string) {
    let settings = await settingsRepository.findByUserId(userId);
    if (!settings) {
      settings = await settingsRepository.upsert(userId);
    }
    return settings;
  },

  async updateSettings(userId: string, input: UpdateSettingsInput) {
    return settingsRepository.update(userId, input);
  },
};

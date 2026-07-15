import { CalendarProviderType } from '../../../app/config/calendar-providers.js';
import type { CalendarProvider } from '../../../app/config/calendar-providers.js';
import { LocalCalendarProvider } from './local.provider.js';

const providerRegistry = new Map<CalendarProviderType, CalendarProvider>();

providerRegistry.set(CalendarProviderType.LOCAL, new LocalCalendarProvider());

export function getCalendarProvider(type: CalendarProviderType): CalendarProvider | undefined {
  return providerRegistry.get(type);
}

export function registerCalendarProvider(type: CalendarProviderType, provider: CalendarProvider): void {
  providerRegistry.set(type, provider);
}

export { CalendarProviderType } from '../../../app/config/calendar-providers.js';
export type { CalendarProvider, CalendarEventData, SyncResult, CalendarProviderConfig } from '../../../app/config/calendar-providers.js';

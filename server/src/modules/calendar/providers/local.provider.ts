import { CalendarProviderType } from '../../../app/config/calendar-providers.js';
import type { CalendarProvider, CalendarProviderConfig, CalendarEventData, SyncResult } from '../../../app/config/calendar-providers.js';

export class LocalCalendarProvider implements CalendarProvider {
  readonly type = CalendarProviderType.LOCAL;
  private connected = false;

  async connect(_config: CalendarProviderConfig): Promise<void> {
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async getEvents(_startDate: Date, _endDate: Date): Promise<CalendarEventData[]> {
    return [];
  }

  async createEvent(event: CalendarEventData): Promise<CalendarEventData> {
    return event;
  }

  async updateEvent(id: string, event: Partial<CalendarEventData>): Promise<CalendarEventData> {
    return { id, title: event.title || '', startDate: event.startDate || new Date(), ...event };
  }

  async deleteEvent(_id: string): Promise<void> {
  }

  async sync(_token: string): Promise<SyncResult> {
    return {
      success: true,
      syncedEvents: 0,
      failedEvents: 0,
      lastSyncAt: new Date(),
    };
  }
}

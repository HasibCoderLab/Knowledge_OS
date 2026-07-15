export enum CalendarProviderType {
  LOCAL = 'local',
  GOOGLE = 'google',
  APPLE = 'apple',
  OUTLOOK = 'outlook',
}

export interface CalendarProviderConfig {
  type: CalendarProviderType;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  scopes?: string[];
}

export interface CalendarEventData {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  time?: string;
  location?: string;
  attendees?: string[];
  reminders?: number[];
}

export interface SyncResult {
  success: boolean;
  syncedEvents: number;
  failedEvents: number;
  errors?: string[];
  lastSyncAt: Date;
}

export interface CalendarProvider {
  readonly type: CalendarProviderType;

  connect(config: CalendarProviderConfig): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;

  getEvents(startDate: Date, endDate: Date): Promise<CalendarEventData[]>;
  createEvent(event: CalendarEventData): Promise<CalendarEventData>;
  updateEvent(id: string, event: Partial<CalendarEventData>): Promise<CalendarEventData>;
  deleteEvent(id: string): Promise<void>;
  sync(token: string): Promise<SyncResult>;
}

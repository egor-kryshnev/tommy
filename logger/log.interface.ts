import { LogEntry } from "winston";

export interface Log extends LogEntry {
    level: string;
    service: string;
    info?: {
        url?: string;
    }
    purpose?: string;
}
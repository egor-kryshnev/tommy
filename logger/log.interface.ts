import { LogEntry } from "winston";

export interface Log extends LogEntry {
    service: string;
}
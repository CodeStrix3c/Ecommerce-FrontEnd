import * as signalR from '@microsoft/signalr';
import { HUB_URL } from './config';

export function createPhoneSyncConnection() {
  return new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
}

import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "./api";

export function createPhoneSyncConnection() {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/hubs/phone-sync`)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Warning)
    .build();
}

export function dataUrlToFile(dataUrl, fileName = "phone-photo.jpg") {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
  return new File([bytes], fileName, { type: mime });
}

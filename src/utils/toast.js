import { toast } from "react-toastify";

const TOAST_ID = {
  success: "global-success",
  error: "global-error",
  info: "global-info",
  warn: "global-warn",
};

const showToast = (type, message) => {
  const id = TOAST_ID[type];
  if (toast.isActive(id)) return;
  toast[type](message, { toastId: id });
};

export const toastSuccess = (message) => showToast("success", message);
export const toastError = (message) => showToast("error", message);
export const toastInfo = (message) => showToast("info", message);
export const toastWarn = (message) => showToast("warn", message);

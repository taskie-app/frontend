import { toast } from "@zerodevx/svelte-toast";

export function toastSuccess(message: string) {
  toast.push(message, {
    theme: {
      "--toastColor": "mintcream",
      "--toastBackground": "#22c55e",
      "--toastBarBackground": "#16a34a",
    },
  });
}

export function toastError(message: string) {
  toast.push(message, {
    theme: {
      "--toastColor": "mintcream",
      "--toastBackground": "#ef4444",
      "--toastBarBackground": "#dc2626",
    },
  });
}

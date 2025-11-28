import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

/**
 * Handles mutation errors and displays appropriate toast notifications
 * @param error - The error object from the mutation
 */
export const handleMutationError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message, {
      autoClose: 3000,
    });
  } else if (error instanceof Error) {
    toast.error(error.message, {
      autoClose: 3000,
    });
  } else {
    toast.error('An unexpected error occurred', {
      autoClose: 3000,
    });
  }
};


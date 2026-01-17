/**
 * Email Service
 * Handles form submissions by sending data to the PHP backend endpoint
 */

export interface FormData {
  vehicleType?: string;
  brand?: string;
  vehicleModel?: string;
  name: string;
  email?: string;
  number: string;
  service: string;
  message?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Submit quote form (Get A Quote form)
 */
export const submitQuoteForm = async (
  formData: FormData
): Promise<EmailResponse> => {
  return submitForm(formData, 'quote');
};

/**
 * Submit contact form
 */
export const submitContactForm = async (
  formData: FormData
): Promise<EmailResponse> => {
  return submitForm(formData, 'contact');
};

/**
 * Generic form submission handler
 */
const submitForm = async (
  formData: FormData,
  formType: 'quote' | 'contact'
): Promise<EmailResponse> => {
  try {
    // Determine API endpoint based on environment
    // In development, use relative path; in production, use absolute path
    const apiUrl =
      import.meta.env.MODE === 'development'
        ? '/api/send-email.php'
        : `${window.location.origin}/api/send-email.php`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        formType,
      }),
    });

    const data: EmailResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          data.message ||
          'Failed to submit form. Please try again later.',
        error: data.error,
      };
    }

    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message:
        'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};


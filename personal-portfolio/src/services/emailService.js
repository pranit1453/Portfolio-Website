import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;

export const sendEmail = async (form, templateParams) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        return {
            success: false,
            error: 'EmailJS keys are missing. Please check your .env file or setup environment variables.'
        };
    }

    try {
        const params = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            ...templateParams
        };

        const result = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            params,
            PUBLIC_KEY
        );
        return { success: true, text: result.text };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return {
            success: false,
            error: error?.text || error?.message || 'An unexpected error occurred while sending the email.'
        };
    }
};

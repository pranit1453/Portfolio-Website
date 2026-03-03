import { useState } from 'react';

export const useContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending securely...'); // Security UX feedback

        try {
            // Hit our secure Vercel Serverless Function instead of exposing an API key to EmailJS
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('Message securely sent!');
                setFormData({ name: '', email: '', message: '' }); // Clear the form natively
            } else {
                setStatus(`Failed to send: ${data.error || 'Unknown secure server error.'}`);
            }
        } catch (error) {
            console.error('Form Submission Error:', error);
            setStatus('Failed to send: Server might be unavailable or network error.');
        } finally {
            // Wipe the status message after a polite delay
            setTimeout(() => setStatus(''), 4000);
        }
    };

    return {
        formData,
        status,
        handleChange,
        handleSubmit
    };
};

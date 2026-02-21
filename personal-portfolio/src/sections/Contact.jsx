import React, { useState } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { sendEmail } from '../services/emailService';
import { BiEnvelope, BiLogoWhatsapp } from 'react-icons/bi';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { contactInfo } from '../data/contact';
import ContactCard from '../components/common/ContactCard';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        const result = await sendEmail(e.target, {
            time: new Date().toLocaleString()
        });

        if (result.success) {
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        } else {
            setStatus(`Failed to send: ${result.error}`);
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <SectionWrapper id="contact" className="">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-text">Contact Me</h2>
                <div className="text-center text-muted mb-12 -mt-8">Get in touch</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">




                    {/* Left: Talk to me */}
                    <div className="space-y-6">
                        <h3 className="flex items-center justify-center gap-2 text-text font-semibold text-xl mb-6">
                            <FiMessageSquare className="text-black" size={24} strokeWidth={2} />
                            Talk to me
                        </h3>

                        {contactInfo.map((info) => (
                            <ContactCard
                                key={info.title}
                                icon={info.icon}
                                title={info.title}
                                value={info.value}
                                link={info.link}
                                linkText={info.linkText}
                            />
                        ))}
                    </div>

                    {/* Right: Drop Message Form */}
                    <div className="space-y-6">
                        <h3 className="flex items-center justify-center gap-2 text-text font-semibold text-xl mb-6">
                            <FiSend className="text-black" size={24} strokeWidth={2} />
                            Drop Me a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <fieldset className="border-2 border-muted/30 rounded-2xl px-6 py-2 transition-colors focus-within:border-primary">
                                <legend className="px-2 text-sm text-text font-medium">Name</legend>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-text placeholder-muted/50 outline-none h-full py-2"
                                />
                            </fieldset>

                            <fieldset className="border-2 border-muted/30 rounded-2xl px-6 py-2 transition-colors focus-within:border-primary">
                                <legend className="px-2 text-sm text-text font-medium">Email</legend>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-text placeholder-muted/50 outline-none h-full py-2"
                                />
                            </fieldset>

                            <fieldset className="border-2 border-muted/30 rounded-2xl px-6 py-2 transition-colors focus-within:border-primary h-40">
                                <legend className="px-2 text-sm text-text font-medium">Project</legend>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Write your project"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full h-full bg-transparent text-text placeholder-muted/50 outline-none resize-none py-2"
                                ></textarea>
                            </fieldset>

                            <button
                                type="submit"
                                className="glass-card w-full flex items-center justify-center gap-2 text-xl font-medium mt-4 group p-4 border border-glass-border hover:bg-white/10 transition-colors"
                            >
                                Send Message <span className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                            </button>
                            {status && <p className="text-center mt-4 text-sm text-text">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Contact;

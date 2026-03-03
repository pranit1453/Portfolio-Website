import React from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { useContactForm } from '../hooks/useContactForm';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { contactInfo } from '../data/contact';
import ContactCard from '../components/common/ContactCard';
import SectionHeader from '../components/common/SectionHeader';

const Contact = () => {
    const { formData, status, handleChange, handleSubmit } = useContactForm();

    return (
        <SectionWrapper id="contact" className="">
            <div className="container mx-auto px-6">
                <SectionHeader title="Contact Me" subtitle="Get in touch" />

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

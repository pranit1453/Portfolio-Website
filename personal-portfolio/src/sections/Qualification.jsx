import React, { useState } from 'react';
import SectionWrapper from '../components/common/SectionWrapper';
import { FaGraduationCap, FaCertificate } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData, certificationData } from '../data/qualification';

const Qualification = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <SectionWrapper id="qualification">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-2 text-text">Qualification</h2>
                <p className="text-center text-gray-500 mb-12">Experience & Education</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
                    {/* Education Column */}
                    <div>
                        <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                            <FaGraduationCap className="text-black" /> Education
                        </h3>
                        <div className="space-y-8 border-l-2 border-black/30 pl-6 ml-2 relative">
                            {educationData.map((edu, index) => (
                                <div className="relative" key={index}>
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-black rounded-full shadow-lg shadow-black/20"></div>
                                    <h4 className="text-lg font-bold text-text">{edu.title}</h4>
                                    <p className="text-sm text-muted">{edu.institution}</p>
                                    <span className="text-sm text-muted/80 block mt-1">{edu.period}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certification Column */}
                    <div>
                        <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                            <FaCertificate className="text-black" /> Certification
                        </h3>
                        <div className="space-y-6">
                            {certificationData.map((cert, index) => (
                                <div
                                    key={index}
                                    className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-colors group relative overflow-hidden"
                                    onClick={() => setSelectedCert(cert.link)}
                                >
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <h4 className="text-lg font-bold text-text relative z-10">{cert.title}</h4>
                                    <p className="text-xs text-black mt-2 font-medium flex items-center gap-1 relative z-10 cursor-pointer hover:text-primary hover:underline transition-all duration-300">
                                        {cert.description} <span>↗</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative max-w-4xl w-full max-h-[90vh] glass-panel p-2 overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-primary transition-colors backdrop-blur-sm"
                            >
                                ✕
                            </button>
                            <img
                                src={selectedCert}
                                alt="Certificate"
                                className="w-full h-full object-contain rounded-2xl bg-white/5"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
};

export default Qualification;

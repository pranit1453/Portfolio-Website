import React, { useEffect, useState } from 'react';

const CertificateModal = ({ isOpen, onClose, imageSrc, title, aspectRatio = 1.414 }) => {
    // isRendered mounts/unmounts from DOM
    const [isRendered, setIsRendered] = useState(isOpen);
    // isVisible triggers the CSS transitions
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsRendered(true), 0);
            // Wait for next frame to ensure DOM is ready before transitioning
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setTimeout(() => setIsVisible(false), 0);
        }
    }, [isOpen]);

    const handleTransitionEnd = (e) => {
        // Unmount ONLY after the opacity transition finishes when closing
        if (!isOpen && e.propertyName === 'opacity') {
            setIsRendered(false);
        }
    };

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isRendered) return null;

    // Check if the source is a PDF to maintain fallback support for existing data
    const isPdf = imageSrc?.toLowerCase().endsWith('.pdf');

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            {/* Glassmorphism Backdrop Overlay */}
            <div
                className={`absolute inset-0 bg-white/5 backdrop-blur-3xl transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
                onTransitionEnd={handleTransitionEnd}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div
                className={`relative flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out origin-center ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button positioned inside the modal top-right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-gray-900 bg-black/5 hover:bg-black/10 backdrop-blur-md rounded-full border border-black/10 transition-all duration-300 shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black/20"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title Header - Positioned naturally above the image */}
                {title && (
                    <div className="w-full text-center -mt-2 mb-8 sm:-mt-4 sm:mb-10 pr-8 pl-8 sm:pr-12 sm:pl-12">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide text-center">
                            {title}
                        </h3>
                    </div>
                )}

                {/* Certificate Display Area - No Overflow, Strict Scaling */}
                <div className="flex items-center justify-center w-full relative z-10">
                    {isPdf ? (
                        <iframe
                            src={`${imageSrc}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                            title={title || "Certificate"}
                            className="bg-transparent border-none shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-xl"
                            style={{
                                // Mathematically constrain iframe to exact aspect ratio
                                // This perfectly eliminates native-viewer dark letterboxing margins
                                width: `min(90vw, calc(80vh * ${aspectRatio}))`,
                                height: `min(80vh, calc(90vw / ${aspectRatio}))`,
                                aspectRatio: `${aspectRatio} / 1`,
                                overflow: 'hidden'
                            }}
                            scrolling="no"
                        />
                    ) : (
                        <img
                            src={imageSrc}
                            alt={title || "Certificate image"}
                            className="max-w-[90vw] max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] pointer-events-none select-none"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;

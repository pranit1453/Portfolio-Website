import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { BsPlayCircle, BsFileEarmarkPdf, BsImage } from 'react-icons/bs';

const MediaModal = ({ isOpen, onClose, asset, availableAssets, onSelectAsset }) => {
    // Disable scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const renderSelectionMenu = () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 px-4">
            {availableAssets?.video && (
                <button
                    onClick={() => onSelectAsset('video', availableAssets.video, 'Video Demo')}
                    className="flex flex-col items-center gap-5 p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-2 hover:shadow-glass-purple transition-all duration-500 group"
                >
                    <div className="p-5 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-500">
                        <BsPlayCircle size={48} />
                    </div>
                    <span className="text-sm font-bold text-text uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Video Demo</span>
                </button>
            )}
            {availableAssets?.document && (
                <button
                    onClick={() => onSelectAsset('document', availableAssets.document, 'Project Report')}
                    className="flex flex-col items-center gap-5 p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-2 hover:shadow-glass-purple transition-all duration-500 group"
                >
                    <div className="p-5 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-500">
                        <BsFileEarmarkPdf size={48} />
                    </div>
                    <span className="text-sm font-bold text-text uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Project Report</span>
                </button>
            )}
            {availableAssets?.image && (
                <button
                    onClick={() => onSelectAsset('image', availableAssets.image, 'Project Image')}
                    className="flex flex-col items-center gap-5 p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-2 hover:shadow-glass-purple transition-all duration-500 group"
                >
                    <div className="p-5 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-500">
                        <BsImage size={48} />
                    </div>
                    <span className="text-sm font-bold text-text uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Project Image</span>
                </button>
            )}
        </div>
    );

    const renderContent = () => {
        if (!asset) return renderSelectionMenu();

        const { type, src, title } = asset;

        switch (type) {
            case 'video':
                return (
                    <video
                        controls
                        autoPlay
                        className="w-full max-h-[70vh] rounded-[1.5rem] shadow-glass-purple-sm border border-white/10"
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'document':
                return (
                    <iframe
                        src={`${src}#toolbar=0`}
                        title={title}
                        className="w-full h-[75vh] rounded-[1.5rem] border border-white/10 bg-white/95 backdrop-blur-md shadow-glass-purple-sm"
                    />
                );
            case 'image':
                return (
                    <img
                        src={src}
                        alt={title}
                        className="w-full max-h-[70vh] object-contain rounded-[1.5rem] shadow-glass-purple-sm border border-white/10"
                    />
                );
            default:
                return <p className="text-text/60 font-medium py-10">Unsupported asset type</p>;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-purple-900/10 backdrop-blur-xl"
                onClick={onClose}
            >
                {/* Dynamic Lavender Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-glass-purple border border-white/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-10 py-8 border-b border-white/10">
                        <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-text to-text/60 bg-clip-text text-transparent">
                                {asset ? asset.title : 'Explore Project Demo'}
                            </h3>
                            {asset && availableAssets && (
                                <button
                                    onClick={() => onSelectAsset(null)}
                                    className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-2 py-1 px-3 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/20 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Selection
                                </button>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 text-text/40 hover:text-primary transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="px-10 py-10 bg-white/5 min-h-[40vh] flex items-center justify-center">
                        <div className="w-full">
                            {renderContent()}
                        </div>
                    </div>

                    {/* Footer */}
                    {asset && (
                        <div className="px-10 py-8 flex justify-between items-center bg-white/5 border-t border-white/10">
                            <span className="text-[10px] font-bold text-text/40 uppercase tracking-[0.2em]">Viewing: <span className="text-primary">{asset.type}</span></span>
                            <a
                                href={asset.src}
                                download
                                className="px-10 py-3 bg-primary/90 text-white text-[10px] font-bold rounded-2xl hover:bg-primary hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-[0.2em] shadow-lg"
                            >
                                Download Asset
                            </a>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MediaModal;

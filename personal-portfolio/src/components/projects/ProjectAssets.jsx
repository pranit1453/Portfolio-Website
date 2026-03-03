import React from 'react';

const ProjectAssets = ({ assets, title }) => {
    if (!assets) return null;

    return (
        <div className="mt-12 space-y-8">
            {assets.video && (
                <div className="glass-panel p-2 overflow-hidden">
                    <video
                        src={assets.video}
                        controls
                        className="w-full h-auto rounded-xl shadow-lg border border-glass-border"
                        style={{ maxHeight: '70vh' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Demo Video</p>
                </div>
            )}

            {assets.document && (
                <div className="glass-panel p-2 overflow-hidden h-[80vh] min-h-[600px] flex flex-col">
                    <div className="flex-grow rounded-xl overflow-hidden border border-glass-border relative">
                        <iframe
                            src={`${assets.document}#toolbar=0`}
                            title="Project Document"
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                    <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Documentation (PDF)</p>
                </div>
            )}

            {assets.image && (
                <div className="glass-panel p-2 overflow-hidden">
                    <img
                        src={assets.image}
                        alt={`${title} screenshot`}
                        loading="lazy"
                        className="w-full h-auto rounded-xl shadow-lg border border-glass-border object-contain"
                        style={{ maxHeight: '70vh' }}
                    />
                    <p className="text-center text-sm text-muted mt-3 mb-1 font-medium tracking-wide">Project Architecture / Screenshot</p>
                </div>
            )}
        </div>
    );
};

ProjectAssets.displayName = 'ProjectAssets';

export default ProjectAssets;

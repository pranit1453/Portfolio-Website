import { BiLogoLinkedin, BiLogoGithub, BiLogoGmail } from 'react-icons/bi';

const Footer = () => {
    return (
        <footer className="bg-background py-8 text-center border-t border-glass-border backdrop-blur-md">
            <div className="container mx-auto px-6">
                <p className="text-muted mb-4">
                    © {new Date().getFullYear()} Pranit Bhangale. All rights reserved.
                </p>
                <div className="flex justify-center space-x-8 items-center">
                    <a href="https://www.linkedin.com/in/pranit-bhangale-236474229/" target="_blank" rel="noopener noreferrer" className="text-[#3F3F5A] hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                        <BiLogoLinkedin size={32} />
                    </a>
                    <a href="https://github.com/PranitBhangale" target="_blank" rel="noopener noreferrer" className="text-[#3F3F5A] hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                        <BiLogoGithub size={32} />
                    </a>
                    <a href="mailto:pranitbhangale14@gmail.com" className="text-[#3F3F5A] hover:text-primary transition-colors hover:-translate-y-1 duration-300">
                        <BiLogoGmail size={32} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

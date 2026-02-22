import { BiLogoLinkedin, BiLogoGithub, BiLogoGmail } from 'react-icons/bi';
import { socialLinks } from '../../data/navigation';

const Footer = () => {
    const getIcon = (type) => {
        switch (type) {
            case 'linkedin': return <BiLogoLinkedin size={32} />;
            case 'github': return <BiLogoGithub size={32} />;
            case 'email': return <BiLogoGmail size={32} />;
            default: return null;
        }
    };

    return (
        <footer className="bg-background py-8 text-center border-t border-glass-border backdrop-blur-md">
            <div className="container mx-auto px-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-text mb-1">Pranit Bhangale</h2>
                    <p className="text-sm text-muted">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
                <div className="flex justify-center space-x-8 items-center">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.type !== 'email' ? "_blank" : undefined}
                            rel={link.type !== 'email' ? "noopener noreferrer" : undefined}
                            className="text-muted hover:text-primary transition-colors hover:-translate-y-1 duration-300"
                        >
                            {getIcon(link.type)}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

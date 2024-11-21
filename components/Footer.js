const Footer = ({ footer }) => {
    if (!footer) {
        return <p></p>;
    }

    const socialLinks = footer.socialLinks || {};
    const contributions = footer.contributors || {};
    const donate = footer.donate || {};

    return (
        <footer className="footer-container">
            <div className="footer">
                {/* Donate Section */}
                <div className="footer-heading footer-1">
                    <h2>Donate</h2>
                    {Object.entries(donate).map(([place, url]) => (
                        <a key={place} href={url} target="_blank" rel="noopener noreferrer">
                            {place}
                        </a>
                    ))}
                </div>

                {/* Contributors Section */}
                <div className="footer-heading footer-2">
                    <h2>Contributors</h2>
                    {Object.entries(contributions).map(([role, names]) =>
                        Object.entries(names).map(([name, url]) => (
                            <a
                                key={name}
                                href={url || '#'}
                                target={url ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                            >
                                {role}: {name}
                            </a>
                        ))
                    )}
                </div>

                {/* Social Media Section */}
                <div className="footer-heading footer-3">
                    <h2>Social Media</h2>
                    {Object.entries(socialLinks).map(([platform, url]) => (
                        <a
                            key={platform}
                            href={`https://${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {platform}
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .footer-container {
                    background-color: #000000;
                    padding: 20px 0;
                    border-top: 1px solid #ddd;
                }
                .footer {
                    display: flex;
                    justify-content: space-around;
                    max-width: 1200px;
                    margin: 0 auto;
                    flex-wrap: wrap;
                }
                .footer-heading {
                    flex: 1;
                    margin: 10px;
                }
                .footer-heading h2 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                    color: #ffffff;
                }
                .footer-heading a {
                    display: block;
                    color: #FFFEEE;
                    font-weight: bold;
                    text-decoration: none;
                    margin-bottom: 5px;
                }
                .footer-heading a:hover {
                    text-decoration: underline;
                }
                @media (max-width: 768px) {
                    .footer {
                        flex-direction: column;
                        align-items: center;
                    }
                    .footer-heading {
                        margin: 20px 0;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { createClient } from 'contentful';
import Footer from '../components/Footer';

// Fetch data from Contentful
export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    // Fetch the "Get Involved" content model
    const getInvolvedRes = await client.getEntries({
        content_type: 'getInvolved', // Replace with your Contentful content type ID
    });

    // Fetch footer data
    const footerRes = await client.getEntries({
        content_type: 'footer', // Replace with your Contentful content type ID for the footer
    });

    return {
        props: {
            getInvolved: getInvolvedRes.items,
            footer: footerRes.items[0]?.fields || null, // Safeguard against undefined footer data
        },
        revalidate: 1,
    };
}

// React Component
export default function GetInvolved({ getInvolved, footer }) {
    const { header, invo } = getInvolved[0].fields; // Assumes one entry exists
    const links = invo; // Use `invo` directly if it's already an object

    return (
        <div className="page-container">
            <div className="container">
                <h1 className="main-title">{header}</h1>
                <ul className="bullet-list">
                    {Object.entries(links).map(([text, url], index) => (
                        <li key={index} className="list-item">
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link"
                            >
                                {text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Add Footer */}
            <Footer footer={footer} />

            <style jsx>{`
                .page-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .container {
                    margin: 20px auto;
                    padding: 20px;
                    max-width: 800px;
                }
                .main-title {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 20px;
                    font-weight: bold;
                    color: #333;
                }
                .bullet-list {
                    list-style-type: disc; /* Standard bullet points */
                    padding-left: 40px; /* Indent the list */
                    margin: 0;
                }
                .list-item {
                    margin-bottom: 10px;
                }
                .link {
                    font-size: 1.2rem;
                    color: #0070f3; /* Blue link color */
                    text-decoration: none;
                }
                .link:hover {
                    text-decoration: underline;
                }
                /* Remove unwanted stretch */
                .container {
                    flex-grow: 0; /* Prevent unnecessary stretching */
                }
            `}</style>
        </div>
    );
}

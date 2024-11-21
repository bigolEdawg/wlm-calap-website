import { createClient } from 'contentful';
import StoryCard from '../components/StoryCard';
import Footer from '../components/Footer';

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    // Fetch stories data
    const res = await client.getEntries({ content_type: 'story' });

    // Fetch footer data
    const footerRes = await client.getEntries({ content_type: 'footer' });

    return {
        props: {
            stories: res.items,
            footer: footerRes.items[0]?.fields || null, // Safeguard against undefined footer data
        },
        revalidate: 1,
    };
}

export default function Stories({ stories, footer }) {
    return (
        <div className="page-container">
            <div className="story-list">
                {stories.map((story) => (
                    <StoryCard key={story.sys.id} story={story} />
                ))}
            </div>
            {/* Add Footer */}
            <Footer footer={footer} />

            <style jsx>{`
                .page-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .story-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 20px 60px;
                    flex-grow: 1; /* Ensures the story list takes available space */
                }
            `}</style>
        </div>
    );
}

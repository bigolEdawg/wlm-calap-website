import { createClient } from 'contentful';
import ImageNav from '../components/ImageNav';
import Homepage from '../components/HomepageBody';
import Footer from '../components/Footer';

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    // Fetch data for homepage and stories
    const storyRes = await client.getEntries({ content_type: 'story' });
    const homepageRes = await client.getEntries({ content_type: 'homepage' });

    // Fetch data for footer
    const footerRes = await client.getEntries({ content_type: 'footer' });

    return {
        props: {
            stories: storyRes.items,
            homepage: homepageRes.items,
            footer: footerRes.items[0]?.fields || null, // Safeguard against undefined footer data
        },
        revalidate: 1,
    };
}

export default function Stories({ stories, homepage, footer }) {
    return (
        <div className="">
            <ImageNav homepage={homepage} />
            <Homepage homepage={homepage} ignoreType="Stewart" />
            {/* Pass footer data to Footer */}
            <Footer footer={footer} />
        </div>
    );
}

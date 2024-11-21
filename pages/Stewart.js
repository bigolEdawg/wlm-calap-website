import { createClient } from 'contentful';
import ImageNav from '../components/ImageNav';
import Swpage from '../components/SWBody';
import Footer from '../components/Footer';

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const storyRes = await client.getEntries({ content_type: 'story' });
    const homepageRes = await client.getEntries({ content_type: 'homepage' });
    const swpageRes = await client.getEntries({ content_type: 'stewart' });

    // Fetch data for footer
    const footerRes = await client.getEntries({ content_type: 'footer' });

    return {
        props: {
            stories: storyRes.items,
            swpage: swpageRes.items,
            footer: footerRes.items[0]?.fields || null, // Safeguard against undefined footer data
        },
        revalidate: 1,
    };
}

export default function Stories({ stories, swpage, footer }) {
    console.log(swpage);
    return (
        <div className="">
            <ImageNav homepage={swpage} />
            <Swpage swpage={swpage} ignoreType="Stewart Images" />
            {/* Pass footer data to Footer */}
            <Footer footer={footer} />
        </div>
    );
}

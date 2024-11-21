import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import ImageNav from '../components/ImageNav';

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const res = await client.getEntries({ content_type: "story" });
    const ress = await client.getEntries({ content_type: "recipe" });

    return {
        props: { stories: res.items, recipe: ress.items },
        revalidate: 1,
    };
}

export default function Stories({ stories, recipe }) {
    console.log(recipe);
    // Filter the stories to find the one with the title "Homepage Test"
    const homepageStory = stories.find(story => story.fields.title === "Homepage Test");
    const textHeader = homepageStory.fields.ingredients;

    console.log(textHeader);
    // If the homepage story is found, display it
    return (
        <div className="">
            {/* <ImageNav stories={recipe}/> */}

            {homepageStory ? (
                <div className='container main-body'>
                    <h3 className="sub-header">{textHeader}</h3>
                    <Image
                        className='image-normal-left'
                        src={'https:' + homepageStory.fields.thumbnail.fields.file.url}
                        width={homepageStory.fields.thumbnail.fields.file.details.image.width * 0.25}
                        height={homepageStory.fields.thumbnail.fields.file.details.image.height}
                        priority
                        alt={homepageStory.fields.title}
                    />
                    {documentToReactComponents(homepageStory.fields.method)}
                </div>
            ) : (
                <p>No content available for the homepage.</p>
            )}
        </div>
    );
}

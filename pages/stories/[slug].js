import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '../../components/Skeleton';
import Footer from '../../components/Footer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'story',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const storyRes = await client.getEntries({
    content_type: 'story',
    'fields.slug': params.slug,
  });

  const footerRes = await client.getEntries({
    content_type: 'footer', // Ensure your footer content type ID matches this
  });

  return {
    props: {
      story: storyRes.items[0] || null,
      footer: footerRes.items[0]?.fields || null, // Safeguard against undefined footer data
    },
    revalidate: 1,
  };
};

export default function StoryDetails({ story, footer }) {
  if (!story) return <Skeleton />;

  const { featuredImage, title, storyBody } = story.fields;

  // Check if the featured content is a video
  const isVideo = featuredImage.fields.file.contentType.includes('video');

  // Check if the featured content is audio
  const isAudio = featuredImage.fields.file.contentType.includes('audio');

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="main-title">{title}</h2>

        <div className="banner">
          <div
            className="background-blur"
            style={{
              backgroundImage: `url('http:${featuredImage.fields.file.url}')`,
            }}
          ></div>
          <div className="media-wrapper">
            {isVideo ? (
              <div className="video-container">
                <video
                  src={`https:${featuredImage.fields.file.url}`}
                  controls
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : isAudio ? (
              <audio
                src={`https:${featuredImage.fields.file.url}`}
                controls
                preload="auto"
              >
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="image-container">
                <Image
                  src={'http:' + featuredImage.fields.file.url}
                  width={featuredImage.fields.file.details.image.width}
                  height={featuredImage.fields.file.details.image.height}
                  alt={title}
                />
              </div>
            )}
          </div>
        </div>

        <div className="body-text">
          <div>{documentToReactComponents(storyBody)}</div>
        </div>
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
          text-transform: uppercase;
          color: #333;
        }
        .banner {
          position: relative;
          text-align: center;
          overflow: hidden;
          border-radius: 8px;
        }
        .background-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: blur(20px);
          z-index: 1;
        }
        .media-wrapper {
          position: relative;
          z-index: 2;
        }
        .video-container,
        .image-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        .video-container video,
        .image-container img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .body-text {
          background: #f3e8ff;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .body-text div {
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
        }
      `}</style>
    </div>
  );
}

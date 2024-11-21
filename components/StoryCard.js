import Link from 'next/link'
import Image from 'next/image'

export default function StoryCard({ story }) {
  const { title, slug, description, thumbnail } = story.fields
  console.log({story})
  return (
    <div className="card story-item">
      <div className="featured">
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          priority
          alt={title}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{ title }</h4>
          <p>{ description }</p>
        </div>
        <div className="actions">
        <Link href={'/stories/' + slug} legacyBehavior>
            <a>Learn More</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .featured {
          width: 100%;
          overflow: hidden;
          margin: 0; /* Ensure no unintended margins */
        }
        .featured :global(img) {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover; /* Ensure image covers the container */
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #00000a;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

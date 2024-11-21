import React from 'react';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image'

export default function HomepageBody({homepage}, ignoreType) {
    // const head = homepage.fields.header
    let count = 0
    
    return (
        <div className="container main-body">
            {homepage.map((hp, index) => (
                
                {hp.fields.header.includes(ignoreType) ? (
                    <div key={index}>
                    <h3 className="sub-header">{hp.fields.header}</h3>
                    
                    {count % 2 === 0 ? (
                        <Image
                            className='image-normal-left'
                            src={'https:' + hp.fields.bodyImage.fields.file.url}
                            priority={true}
                            // When fetching this data i need to make sure that i
                            // ignore this if the content type doesnt contain a photo
                            width={hp.fields.bodyImage.fields.file.details.image.width}
                            height={hp.fields.bodyImage.fields.file.details.image.height}
                            alt=''
                        />
                    ):(
                        <Image 
                            className='image-normal-right'
                            src={'https:' + hp.fields.bodyImage.fields.file.url}
                            priority={true}
                            // When fetching this data i need to make sure that i
                            // ignore this if the content type doesnt contain a photo
                            width={hp.fields.bodyImage.fields.file.details.image.width}
                            height={hp.fields.bodyImage.fields.file.details.image.height}
                            alt=''
                        />
                    )}

                    {documentToReactComponents(hp.fields.bodyText)}
                    {count += 1}
                </div>
            ))}
            ):(
                <p></p>                
            )}
        </div>
    );
}

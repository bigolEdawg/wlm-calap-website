import React from 'react'
import Image from 'next/image';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

export default function HomepageBody({homepage, ignoreType}) {
    return (
        <div className="container main-body">
            {homepage.map((hp, index) => {
                let x = hp.fields.header;
                console.log(x); // Debugging: log only when necessary

                if (!(x.includes(ignoreType))) {
                    return (
                        <div key={index}>
                            <h3 className="sub-header">{hp.fields.header}</h3>

                            {index % 2 === 0 ? ( // Use index instead of count
                                <Image
                                    className="image-normal-left"
                                    src={'https:' + hp.fields.bodyImage.fields.file.url}
                                    priority={true}
                                    width={hp.fields.bodyImage.fields.file.details.image.width}
                                    height={hp.fields.bodyImage.fields.file.details.image.height}
                                    alt=""
                                />
                            ) : (
                                <Image
                                    className="image-normal-right"
                                    src={'https:' + hp.fields.bodyImage.fields.file.url}
                                    priority={true}
                                    width={hp.fields.bodyImage.fields.file.details.image.width}
                                    height={hp.fields.bodyImage.fields.file.details.image.height}
                                    alt=""
                                />
                            )}

                            {documentToReactComponents(hp.fields.bodyText)}
                        </div>
                    );
                } else {
                    return null; // Return null for ignored items
                }
            })}
        </div>
    );
}

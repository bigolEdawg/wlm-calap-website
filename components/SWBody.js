import React from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function SWBody({ swpage, ignoreType }) {
    return (
        <div className="container main-body">
            {swpage.map((sw, index) => {
                const header = sw.fields.header;

                // Skip rendering items matching the ignoreType
                if (!header.includes(ignoreType)) {
                    const bodyImage = sw.fields.bodyImage?.fields?.file;
                    const imageUrl = bodyImage?.url ? `https:${bodyImage.url}` : null;
                    const imageWidth = bodyImage?.details?.image?.width || 0;
                    const imageHeight = bodyImage?.details?.image?.height || 0;

                    return (
                        <div key={index}>
                            <h3 className="sub-header">{header}</h3>

                            {/* Check if bodyImage exists and alternate alignment using index */}
                            {imageUrl && (
                                index % 2 === 0 ? (
                                    <Image
                                        className="image-normal-left"
                                        src={imageUrl}
                                        priority={true}
                                        width={imageWidth}
                                        height={imageHeight}
                                        alt={header}
                                    />
                                ) : (
                                    <Image
                                        className="image-normal-right"
                                        src={imageUrl}
                                        priority={true}
                                        width={imageWidth}
                                        height={imageHeight}
                                        alt={header}
                                    />
                                )
                            )}

                            {documentToReactComponents(sw.fields.bodyText)}
                        </div>
                    );
                } else {
                    return null; // Skip items matching ignoreType
                }
            })}
        </div>
    );
}

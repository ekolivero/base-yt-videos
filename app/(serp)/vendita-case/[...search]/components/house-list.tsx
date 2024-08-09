'use client'
import ListingCard from "./listing-card"
import PaginationComponent from "./pagination"
import { PropertyListing } from "../page";
import React, { useState, useRef, useEffect } from "react";
import { streamComponent } from "../actions/reccomendation";

type ButtonConfig = {
    afterCards: number;
    component: React.ReactNode;
};

const buttonConfigs = [
    { afterCards: 5 },
] as ButtonConfig[];

export default function HouseList({
    propertyListing,
    pageRange,
    currentPage,
    totalPages,
}: {
    propertyListing: PropertyListing[];
    pageRange: (string | number | '...')[],
    currentPage: number;
    totalPages: number;
}) {
    const [component, setComponent] = useState<React.ReactNode>();
    const [hasTriggered, setHasTriggered] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !hasTriggered) {
                    setHasTriggered(true);
                    const toSendList = propertyListing.slice(0, 5).map((house) => ({
                        title: house.title,
                        bedrooms: house.bedrooms,
                        bathrooms: house.bathrooms,
                        surface: house.surface,
                    })) 
                    setComponent(await streamComponent(toSendList));
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => observer.disconnect();
    }, [hasTriggered, propertyListing]);

    const sortedButtonConfigs = [...buttonConfigs].sort((a, b) => a.afterCards - b.afterCards);

    return (
        <div className="flex flex-1 flex-col gap-8 mb-8">
            <div className="px-2 gap-4 flex flex-col">
                {/* <button onClick={async e => {
                    e.preventDefault();
                    setComponent(await streamComponent(toSendList));
                }}>Load more</button> */}
                {propertyListing?.map((house, index) => (
                    <React.Fragment key={house.title}>
                        <ListingCard house={house} />
                        {index === 1 && (
                            <div ref={triggerRef} style={{ height: '1px', width: '100%' }} />
                        )}
                        {sortedButtonConfigs.map((config, configIndex) =>
                            (index + 1) === config.afterCards ? (
                                <React.Fragment key={`button-${configIndex}`}>
                                   {component}
                                </React.Fragment>
                            ) : null
                        )}
                    </React.Fragment>
                ))}
                <PaginationComponent pageRange={pageRange} currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    )
}
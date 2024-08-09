import { Suspense } from "react";
import ListingCard from "./components/listing-card";
import { LoadingListingCard } from "./components/loading-listing-card";
import PaginationComponent from "./components/pagination";
import HouseList from "./components/house-list";

export type PropertyListing = {
    title: string;
    description: string;
    link: string;
    price: {
        value: number;
        formattedValue: string;
    };
    contract: string;
    yearBuilt: string;
    propertyType: string;
    typology: string;
    condition: string;
    surface: string;
    publicationDate: string;
    image: Array<{
        url: string;
        caption: string;
    }>;
    features: string[];
    rooms: string;
    bedrooms: string;
    bathrooms: string;
    floor: string;
    elevator: string;
    garage: string;
    energy: {
        class: string;
        heating: {
            type: string;
            value: string;
        };
        airConditioning: string;
    };
    advertiser: {
        type: string;
        name: string;
        url: string;
    };
    crawler: {
        id: string;
        source: string;
        timestamp: string;
        url: string;
    };
    location: {
        location: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            address: string;
            hierarchy: {
                region: {
                    id: string;
                    label: string;
                };
                province: {
                    id: string;
                    label: string;
                };
                city: {
                    id: string;
                    label: string;
                };
            };
        };
    };
}

type PropertyListingResponse = {
    houses: PropertyListing[];
    location: string;
    page: number;
    per_page: number;
    total_results: number;
    total_pages: number;
}

const constructUrl = (baseUrl: string, search: string[], prezzoMinimo: string, prezzoMassimo: string, page: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set('location', search.join('/'));

    if (page === undefined || page === '') {
        url.searchParams.set('page', '1');
    } else {
        url.searchParams.set('page', page);
    }

    if (prezzoMinimo !== undefined && prezzoMinimo !== '') {
        url.searchParams.set('prezzoMinimo', prezzoMinimo);
    }

    if (prezzoMassimo !== undefined && prezzoMassimo !== '') {
        url.searchParams.set('prezzoMassimo', prezzoMassimo);
    }

    return url.toString();
};

async function ListingItems({ search, prezzoMinimo, prezzoMassimo, page }: {
    search: string[],
    prezzoMinimo: string,
    prezzoMassimo: string,
    page: string
}) {
    const baseUrl = process.env.BASE_URL + '/houses';
    const url = constructUrl(baseUrl, search, prezzoMinimo, prezzoMassimo, page);

    const response = await fetch(url);
    const propertyListing = await response.json() as PropertyListingResponse;

    const currentPage = propertyListing.page;
    const totalPages = propertyListing.total_pages;

    // Helper function to generate page range
    const getPageRange = (current: number, total: number) => {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
        if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        return [1, '...', current - 1, current, current + 1, '...', total];
    };

    const pageRange = getPageRange(currentPage, totalPages);

    return (
        <HouseList propertyListing={propertyListing.houses} currentPage={currentPage} pageRange={pageRange} totalPages={totalPages} />
    )
}


export default async function Page({ params: { search }, searchParams: {
    prezzoMinimo,
    prezzoMassimo,
    page
} }: { params: { search: string[] }, searchParams: { prezzoMinimo: string, prezzoMassimo: string, page: string} }) {
    return (
        <div className="flex px-2 md:max-w-xl md:mx-auto h-full">
            <Suspense fallback={<LoadingListingCard />} key={`${prezzoMinimo}-${prezzoMassimo}-${page}`}>
                <ListingItems search={search} prezzoMinimo={prezzoMinimo} prezzoMassimo={prezzoMassimo} page={page}/>
            </Suspense>
        </div>
    )
}
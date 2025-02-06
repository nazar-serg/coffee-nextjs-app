import { getPropertyBySlug } from '../../../lib/api';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CoffeeShopSingleInfo from '../../../components/CoffeeShopSingle/CoffeeShopSingleInfo';

export default async function SingleCoffeeShopPage({ params }) {
    const property = await getPropertyBySlug(params.slug);
    
    if (!property) {
        return <p>Property not found</p>
    }

    const breadcrumbs = [
        { label: 'Головна', href: '/' },
        { label: property.title.rendered, href: null },
    ];

    return (
        <>
        <div className='breadcrumbs bg-light-brown py-4 mb-8'>
            <div className='container mx-auto'>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        </div>
        <CoffeeShopSingleInfo
            image={property.acf.image}
            title={property.title.rendered}
            address={property.acf.address}
            price={property.acf.price}
            text={property.acf.text}
            phone={property.acf.phone}
            schedule={{
                monday: property.acf.monday,
                tuesday: property.acf.tuesday,
                wednesday: property.acf.wednesday,
                thursday: property.acf.thursday,
                friday: property.acf.friday,
                saturday: property.acf.saturday,
                sunday: property.acf.sunday,
            }}
            photoGallery={property.acf.photo_gallery}
        />
        </>
    );
}
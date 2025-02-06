'use client';

import { getPageBySlug } from '../../lib/api';
import FlexibleContent from '../../components/About/FlexibleContent';
import Breadcrumbs from '../../components/Breadcrumbs';
import Image from 'next/image';
import loaderSvg from '../../public/images/loader.svg';
import { useEffect, useState } from 'react';

export default function About() {

    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
        try {
            const data = await getPageBySlug('about');
            setPageData(data);
        } catch (error) {
            console.error('Сторінку не знайдено: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPageData();

    }, []);

       if (isLoading) {
            return (
                <div className='flex justify-center items-center h-screen'>
                    <Image src={loaderSvg} alt="Loading..." width={100} height={100} priority />
                </div>
            );
        }

    const breadcrumbs = [
        { label: 'Головна', href: '/' },
        { label: pageData.title.rendered, href: null },
    ];

    return (
        <>
        <div className='breadcrumbs bg-light-brown py-4 mb-8'>
                <div className='container mx-auto'>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>
            <div className='container mx-auto mb-10'>
                <h1 className='md:text-7xl text-4xl text-black mb-10'>{pageData.acf?.about_title}</h1>
                <FlexibleContent content={pageData.acf?.about_info || []} />
            </div>
        </>    
    );
}

'use client';
import { useEffect, useState } from "react";
import Image from 'next/image';
import loaderSvg from '../../public/images/loader.svg';
import AllPosts from '../../components/Blog/AllPosts';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getPageBySlug } from '../../lib/api';

export default function Blog() {
    const [isLoading, setIsLoading] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPageBySlug('blog');
                setPageData(data);
            } catch (error) {
                console.error('Сторінка не знайдена: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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
        <div className="container mx-auto">
        <h1 className="md:text-7xl text-4xl text-black mb-10">{pageData.title.rendered}</h1>
            <AllPosts />
        </div>
        </>
    );
}
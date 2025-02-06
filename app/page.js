'use client';

import { useState, useEffect } from 'react';
import { getPageBySlug } from '../lib/api';

import Hero from '@/components/Home/Hero';
import ListCoffeeShops from '@/components/Home/ListCoffeeShops';
import Image from 'next/image';
import loaderSvg from '../public/images/loader.svg';

export default function Home() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getPageBySlug('home');
          setPageData(data);
        } catch (error) {
          console.error('Ошибка загрузки данных страницы:', error);
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
    
    return (
      <>
      <Hero />
        <div className='container mx-auto my-10'>
        <h1 className='mb-2 text-2xl'>{pageData.acf.heading_properties}</h1>
        <ListCoffeeShops />
      </div>
      </>
    );
};
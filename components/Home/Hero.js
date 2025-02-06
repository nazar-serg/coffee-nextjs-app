'use client';
import { useEffect, useState } from "react";
import { getPageBySlug } from '../../lib/api';
import styles from '../../styles/Home/Hero.module.css';

export default function Hero () {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPageBySlug('home');
                setPageData(data);

            } catch (error) {
                console.error('Проблема с подключением к странице: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`${styles.hero} bg-secondary py-8`}>
            <div className="container mx-auto">
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                    <h1 className={`${styles.title} text-center md:text-left md:text-7xl text-4xl text-white mb-2 md:mb-4`}>{pageData?.acf?.hero_title}</h1>
                    <p className="text-white text-xl">{pageData?.acf?.hero_text}</p>
                    </div>
                    <div className={styles.image}>
                        <img className='rounded-xl' src={pageData?.acf?.hero_image} alt={pageData?.acf?.hero_title}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
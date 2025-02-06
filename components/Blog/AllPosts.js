'use client';
import { useEffect, useState } from 'react';
import { getPropertiesBlog } from '../../lib/api';
import styles from '../../styles/Blog/AllPosts.module.css';
import he from 'he'; //Пакет который используется для декодирования HTML-сущностей

export default function AllPosts() {
   const [properties, setpPoperties] = useState([]);

   useEffect(() => {
       const fetchProperties = async () => {
        try {
            const data = await getPropertiesBlog();
            console.log('Полученные данные:', data);
            
            if (Array.isArray(data)) {
                setpPoperties(data);
            } else {
                console.error('Очікувався масив, але отримано:', data);
            }

        } catch (error) {
            console.error('Помилка під час завантаження постів: ', error);
        }
       };

       fetchProperties();
   }, []);

    return (
    <>
    <div className='all-blog-list mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
    {properties.length > 0 ? (
        properties.map((post) => (
            <div key={post.id} className={`${styles.item} flex flex-col h-full`}>
                <div className={styles.image}>
                    <img src={post.acf.single_post_image.link} alt={post.acf.single_post_image.alt} />
                </div>
                <div className={styles.content}>
                    <div className='mb-3'>
                        <h2 className='text-xl text-white'>{he.decode(post.title.rendered)}</h2>
                    </div>
                    <div className='mt-auto'>
                    <a href={`/blog/${post.slug}`} className='inline-block px-4 py-2 bg-white hover:bg-white/80 text-black rounded-lg transition duration-300 ease-in-out'>Докладніше</a>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p>Немає доступних постів</p>
    )}
    </div>
    </>
    );
}
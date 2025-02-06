'use client';
import { useParams } from 'next/navigation';
import { getPropertyBlogBySlug } from '../../../lib/api';
import { getPropertiesBlog } from '../../../lib/api';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Image from 'next/image';
import loaderSvg from '../../../public/images/loader.svg';
import { useEffect, useState } from 'react';
import he from 'he';
import FlexibleContentBlogSinglePage from '../../../components/Blog/FlexibleContentBlogSinglePage';
import styles from '../../../styles/Blog/SinglePostBlog.module.css';
import OtherArticles from '../../../components/Blog/OtherArticles';

export default function  SinglePostBlog() {

    const params = useParams();
    const slug = params?.slug;

    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {

        if (!slug) return;

        const fetchPageData = async () => {
            try {
                const data = await getPropertyBlogBySlug(slug);
                setPageData(data);
                console.log(data);

                const allPosts = await getPropertiesBlog();
                console.log(allPosts);

                const filteredPosts = allPosts.filter(post => post.slug !== slug);
                setRelatedPosts(filteredPosts.slice(0, 3));

            } catch (error) {
                console.error('Сторінку не знайдено: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageData();
        
    }, [slug]);

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
            <h1 className='md:text-7xl text-4xl text-black mb-10'>{he.decode(pageData.title.rendered)}</h1>
            <div className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: pageData.acf?.single_post_description }}></div>
            </div>
            <FlexibleContentBlogSinglePage content={pageData.acf?.blog_single_post_content || []} />
            <OtherArticles relatedPosts={relatedPosts} />
        </div>
        </>
       
    );
}
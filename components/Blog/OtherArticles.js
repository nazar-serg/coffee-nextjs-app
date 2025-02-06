import he from 'he';
import styles from '../../styles/Blog/OtherArticles.module.css';

export default function OtherArticles({ relatedPosts }) {
    return (
        <div className='mt-14'>
            <h2 className='md:text-5xl text-4xl text-black mb-10'>Інші статті</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {relatedPosts.map(post => (
                    <div key={post.id} className={`${styles.item} flex flex-col h-full`}>
                        <div className={styles.image}>
                            <img src={post.acf.single_post_image.link} alt={post.acf.single_post_image.alt} />
                        </div>
                        <div className={styles.desc}>
                            <div className='mb-3'>
                                <h2 className='text-xl text-white'>{he.decode(post.title.rendered)}</h2>
                            </div>
                            <div className='mt-auto'>
                                <a href={`/blog/${post.slug}`} className='inline-block px-4 py-2 bg-white hover:bg-white/80 text-black rounded-lg transition duration-300 ease-in-out'>Докладніше</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
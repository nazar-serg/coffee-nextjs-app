"use client";
import { motion } from 'framer-motion';
import styles from '../../styles/Blog/FlexibleContentBlogSinglePage.module.css';

export default function FlexibleContentBlogSinglePage({ content }) {

    const imageVariants = {
        hidden: { opacity:0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className='bg-light-color p-10 rounded-lg'>
        {content.map((block, index) => {
                switch(block.acf_fc_layout) {
                    case 'image_on_the_right_text_on_the_left':
                        return (
                            <div key={index} className={`${styles.wrapper} mb-8`}>
                                <div className={styles.content}>
                                    <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
                                </div>
                                <motion.div 
                                className={styles.image}
                                initial="hidden"
                                animate="visible"
                                variants={imageVariants}
                                >
                                    <img src={block.image.url} alt={block.image.alt} />
                                </motion.div>
                            </div>
                        );

                        case 'image_on_the_left_text_on_the_right':
                        return (
                            <div key={index} className={`${styles.wrapper} mb-8`} >
                                <motion.div 
                                className={styles.image}
                                initial="hidden"
                                animate="visible"
                                variants={imageVariants}
                                >
                                    <img src={block.image.url} alt={block.image.alt} />
                                </motion.div>
                                <div className={styles.content}>
                                    <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
                                </div>
                            </div>
                        );

                        default:
                            return <div key={index}>Неизвестный блок.</div>;
                }
            })}
        </div> 
    );
}
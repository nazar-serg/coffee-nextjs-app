"use client";
import { motion } from 'framer-motion'; //animation
import styles from '../../styles/About/FlexibleContent.module.css';

export default function FlexibleContent({ content }) {

    if (!content || !Array.isArray(content)) {
        return <p>Контент отсутствует</p>;
    }

    const imageVariants = {
        hidden: { opacity:0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <>
        {content.map((block, index) => {
                switch(block.acf_fc_layout) {
                    case 'image_left_text_right':
                        return (
                            <div key={index} className={`${styles.wrapper} mb-8`}>
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

                        case 'image_right_text_left':
                        return (
                            <div key={index} className={styles.wrapper}>
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

                        default:
                            return <div key={index}>Неизвестный блок.</div>;
                }
            })}
        </> 
    );
}
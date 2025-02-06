'use client';

import { useState, useEffect } from "react";
import { processFormData } from '../../lib/form';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getPageBySlug } from '../../lib/api';
import Image from 'next/image';
import loaderSvg from '../../public/images/loader.svg';
import styles from '../../styles/Contact/Contact.module.css';
import { motion } from 'framer-motion';
 
export default function Contact() {

    const [pageData, setPageData] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('bg-green-500');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const data = await getPageBySlug('contact');
                setPageData(data);
            } catch (error) {
                console.error('Error fetching page data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            name: event.target['text-549'].value,
            phone: event.target['tel-466'].value,
            email: event.target.email.value,
            message: event.target['textarea-819'].value,
        };

        console.log('Data: ', data);

        const validationResult = processFormData(data);

        if (validationResult.error) {
            // Если валидация не прошла, выводим сообщение об ошибке
            setAlertColor('bg-red-500');
            setResponseMessage(validationResult.error);
            setSubmitStatus(true);
            return;
        }
    
        try {
            const response = await fetch('http://localhost/headless-rent/wp-json/contact-form/v1/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();

            console.log('Result: ', result);
    
            if (response.ok) {
                setAlertColor('bg-green-500');
                setResponseMessage(result.message || 'Форма успішно надіслана!');
            } else {
                setAlertColor('bg-red-500');
                setResponseMessage(result.error || 'Щось пішло не так.');
            }

            setSubmitStatus(true);
            
        } catch (error) {
            setAlertColor('bg-red-500');
            setResponseMessage('Error submitting the form.');
            setSubmitStatus(true);
            console.error('Error:', error);
        }
    };

    const breadcrumbs = [
        { label: 'Головна', href: '/' },
        { label: pageData?.title.rendered, href: null },
    ];

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Image src={loaderSvg} alt="Loading..." width={100} height={100} priority />
            </div>
        );
    }

    const imageVariants = {
        hidden: { opacity:0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };


    return (
        <>
        <div className='breadcrumbs bg-light-brown py-4 mb-8'>
            <div className='container mx-auto'>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        </div>
        <div className="container mx-auto">
            <section className="my-10">
                <div className={`${styles.wrapper}`}>
                    <motion.div 
                    className={`${styles.image}`} style={{backgroundImage: `url(${pageData?.acf?.contact_image})`}}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    >
                        <h1 className="md:text-5xl text-4xl mb-4 text-white relative z-10">{pageData?.acf?.contact_title}</h1>
                        <p className="text-xl text-white relative z-10">{pageData?.acf?.contact_text}</p>
                    </motion.div>
                    <div className={`${styles.form}`}>
                        <div className="mb-2">
                            {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : 
                            null}
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label className="block w-full mb-2" htmlFor="firstName">Ім'я</label>
                            <input className="block border focus:outline-none w-full mb-4 p-4" type="text" id="firstName" name="text-549" />

                            <label className="block w-full mb-2" htmlFor="phone">Телефон</label>
                            <input className="block border focus:outline-none w-full mb-4 p-4" type="tel" id="phone" name="tel-466" />

                            <label className="block w-full mb-2" htmlFor="email">Email</label>
                            <input className="block border focus:outline-none w-full mb-4 p-4" type="email" id="email" name="email" />

                            <label className="block w-full mb-2" htmlFor="message">Повідомлення</label>
                            <textarea className="block border focus:outline-none w-full mb-4 p-4" id="message" name="textarea-819"></textarea>
                            
                            <button className="inline-block bg-yellow focus:outline-none mt-4 p-3 hover:opacity-80 transition duration-300 ease-in-out rounded" type="submit">Надіслати</button>
                        </form>
                        
                    </div>
                </div>
                
            </section>
        </div>
        </>
        
    );
}

const SubmissionAlert = ({message, alertColor}) => {
    return (
        <div className={`${alertColor} mt-4 p-4 rounded text-white`}>
            {message}
        </div>
    );
};

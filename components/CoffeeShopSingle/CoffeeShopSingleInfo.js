'use client';

import styles from '../../styles/CoffeeShopSingle/CoffeeShopSingleInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCheck, faTimes, faMoneyBill, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { daysOfWeekTranslations } from '../../utils/translations';
import PhotoGallery from '../../components/CoffeeShopSingle/PhotoGallery';

export default function CoffeeShopSingleInfo({
    image,
    title,
    address,
    price,
    text,
    phone,
    schedule,
    photoGallery
}) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

        const isOpenNow = () => {
            const daysOfWeek = [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
            ];
            const now = new Date();
            const currentDay = daysOfWeek[now.getDay()];
            const currentTime = now.getHours() * 60 + now.getMinutes();
    
            const workingHours = schedule[currentDay];
    
            if (!workingHours) return false;
    
            const [start, end] = workingHours.split('–').map((time) => {
                const [hours, minutes] = time
                    .replace('AM', '')
                    .replace('PM', '')
                    .trim()
                    .split(':')
                    .map(Number);
    
                const totalMinutes = hours % 12 * 60 + (minutes || 0);
                return time.includes('PM') ? totalMinutes + 12 * 60 : totalMinutes;
            });
    
            return currentTime >= start && currentTime <= end;
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (!event.target.closest('.schedule-dropdown')) {
                    setIsDropdownOpen(false);
                }
            };
            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            }
        }, []);

    return (
        <section className={styles.banner}>
        <div className='container mx-auto'>
            <div className={`${styles.image}`}>
                <img src={image} alt={title} />
                <h1 className={`${styles.title} text-4xl text-white`}>{title}</h1>
            </div>
            <div className={`${styles.wrapper} mt-8 mb-10`}>
                <div className={`${styles.content}`}>
                <div className='mb-10'>
                    {text ? (
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    ) : (
                    ""
                    )
                }
                </div>

                <PhotoGallery photoGallery={photoGallery} />
                    
                </div>
                <div className={`${styles.aside}`}>
                <div className='bg-light-brown p-4'>
                {phone && (
                <p className='mb-1'>
                <FontAwesomeIcon icon={faPhone} className='text-white mr-2' />
                <a href={`tel:${phone}`} className='text-white hover:text-white/80 transition duration-300 ease-in-out'>
                    {phone}
                </a>
                </p> 
                )} 
                <p className='text-white flex align-middle flex-wrap mb-1'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
                Адреса:{" "}
                <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                >
                {address}
                </a>          
                </p>
                <p className='text-white flex items-center mb-1'>
                <FontAwesomeIcon icon={faMoneyBill} className='mr-2' />
                    Ціна: {price}
                </p>
                    <div className='relative'
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                         onMouseEnter={() => setIsDropdownOpen(true)}
                         onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <p className='schedule text-white flex items-center flex-wrap cursor-pointer'>
                        <FontAwesomeIcon
                        icon={isOpenNow() ? faCheck : faTimes}
                        className='mr-2'
                        />
                        {isOpenNow() ? 'Зараз відкрито' : 'Наразі закрито'}
                        <span className='font-semibold ml-2 schedule-dropdown'>Графік роботи</span>
                        </p>
                        {isDropdownOpen && (
                            <div className='absolute bg-white text-black shadow-lg mt-2 rounded-lg w-64 p-4'>
                                <ul>
                                {Object.entries(schedule).map(([day, hours]) => (
                                    <li key={day} className="py-1">
                                    <strong>{daysOfWeekTranslations[day]}:</strong> {hours}
                                    </li>
                                ))}           
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
    );
}

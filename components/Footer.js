"use client";

import { useEffect, useState } from 'react';
import { getMenu } from '../lib/api';
import Link from "next/link";
import axios from "axios";
import styles from '../styles/Footer.module.css';

export default function Footer() {

    const [menuData, setMenuData] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {

        const fetchLogo = async () => {
            try {
                const response = await axios.get('https://coffee-shop-wp.web-guild.pro/wp-json/custom/v1/site-logo');
                const data = response.data;
                setLogoUrl(data.logo_url);

            } catch (error) {
                console.error('Не удається отримати логотип', error);
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await getMenu('header-menu');
                setMenuData(response);
            } catch (error) {
                console.error('Меню не знайдено: ', error);
            }
        };

        fetchMenu();
        fetchLogo();

    }, []);

    return (
        <div className='bg-secondary py-8 mt-10'>
        <div className='container mx-auto'>
            <ul className='flex gap-2 sm:gap-4 justify-center flex-wrap'>
                {menuData.map((item) => (
                   <li key={item.ID}>
                    <Link 
                    href={item.slug === 'home' ? '/' : `/${item.slug}`}
                    className='text-lg text-white hover:opacity-75 transition duration-300 ease-in-out'
                    >
                    {item.title}
                   </Link>
               </li>
                ) )}
            </ul>
            <div className='mt-2'>
            {logoUrl && (
              <a href="/">
                <img src={logoUrl} alt="Logo" className='mx-auto'/>
              </a>
            )
            }
          </div>
        </div>
        </div>
    );
}
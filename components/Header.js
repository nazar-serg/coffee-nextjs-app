"use client";

import { useEffect, useState } from 'react';
import { getMenu } from '../lib/api';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Header.module.css';
import axios from "axios";

export default function Header() {

  const [logoUrl, setLogoUrl] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get('https://coffee-shop-wp.web-guild.pro/wp-json/custom/v1/site-logo');
        const data = response.data;
        setLogoUrl(data.logo_url);
      } catch(error) {
        console.error('Error fetching logo:', error);
      }
    };

    const fetchMenu = async () => {
      try {
        const data = await getMenu('header-menu');
        setMenuData(data);
      } catch(error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchLogo();
    fetchMenu();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [isMenuOpen]);

  return (
    <div>
      <header className='py-2'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
          <div>
            {logoUrl && (
              <a href="/">
                <img src={logoUrl} alt="Logo" />
              </a>
            )
            }
          </div>
          <div className='relative'>
            <button 
            className='p-2 bg-gray-200 raunded-md'
            onClick={() => setIsMenuOpen(true)}
            >
              <span className='block w-6 h-1 bg-black mb-1'></span>
              <span className='block w-6 h-1 bg-black mb-1'></span>
              <span className='block w-6 h-1 bg-black'></span>
            </button>
            <div
                className={`${styles.menu} fixed top-0 right-0 h-full md:w-1/3 w-4/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                  <button 
                  className='absolute top-4 right-4'
                  onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faClose} className='text-black text-4xl' />
                  </button>
          <nav className='flex justify-center items-center h-full'>
                <ul className='flex flex-col justify-center items-center text-center gap-3 h-full'>
                    {menuData.map((item) => (
                        <li key={item.ID}>
                            <Link 
                            href={item.slug === 'home' ? '/' : `/${item.slug}`}
                            className='text-4xl'
                            onClick={() => setIsMenuOpen(false)}
                            >
                            {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            </div>
            </div>
            </div>
        </div>
      </header>
    </div>
  )
}
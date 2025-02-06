'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/Home/ListCoffeeShops.module.css';
import { getProperties } from '../../lib/api';

export default function ListCoffeeShops(){
    const [properties, setProperties] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [areas, setAreas] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [hasMore, setHasMore] = useState(true);

       useEffect(() => {
          const fetchProperties = async () => {
            try {
              const data = await getProperties();
              //console.log('Полученные данные: ', data);
    
              if (Array.isArray(data) && data.length === 0) {
                console.log("Массив пуст");
              }
              setProperties(data);

              const uniqueAreas = Array.from(
                new Set(data.map((property) => property.acf?.area).filter(Boolean))
              );
              setAreas(uniqueAreas);
            } catch (error) {
              console.error('Ошибка при загрузке данных: ', error)
            }
          };
    
          fetchProperties();
        }, []);

        const filteredProperties = properties.filter((property) => {
            const area = property.acf?.area || '';
            const matchesArea = selectedAreas.length === 0 || selectedAreas.includes(area);
            const address = property.acf?.address || '';
            const matchesAddress = address.toLowerCase().includes(filter.toLowerCase());
            return matchesArea && matchesAddress;
          });

          const handleAreaChange = (e) => {
            const {value, checked} = e.target;
            setSelectedAreas((prevSelectedAreas) => {
              if (checked) {
                return [...prevSelectedAreas, value]
              } else {
                return prevSelectedAreas.filter((area) => area !== value);
              }
            });
          };

          const handleLoadMore = () => {
            const nextVisibleCount = visibleCount + 3;
            setVisibleCount(nextVisibleCount);

            if (nextVisibleCount >=filteredProperties.length) {
              setHasMore(false);
            }
          };

  return (
    <>
        <input 
        type="text"
        value={filter}
        className='form-input w-full max-w-lg p-3'

        placeholder='Введіть адресу'
        onChange={(e) => setFilter(e.target.value)}
        />

        <div className='mt-7'>
          <div className='mb-4 flex items-center gap-1 flex-wrap'>
            {areas.map((area) => (
              <label key={area} className='mr-4'>
                <input
                type="checkbox"
                value={area}
                onChange={handleAreaChange}
                checked={selectedAreas.includes(area)}
                className='form-checkbox h-5 w-5 text-light-brown'
                />
                <span className='ml-1'>{area}</span>
              </label>
            ))}
          </div>
        </div>
        <div className='all-caffee-list mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filteredProperties.slice(0, visibleCount).map((property) => (
            <div key={property.id} className={`${styles.item} flex flex-col h-full`}>
            <div className={styles.image}>
                <img src={property.acf.image} alt={property.title.rendered} />
            </div>
              <div className={styles.content}>
                <div className='mb-3'>
                    <h2 className='text-xl text-white'>{property.title.rendered}</h2>
                    <p className='text-white'>Адреса: {property.acf.address}</p>
                    <p className='text-white'>Ціна: {property.acf.price}</p>
                    </div>
                    <div className='mt-auto'>
                    <a href={`/coffee-shop/${property.slug}`} className='inline-block px-4 py-2 bg-white hover:bg-white/80 text-black rounded-lg transition duration-300 ease-in-out'>Докладніше</a>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        {visibleCount < filteredProperties.length && (
        <div className='text-center mt-8'>
          <button
            onClick={handleLoadMore}
            className='px-4 py-2 bg-yellow rounded-lg hover:opacity-80 transition duration-300 ease-in-out'
          >
            Завантажити ще
          </button>
        </div>
)}

    </>
  )
}


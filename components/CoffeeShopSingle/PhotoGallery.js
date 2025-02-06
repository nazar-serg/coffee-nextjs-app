import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import styles from '../../styles/CoffeeShopSingle/PhotoGallery.module.css';

const PhotoGallery = ({ photoGallery }) => {
  const hasPhotos = photoGallery && photoGallery.length > 0;

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <div className={styles.photogallery}>
        {hasPhotos && (
            <Swiper
        spaceBetween={25}
        slidesPerView={2}
        navigation={{
          nextEl: `.${styles.nextButton}`,
          prevEl: `.${styles.prevButton}`,
        }}
        modules={[Navigation]}
        pagination={{ clickable: true }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {photoGallery.map((photo, index) => (
          <SwiperSlide key={index}>
            <a 
            href={photo.image.url}
            data-fancybox="gallery"
            data-caption={photo.image.alt}
            >
            <img
              src={photo.image.url}
              alt={photo.image.alt}
            />
            </a>
           
          </SwiperSlide>
        ))}
      </Swiper>
        )}
      
      {hasPhotos && (
        <>
        <button className={styles.prevButton}>←</button>
        <button className={styles.nextButton}>→</button>
        </>
      )}
      
    </div>
  );
};

export default PhotoGallery;

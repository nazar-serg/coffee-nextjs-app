import axios from "axios";

const API_URL = 'https://coffee-shop-wp.web-guild.pro/wp-json/wp/v2';

export const getProperties = async () => {
    const response = await axios.get(`${API_URL}/coffee_shop`);
    return response.data;
};

export const getPropertiesBlog = async () => {
    try {
        const response = await axios.get(`${API_URL}/blog`);
        if (!Array.isArray(response.data)) {
            throw new Error('API не повернув масив даних');
        }
        //console.log('Response API', response);
        return response.data;
    } catch (error) {
        console.error('Помилка при запиті до API', error);
        return [];
    }
};

export const getPropertyBySlug = async (slug) => {
    const response = await axios.get(`${API_URL}/coffee_shop?slug=${slug}`);
    return response.data[0];
};

export const getPropertyBlogBySlug = async (slug) => {
    const response = await axios.get(`${API_URL}/blog?slug=${slug}`);
    return response.data[0];
};

export const getPageBySlug = async (slug) => {
    const apiUrl = `${API_URL}/pages?slug=${slug}`;

    try {
        const response = await axios.get(apiUrl);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        } else {
            console.error(`Страница с slug "${slug}" не найдена.`);
            return null;
        }
    } catch(error) {
        console.error('Ошибка при запросе к странице: ', error);
        return null;
    }
};

// Получаем меню
export async function getMenu(menuSlug) {
    try {
        const response = await axios.get(`https://coffee-shop-wp.web-guild.pro/wp-json/menus/v1/menus/${menuSlug}`);

        if (response.status !== 200) {
            throw new Error(`Не удалось загрузить меню: ${response.statusText}`);
        }
    
        const menuData = response.data;
    
        if (!menuData.items || !Array.isArray(menuData.items)) {
            throw new Error('Меню не содержит элементов');
        }
    
        return menuData.items;
    } catch (error) {
        console.error('Ошибка при загрузке меню: ', error);
    }
  
}



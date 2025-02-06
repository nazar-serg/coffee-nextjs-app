export const processFormData = (data) => {
    const { name, phone, email, message } = data;

    if (!name || !phone) {
        return { error: "Поле ім'я та телефон обов'язкові" };
    }

    if (name.length < 2) {
        return { error: "Ім'я має складатися не менше ніж з 2 символів" };
    }
    
    if (!/^\+?[0-9\s-()]+$/.test(phone)) {
        return { error: 'Недійсний номер телефону' };
    }
    
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //     return { error: 'Invalid email address' };
    // }
    
    // if (message.length < 10) {
    //     return { error: 'Message should be at least 10 characters long' };
    // }

    // Ваша логика обработки данных (например, сохранение в БД)
    console.log('Processed data:', data);

    return { success: true, message: 'Форма успішно надіслана!' };
};

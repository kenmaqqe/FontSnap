import axios from 'axios';

// Функція для конвертації файлу у Base64
const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

// Функція для надсилання запиту до API
export const identifyFont = async (file: File ) => {
    const apiKey = 'c201675bf87ff0d6f3acbf5837863f06aba1dce6caaedc4830443dd29b52aaed';
  try {
    // Конвертуємо файл у Base64
    const encodedFile = await convertFileToBase64(file);

    // Формуємо тіло запиту
    const data = {
      API_KEY: apiKey,
      urlimagebase64: encodedFile,
      IMAGEBASE64: '1',
      NOTTEXTBOXSDETECTION: '0',
      limit: '20', // Максимальна кількість результатів
    };

    // Виконуємо POST-запит
    const response = await axios.post('https://www.whatfontis.com/api2/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Повертаємо результат
  } catch (error) {
    console.error('Error identifying font:', error);
    throw error;
  }
};

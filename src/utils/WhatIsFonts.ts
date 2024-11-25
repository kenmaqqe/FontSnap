import axios from "axios";

/**
 * Converts a File or Blob to a Base64 encoded string
 * @param file File or Blob to convert
 * @returns Base64 encoded string
 */
export const convertFileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Converts a URL to a Blob
 * @param url URL of the image
 * @returns Blob representation of the image
 */
export const convertUrlToBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

/**
 * Identifies font from an image
 * @param img HTMLImageElement or image URL
 * @param apiKey API key for WhatFontIs service
 * @returns Font identification data
 */
export const identifyFont = async (
  img: HTMLImageElement | string, 
  apiKey: string = 'your-api-key'
): Promise<any> => {
  try {
    let file: Blob;

    if (typeof img === 'string') {
      file = await convertUrlToBlob(img);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      file = await new Promise<Blob>((resolve) => canvas.toBlob(resolve));
    }

    const encodedFile = await convertFileToBase64(file);

    const data = {
      API_KEY: apiKey,
      urlimagebase64: encodedFile,
      IMAGEBASE64: '1',
      NOTTEXTBOXSDETECTION: '0',
      limit: '20',
    };

    const response = await axios.post('https://www.whatfontis.com/api2/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error identifying font:', error);
    throw error;
  }
};
import CryptoJS from 'crypto-js';

// The encryption key should be stored in .env.local
// It should be a 32-byte (256-bit) key for AES-256
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY || '';

/**
 * Encrypts data using AES-256-CBC
 * @param data - The data to encrypt
 * @returns The encrypted data as a string
 */
export function encryptData(data: string): string {
  if (!data) return '';
  
  try {
    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Combine IV and encrypted data
    const result = iv.toString(CryptoJS.enc.Hex) + encrypted.toString();
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts data that was encrypted with AES-256-CBC
 * @param encryptedData - The encrypted data to decrypt
 * @returns The decrypted data as a string
 */
export function decryptData(encryptedData: string): string {
  if (!encryptedData) return '';
  
  try {
    // Extract IV (first 32 hex characters = 16 bytes)
    const iv = CryptoJS.enc.Hex.parse(encryptedData.substring(0, 32));
    
    // Extract encrypted data (everything after IV)
    const encrypted = encryptedData.substring(32);
    
    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Encrypts an object by converting it to JSON and encrypting
 * @param obj - The object to encrypt
 * @returns The encrypted object as a string
 */
export function encryptObject<T>(obj: T): string {
  const jsonStr = JSON.stringify(obj);
  return encryptData(jsonStr);
}

/**
 * Decrypts a string to an object
 * @param encryptedData - The encrypted data to decrypt
 * @returns The decrypted object
 */
export function decryptObject<T>(encryptedData: string): T {
  const jsonStr = decryptData(encryptedData);
  return JSON.parse(jsonStr) as T;
}
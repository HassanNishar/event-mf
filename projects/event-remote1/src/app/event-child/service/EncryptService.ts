//EncryptService.ts
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

export const securityKey = environment.encryptKey;

export const userEncrypt = (data: any) => {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, securityKey).toString();
    return encryptedData;
};

export const userDecrypt = (data: any) => {
    if (data !== undefined && data !== null) {
        const bytes = CryptoJS.AES.decrypt(data, securityKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(bytes);
    }
    return null;
};
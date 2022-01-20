/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import CryptoJS from 'crypto-js';
import hash256 from 'hash.js';
import secp256k1 from 'secp256k1';
export const SymmetricEncrypt = (data: any, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const SymmetricDecrypt = (
  cipherText: string | CryptoJS.lib.CipherParams,
  key: string | CryptoJS.lib.WordArray
): string | null => {
  try {
    const cipher: any = CryptoJS.AES.decrypt(cipherText, key);
    return cipher?.toString(CryptoJS.enc.Utf8);
  } catch (err: any) {
    return null;
  }
};

export const GenerateKeyPair = (
  privateKey: string | null
): { publicKey: string; privateKey: string } => {
  let pK: Uint8Array;
  if (privateKey && typeof privateKey == 'string') {
    pK = convertStringToByteArray(privateKey);
  } else {
    do {
      pK = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(pK));
  }
  const publicKey: ArrayBuffer = secp256k1.publicKeyCreate(pK);
  return {
    privateKey: convertArrayBufferToString(pK),
    publicKey: convertArrayBufferToString(publicKey),
  };
};

export const GenerateKeyPairAndEncrypt = (
  password: string
): { publicKey: string; privateKey: string; encryptedPrivateKey: string } => {
  const { privateKey, publicKey } = GenerateKeyPair(null);
  const encryptedPrivateKey = SymmetricEncrypt(privateKey, password);
  return { publicKey, privateKey, encryptedPrivateKey };
};

export const SignMessage = (privateKey: string, message: any) => {
  try {
    const signature = secp256k1.ecdsaSign(
      convertMessage(message),
      convertStringToByteArray(privateKey)
    );
    return convertArrayBufferToString(signature.signature);
  } catch (err) {
    console.log(err);
  }
};

export const convertMessage = (obj: any): Uint8Array => {
  const jsonString = JSON.stringify(obj);
  const hashBytes = hash256.sha256().update(jsonString).digest();
  return Uint8Array.from(hashBytes);
};

export const convertArrayBufferToString = (
  arrayBuffer: ArrayBuffer
): string => {
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(arrayBuffer))
  );
  return base64String;
};

export const convertStringToByteArray = (base64_string: string): Uint8Array => {
  return Uint8Array.from(atob(base64_string), (c) => c.charCodeAt(0));
};

export const GenerateCertificate = (certificateInfo: any, privateKey: any) => {
  const keyPair = GenerateKeyPair(privateKey);
  const signature = SignMessage(privateKey, certificateInfo);
  return { signature, certificateInfo, publicKey: keyPair.publicKey };
};

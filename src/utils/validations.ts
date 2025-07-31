
// src/utils/validations.ts

// Solo letras (incluye acentos y espacios)
export const isOnlyLetters = (value: string): boolean => {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
};

// Solo números
export const isOnlyNumbers = (value: string): boolean => {
  return /^[0-9]+$/.test(value);
};

// Email válido
export const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

// Teléfono válido (ejemplo para 10 dígitos)
export const isValidPhone = (value: string | undefined): boolean => {
  if (!value) return false;
  return /^\d{10}$/.test(value);
};

// Contraseña segura (mínimo 8 caracteres, una mayúscula, una minúscula, un número, un símbolo)
export const isStrongPassword = (value: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
};

// Letras y números (sin símbolos)
export const isLettersAndNumbers = (value: string): boolean => {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+$/.test(value);
};

// Input vacío
export const isEmpty = (value: string | undefined): boolean => {
  return !value || value.trim().length === 0;
};
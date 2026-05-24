export const isWithinLength = (value = '', min, max) => {
  const length = value.trim().length;

  if (min != null && max != null) {
    return length >= min && length <= max;
  }

  if (min != null) {
    return length >= min;
  }

  if (max != null) {
    return length <= max;
  }

  return true; // إذا ما انحدد أي شرط
};
export const isArabicOnly = (value = '') => {
  return /^[\u0600-\u06FF\s]+$/.test(value.trim());
};
// عادي اذا فيها ارقام ورموز
export const containsOnlyArabicLetters = (value = '') => {
  return !/[A-Za-z]/.test(value) && /[\u0600-\u06FF]/.test(value);
};

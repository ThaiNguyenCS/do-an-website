
function formatPrice(value, locale = 'vi-VN') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // No decimal places for VND
      maximumFractionDigits: 0,
    }).format(value);
  }

export {formatPrice};
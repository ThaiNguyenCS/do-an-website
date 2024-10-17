function formatPrice(value, locale = "vi-VN") {
    if (value) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0, // No decimal places for VND
            maximumFractionDigits: 0,
        }).format(value);
    }
    return ""
}

export { formatPrice };

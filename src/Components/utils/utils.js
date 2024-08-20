// utils/romanNumerals.js
export const toRoman = (num) => {
    if (num <= 0) return '';

    const lookup = {
        M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
    };

    let roman = '';
    for (const i in lookup) {
        const q = Math.floor(num / lookup[i]);
        num -= q * lookup[i];
        roman += i.repeat(q);
    }

    // Handle subtractive combinations
    const subtractive = [
        { numeral: 'CM', value: 900 },
        { numeral: 'CD', value: 400 },
        { numeral: 'XC', value: 90 },
        { numeral: 'XL', value: 40 },
        { numeral: 'IX', value: 9 },
        { numeral: 'IV', value: 4 }
    ];

    for (const { numeral, value } of subtractive) {
        if (num >= value) {
            roman += numeral;
            num -= value;
        }
    }

    return roman;
};

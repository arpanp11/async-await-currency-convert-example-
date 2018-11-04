//http://data.fixer.io/api/latest?access_key=93d6d5044e180882b1f52b7585c5cf93

const axios = require('axios');


//async await 
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=93d6d5044e180882b1f52b7585c5cf93');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchnage rate for ${from} and ${to}`);
    }
};

//without using async await
// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=93d6d5044e180882b1f52b7585c5cf93').then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];

//         return rate;
//     });
// };

//async await 
const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

//without using async await
// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

//async await
const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

//without using asysnc await 
// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//    return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         console.log(convertedAmount);
//         return getCountries(to);
//     }).then((countries) => {
//         console.log(countries);
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
//     });
// };

convertCurrency('USD', 'INR', 20).then((message) => {
    console.log(message);
});

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// });

// getCountries('EUR').then((countries) => {
//     console.log(countries);
// });
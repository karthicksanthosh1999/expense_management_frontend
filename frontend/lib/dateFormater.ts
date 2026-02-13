export const ISOToIndianDateFormate = (date: string): string => {
    const convertedString = new Date(date);
    let day = convertedString.getDay();
    let month = convertedString.getMonth() + 1;
    let year = convertedString.getFullYear();

    return `${year}-${month}-${day}`
}
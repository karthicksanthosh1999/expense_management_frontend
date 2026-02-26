export const rupeesConverter = (amount: string | number) => {
    const numericValue = Number(amount);

    if (isNaN(numericValue)) return "₹ --,---";

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(numericValue);
};

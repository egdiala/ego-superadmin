export const pascalCaseToWords = (pascalCaseString: string): string => {
    return pascalCaseString.replace(/([A-Z])/g, " $1").trim();
}

export const formattedNumber = (number: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0, // Optional: remove decimals if you don't want cents
    }).format(number);
}
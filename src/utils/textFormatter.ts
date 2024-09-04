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

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        const hoursText = `${hours}hr${hours !== 1 ? "s" : ""}`;
        const minutesText = `${minutes}min${minutes !== 1 ? "s" : ""}`;
        return `${hoursText} : ${minutesText}`;
    } else {
        const minutesText = `${minutes}min${minutes !== 1 ? "s" : ""}`;
        return minutesText;
    }
}
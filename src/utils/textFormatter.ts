export const pascalCaseToWords = (pascalCaseString: string): string => {
    return pascalCaseString.replace(/([A-Z])/g, " $1").trim();
}

export const formattedNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        ...options
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

export const splitAddress = (address: string) => {
  // Split the string by commas
  const addressParts = address.split(",").map(part => part.trim());
  
  // The first element should be the first part of the address
  const firstElement = addressParts[0];
  
  // The last element should contain the last two parts joined by a comma
  const lastElement = addressParts.slice(-2).join(", ");
  
  // The middle element should contain everything between the first and last two parts
  const middleElement = addressParts.slice(1, -2).join(", ");

  return [firstElement, middleElement, lastElement];
}

export const removeEmptyArrays = <T>(obj: Record<string, any>) => {
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeEmptyArrays(obj[key]);
    }
  });
  return obj as T;
}
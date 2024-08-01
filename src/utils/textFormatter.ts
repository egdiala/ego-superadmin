export const pascalCaseToWords = (pascalCaseString: string): string => {
    return pascalCaseString.replace(/([A-Z])/g, " $1").trim();
}
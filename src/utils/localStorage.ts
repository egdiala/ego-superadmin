/**
 * Gets an item from the browsers localStorage
 * @param storageKey - String for the item key
 * @returns The item from localStorage
 */
export function getItem(storageKey: string) {
    return localStorage.getItem(storageKey)
}

/**
 * Sets an item to the browsers localStorage
 * @param key - Key for the item
 * @param value - Value to be set
 * @returns 
 */
export function setItem(key: string, value: any) {
    return localStorage.setItem(key, value)
}
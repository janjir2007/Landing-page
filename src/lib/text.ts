/** Split on whitespace, dropping empties. */
export const splitWords = (text: string) => text.split(/\s+/).filter(Boolean);

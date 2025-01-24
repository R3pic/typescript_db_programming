export function formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split('T')[0];
};

export function formatStringToIndexTitle(index: number, title: string): string {
    const formattedIndex = index.toString().padStart(2, '0');
    return `${formattedIndex}. \x1b[32m${title}\x1b[0m`;
}
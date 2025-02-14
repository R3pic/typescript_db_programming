import { networkInterfaces } from "node:os";

export function formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split('T')[0];
};

export function formatStringToIndexTitle(index: number, title: string): string {
    const formattedIndex = index.toString().padStart(2, '0');
    return `${formattedIndex}. \x1b[32m${title}\x1b[0m`;
}

export function getLocalAddress(): string | null {
    const nets = networkInterfaces();

    for (const infos of Object.values(nets)) {
        if (infos) {
            let localIPAddress;
            infos.forEach((info) => {
                if (info.family === 'IPv4' && info.address.startsWith('192.168')) {
                    localIPAddress = info.address;
                }
            })

            if (localIPAddress) {
                return localIPAddress;
            }
        }
    }

    return null;
}
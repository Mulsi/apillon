import { BucketType } from "~/models/Buckets";

export function stripBase64Type(base64: string) {
    return base64.split(',')[1];
}

export function getBucketType(type: BucketType) {
    switch (type) {
        case BucketType.STORAGE:
            return "Storage bucket";
        case BucketType.WEBSITE:
            return "Website bucket";
        case BucketType.NFT:
            return "NFT bucket";
    }
}

export function formatByteSize(sizeInBytes: number): string {
    const kilobytes = sizeInBytes / 1024;
    const formattedSize = kilobytes.toFixed(2);
    return `${formattedSize} KB`;
}

export function fileStatus(status: number) {
    switch (status) {
        case 3:
            return "Upload completed";
    }
}
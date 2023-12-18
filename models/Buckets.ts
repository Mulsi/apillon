export const storageColumns = [
    {
        type: 'selection',
        key: 'selection',
        fixed: 'left'
    },
    {
        title: 'Bucket name',
        key: 'name',
    },
    {
        title: 'Bucket type',
        key: 'type',
    },
    {
        title: 'Bucket uuid',
        key: 'uuid',
    },
    {
        title: 'Storage usage',
        key: 'usage',
    },
    {
        title: 'Description',
        key: 'description',
    }
]

export const storageDetailColumns = [
    {
        title: 'File name',
        key: 'name',
    },
    {
        title: 'File status',
        key: 'status',
    }, {
        title: 'File CID',
        key: 'cid',
    }, {
        title: 'Content type',
        key: 'contentType',
    }
]

export enum BucketType {
    STORAGE = 1,
    WEBSITE = 2,
    NFT = 3
}

export interface Bucket {
    name: string,
    bucketType: BucketType,
    bucketUuid: string,
    description: string
    size: number,
}
<template>
    <div class="mx-8 mt-16">
        <div class="pb-8 border-b border-[#313442]">
            <h1>Storage</h1>
        </div>
        <div class="mt-8">
            <ClientOnly>
                <n-data-table :columns="storageColumns" :data="tableData" :row-key="rowKey" :loading="loading"
                    :row-props="rowProps" />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatByteSize, getBucketType } from '@/utils/helpers'
import { NDataTable } from 'naive-ui'
import { storageColumns } from '@/models/Buckets'
import type { Bucket } from '@/models/Buckets'

type rowData = {
    name: string,
    type: string,
    uuid: string,
    usage: string,
    description: string
}

const dataLength = ref(0)
const storageData = ref()
const loading = ref<Boolean>(true)
let tableData: rowData[] = []


onMounted(async () => {
    const { data } = await useCustomFetch('/storage/buckets');

    if (data.value) {
        const items = data.value.data?.items || [];
        const total = data.value.data?.total || 0;

        storageData.value = data.value;
        storageData.value.data.items.reverse()
        dataLength.value = total;

        tableData = items.map((item: Bucket) => ({
            name: item.name,
            type: getBucketType(item.bucketType),
            uuid: item.bucketUuid,
            usage: formatByteSize(item.size),
            description: item.description
        }));

        loading.value = false;
    }
});


const rowKey = (row: rowData) => row.uuid

const rowProps = (row: rowData) => {
    const router = useRouter();
    return {
        style: {
            cursor: 'pointer'
        },
        onClick: () => {
            router.push(`/storage/${row.uuid}`)
        }
    }
}

</script>

<style lang="css">
th,
td {
    background-color: rgb(20 22 35) !important;
    color: #d2d4bf !important;
    border: 1px solid #313442 !important;
}

.n-data-table.n-data-table--bordered .n-data-table-wrapper {
    border: none !important;
}
</style>
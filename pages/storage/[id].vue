<template>
    <div class="mx-8 mt-16">
        <div v-if="bucketInfo" class="flex flex-col">
            <div class="flex items-center gap-4 pb-8">
                <NuxtLink to="/storage">
                    <Icon name="majesticons:arrow-left" color="white" class="w-6 h-6" />
                </NuxtLink>
                <h1>{{ bucketInfo.name }}</h1>
                <p class="max-w-[100px] line-clamp-1 text-[#9d9e91]">{{ bucketInfo.bucketUuid }}</p>
            </div>
            <div>
                <n-card style="margin-bottom: 16px" pane-style="color-black">
                    <n-tabs type="line" animated>
                        <n-tab-pane name="files" tab="Files">
                            <div class="text-white">
                                <n-upload multiple directory-dnd :data="onFinish" :max="5">
                                    <n-skeleton v-if="loading" text :height="500" :width="500" size="large" />
                                    <n-upload-dragger v-else class="flex flex-col justify-center w-full">
                                        <div style="margin-bottom: 12px">
                                            <Icon name="material-symbols-light:upload-file-outline" color="#ab9df2"
                                                class="w-10 h-10" />
                                        </div>
                                        <n-text style="font-size: 16px">
                                            Upload files and folders
                                        </n-text>
                                        <n-p depth="3" style="margin: 8px 0 0 0">
                                            Drag & drop or click to upload files
                                        </n-p>
                                    </n-upload-dragger>
                                </n-upload>
                            </div>
                        </n-tab-pane>
                        <n-tab-pane name="allFiles" tab="All Files">
                            <div class="text-white">
                                <ClientOnly>
                                    <n-data-table :columns="storageDetailColumns" :data="tableData" :row-key="rowKey"
                                        :loading="loading" />
                                </ClientOnly>
                            </div>
                        </n-tab-pane>
                    </n-tabs>
                </n-card>
            </div>
            <div v-if="openConfirmModal" class="absolute bottom-0 right-0 w-96 h-60 bg-[#141621] border border-[#313442]">
                <n-card class="h-full" title="Confirm your upload" closable @close="handleClose">
                    <div class="flex flex-col h-full justify-between">
                        <div v-if="uploadedFile">
                            <div class="p-3 border-b border-[#313442]">
                                <p>{{ uploadedFile.name }}</p>
                            </div>
                            <div v-if="cardText.length > 0" class="p-3">
                                <p class="text-[#f9fe74]">{{ cardText }}</p>
                            </div>
                        </div>
                        <n-button @click="uploadFile">
                            Upload now
                        </n-button>
                    </div>
                </n-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useCustomFetch from '../../composables/useCustomFetch'
import { NTabs, NTabPane, NUpload, NUploadDragger, NP, NText, NCard, NDataTable, NSkeleton, type UploadFileInfo, NButton, uploadDark } from 'naive-ui'
import { storageDetailColumns } from '@/models/Buckets'
import { fileStatus } from '@/utils/helpers'

const loading = ref<Boolean>(true)
const openConfirmModal = ref<Boolean>(false)
const bucketInfo = ref()
const bucketDetail = ref()
const files = ref()
const uploadedFile = ref();
let tableData: any[] = []
const id = ref('');
const cardText = ref<String>('')

onMounted(async () => {
    const route = await useRoute()
    id.value = route.params.id as string;
    Promise.all([getBucketInfo(), getBucketDetails(), listFiles()]).then(() => {
        loading.value = false
    }).catch((err) => {
        throw err
    })
})

const rowKey = (row: any) => row.cid

const getBucketInfo = async () => {
    const { data } = await useCustomFetch('/storage/buckets');
    if (data.value) {
        // bucketInfo.value = data.value
        bucketInfo.value = data?.value?.data?.items?.find((item: any) => item.bucketUuid === id.value)
    }
}

const getBucketDetails = async () => {
    const { data } = await useCustomFetch(`/storage/buckets/${id.value}/content`, {
        onResponse: () => {
            bucketDetail.value = data.value
        }
    })
}

const listFiles = async () => {
    const { data } = await useCustomFetch(`/storage/buckets/${id.value}/files`)
    if (data.value) {
        files.value = data.value
        tableData = files.value.data.items.map((item: any) => ({
            name: item.name,
            status: fileStatus(item.fileStatus),
            cid: item.CID,
            contentType: item.contentType,
        }))
    }
}

const onFinish = ({ file }: {
    file: UploadFileInfo,
}) => {
    uploadedFile.value = file
    openConfirmModal.value = true;
}

const uploadFile = async () => {
    console.log(uploadedFile.value)
    const uploadData = {
        files: [
            {
                contentType: uploadedFile.value.type,
                fileName: uploadedFile.value.name,
                path: ''
            }
        ]
    }
    const { data } = await useCustomFetch(`/storage/buckets/${id.value}/upload`, {
        method: 'POST',
        body: uploadData,
        onRequest: () => {
            cardText.value = 'Uploading...'
        },
        onResponse: (res) => {
            endUploadSession(res.response._data);
        }
    })
}

const endUploadSession = async (payload: any) => {
    const sessionUuid = payload?.data?.sessionUuid || '';
    const { data } = await useCustomFetch(`/storage/buckets/${id.value}/upload/${sessionUuid}/end`, {
        method: 'POST',
        onResponse: (res) => {
            if (res.response.status === 404) {
                cardText.value = `Napaka: ${res.response._data.message}`;
            } else {
                cardText.value = 'Suceessfully uploaded!';
                listFiles();
                openConfirmModal.value = false;
            }
        }
    })
}

const handleClose = () => {
    openConfirmModal.value = false;
}

</script>

<style lang="css">
.n-tabs .n-tabs-nav.n-tabs-nav--line-type.n-tabs-nav--top .n-tabs-nav-scroll-content {
    border-bottom: 1px solid #313442 !important;
}

span.n-tabs-tab__label {
    color: #d4d5c2 !important
}

span.n-text {
    color: #ab9df2 !important;
    font-weight: bold;
}

.n-upload-dragger {
    height: calc(100dvh - 370px);
}

.n-card-header__main {
    color: white !important;
}

button.n-button.n-button--default-type.n-button--medium-type {
    background-color: #F9FF73 !important;
    border: 1px solid #F9FF73 !important;
    height: 48px !important;
}
</style>
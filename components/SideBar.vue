<template>
    <div class="flex flex-col items-center w-[320px] h-screen border-r border-[#313442] border-solid">
        <div class="flex items-center h-20 w-full px-8">
            <NuxtLink to="/">
                <NuxtImg src="/apillon.png" alt="Logo" class="h-5" />
            </NuxtLink>

        </div>
        <div class="w-full p-8">
            <div>
                <p class="text-[#ab9df2] text-sm mb-2">Services</p>
            </div>
            <div>
                <div class="flex items-center gap-4 h-12">
                    <Icon name="carbon:file-storage" color="white" />
                    <NuxtLink to="/storage">Storage</NuxtLink>
                </div>
                <div class="flex items-center gap-4 h-12">
                    <Icon name="carbon:file-storage" color="white" />
                    <NuxtLink to="/hosting">Hosting</NuxtLink>
                </div>
                <div class="flex items-center gap-4 h-12">
                    <Icon name="carbon:file-storage" color="white" />
                    <NuxtLink to="/nft">NFTs</NuxtLink>
                </div>
                <div class="flex items-center gap-4 h-12">
                    <Icon name="carbon:file-storage" color="white" />
                    <NuxtLink to="/auth">Authentication</NuxtLink>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="css"></style>
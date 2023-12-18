<template>
    <div class="flex flex-auto">
        <div>
            <SideBar />
        </div>
        <div class="w-full">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="css">
body {
    background-color: #141722;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
    font-family: 'IBM Plex Sans', sans-serif;
    color: #f0f2da;
}

h1 {
    font-size: 1.75rem;
    line-height: 1.43;
    font-weight: 700;
}
</style>
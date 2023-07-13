<template>
    <div class="bg-backgroundPrimary">
        <Header/>
        <div class="h-screen p-6 text-white">
            <slot/>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Header.vue'

</script>
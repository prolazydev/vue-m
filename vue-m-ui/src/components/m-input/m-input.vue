<template>
    <div class="m-input-main">
        <label v-if="label" :for="id || label" class="text-mds">{{ label }}</label>
        <div class="m-input-content">
            <input :class="{ 'pl-10 placeholder-position': dynamicSVG(icon) }" :placeholder="placeholder" class="m-input" type="text" :name="id" :id="id || label" />

            <span v-if="dynamicSVG(icon)" class="m-input-border"></span>
            <component v-if="dynamicSVG(icon)" :is="dynamicSVG(icon)"></component>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { dynamicSVG } from '@/utils';

onMounted(() => {
    if (inputProps.type === 'email') {
        // TODO: Start email validation

    }
});

const inputProps = defineProps({
    label: {
        type: String,
    },
    placeholder: {
        type: String,
        required: false,
    },
    id: {
        type: String,
    },
    icon: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'text',
    },
    // TODO: autoFocusing
});
</script>

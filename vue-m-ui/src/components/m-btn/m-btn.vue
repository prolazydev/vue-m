<template>
    <button ref="mBtn" :disabled="handleLoadingState || (disabled as boolean)" :class="[ 'm-btn', 
        handleCustomColors, handleColor, handleSize, handleShape, handleTransparency, handleTextColor,
    ]">
        <div :class="{ 'm-loading': handleLoadingState  }" class="m-btn-content">
            <template v-if="props.text"> {{ props.text }} </template>
            <slot v-else />
        </div>

        <template v-if="handleLoadingState">
            <component v-if="dynamicSVG(loadingIcon)" :is="dynamicSVG(loadingIcon)"></component>
        </template>
    </button>
</template>

<script lang="ts" setup>
import { StyleValue, computed, ref } from 'vue';
import { createLighterShades, dynamicSVG } from '@/utils';
import { btnSizes, btnColors } from './props';
import { shapes, textColors } from '@/common';

const mBtn = ref<HTMLButtonElement | null>(null);

// TODO: Add tab tab-indexing
const props = defineProps({
    text: {
        type: String,
    },
    color: {
        type: String,
        default: 'default',
    },
    size: {
        type: String,
        default: 'md',
    },
    textColor: {
        type: String,
        default: 'default',
    },
    disabled: {
        type: [ Boolean, String ],
        default: false,
    },
    loading: {
        type: [ Boolean, String ],
        default: false,
    },
    loadingIcon: {
        type: String,
        default: 'loading-circle'
    },
    shape: {
        type: String,
        default: 'default'
    },
    transparent: {
        type: Boolean,
        default: false
    },
});

// Prop Handling
const handleTextColor = computed<string>(() => {
    mBtn.value?.style.removeProperty('--m-btn-text-color');

    if (!props.textColor)
        return '';
    if (props.textColor.startsWith('#') || props.textColor.startsWith('rgb')) 
        return mBtn.value?.style.setProperty('--m-btn-text-color', props.textColor);
    return (textColors as any)[ props.textColor ];
});

const handleColor = computed<string | StyleValue>(() => {
    mBtn.value?.style.removeProperty('--m-btn-bg-color');
    mBtn.value?.style.removeProperty('--m-btn-bg-color-hover');
    mBtn.value?.style.removeProperty('--m-btn-bg-color-active');
    
    if (!props.color)
        return btnColors.default + ' ' + btnSizes.md;
    if (props.color.startsWith('#') || props.color.startsWith('rgb')) {
        const shades = createLighterShades(props.color);

        mBtn.value?.style.setProperty('--m-btn-bg-color', props.color);
        mBtn.value?.style.setProperty('--m-btn-bg-color-hover', shades[ 0 ]);
        mBtn.value?.style.setProperty('--m-btn-bg-color-active', shades[ 1 ]);
        return;
    }
    return (btnColors as any)[ props.color ];
});

const handleCustomColors = computed<string | void>(() => {
    if (props.color.startsWith('#') || props.color.startsWith('rgb') || props.textColor.startsWith('#') || props.textColor.startsWith('rgb'))
        return 'm-btn-custom-colors';
});

const handleSize = computed(() => {
    if (!props.size)
        return btnSizes.md;
    return (btnSizes as any)[ props.size ];
});

const handleShape = computed(() => {
    if (!props.shape)
        return shapes.default;
    return (shapes as any)[ props.shape ];
});

const handleLoadingState = computed(() => {
    if (typeof props.loading === 'string' && props.loading == 'false')
        return false;
    return Boolean(props.loading);
});

const handleTransparency = computed(() => {
    if (typeof props.transparent === 'string' && props.transparent == 'false')
        return false;
    if (Boolean(props.transparent))
        return 'm-btn-transparent';
});

</script>

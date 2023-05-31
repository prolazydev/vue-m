<template>
    <div>
        <button ref="mBtn" id="myCustomBtn" color=""
            :class="[ !isCustomColor ? handleColor : 'm-btn', handleSize, handleShape, handleTransparency, handleTextColor ]"
            :style="isCustomColor ? (handleColor as StyleValue) : ''" :disabled="handleLoadingState || (disabled as boolean)">
            <div :class="{ 'm-loading': handleLoadingState }" class="m-btn-content">
                <template v-if="props.text"> {{ props.text }} </template>
                <slot v-else />
            </div>

            <template v-if="handleLoadingState">
                <component v-if="dynamicSVG(loadingIcon)" :is="dynamicSVG(loadingIcon)"></component>
            </template>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ComputedRef, StyleValue, computed, ref } from 'vue';
import { createLighterShades, dynamicSVG } from '@/utils';
import { btnSizes, btnColors } from './props';
import { shapes, textColors } from '@/common';

const mBtn = ref<HTMLButtonElement | null>(null);
const shades = ref<string[]>([]);
const mousedown = ref(false);

const props = defineProps({
    text: {
        type: String,
    },
    /**
    * Style of button (optional)
    * @values default, primary, secondary, danger, warning, info and simple
    */
    color: {
        type: String,
        default: 'default',
    },
    /**
    * Size of button (optional)
    * @values sm, md, lg
    */
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
const handleTextColor: ComputedRef<String> = computed(() => {
    if (!props.textColor)
        return '';
    return (textColors as any)[ props.textColor ];
});

const handleColor: ComputedRef<StyleValue | String[] | String | undefined> = computed(() => {
    removeEventListeners();
    if (!props.color)
        return btnColors.default + ' ' + btnSizes.md;
    if (props.color.startsWith('#') || props.color.startsWith('rgb') || props.color.startsWith('rgba')) {
        shades.value = createLighterShades(props.color);
        addEventListeners();
        return { backgroundColor: props.color };
    }
    return (btnColors as any)[ props.color ];
});

function removeEventListeners() {
    mBtn.value?.removeEventListener('mouseenter', onMouseEnter);
    mBtn.value?.removeEventListener('mouseleave', onMouseLeave);
    mBtn.value?.removeEventListener('mousedown', onMouseDown);
    mBtn.value?.removeEventListener('mouseup', onMouseUp);
    mBtn.value?.removeEventListener('focusin', onFocusIn);
    mBtn.value?.removeEventListener('blur', onBlur);
}
function addEventListeners() {
    mBtn.value?.addEventListener('mouseenter', onMouseEnter);
    mBtn.value?.addEventListener('mouseleave', onMouseLeave);

    mBtn.value?.addEventListener('mousedown', onMouseDown);
    mBtn.value?.addEventListener('mouseup', onMouseUp);

    mBtn.value?.addEventListener('focusin', onFocusIn);
    mBtn.value?.addEventListener('blur', onBlur);
}
const onMouseEnter = () => mBtn.value!.style.backgroundColor = shades.value[ 0 ];
const onMouseLeave = () => mBtn.value!.style.backgroundColor = props.color;
const onMouseDown = () => mBtn.value!.style.backgroundColor = shades.value[ 1 ]; mousedown.value = true;
const onMouseUp = () => mBtn.value!.style.backgroundColor = shades.value[ 0 ];
const onFocusIn = () => {
    if (!mousedown.value)
        mBtn.value!.style.boxShadow = `0px 0px 0px white, 0px 0px 0px 1.5px ${props.color}`;
    mousedown.value = false;
};
const onBlur = () => mBtn.value!.style.boxShadow = ''; mousedown.value = false;

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

const isCustomColor: ComputedRef<boolean> = computed(() => {
    if (typeof handleColor.value == 'string')
        return false;

    return typeof handleColor.value == 'object'
        && (handleColor as any).value?.backgroundColor?.startsWith('#')
        || (handleColor as any).value?.backgroundColor?.startsWith('rgb');
})

</script>

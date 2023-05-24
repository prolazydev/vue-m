<template>
    <div>
        <button ref="mBtn" id="myCustomBtn"
            :class="[ !isCustomColor ? handleBtnColor : 'm-btn', handleBtnSize, handleBtnShape, handleBtnTransparency, handleBtnTextColor ]"
            :style="[ [ isCustomColor ? (handleBtnColor as StyleValue) : '', customColorTest! ], ]"
            :disabled="handleBtnLoadingState">
            <div :class="{ 'm-loading': handleBtnLoadingState }" class="m-btn-content">
                <template v-if="btnProps.text">
                    {{ btnProps.text }}
                </template>
                <slot v-else />
            </div>

            <template v-if="handleBtnLoadingState">
                <component v-if="dynamicSVG(loadingIcon)" :is="dynamicSVG(loadingIcon)"></component>
            </template>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ComputedRef, StyleValue, computed, ref, watch } from 'vue';
import { dynamicSVG } from '@/utils';
import { btnSizes, btnStyles, btnShapes, btnColors, createLighterShades } from './props';

const mBtn = ref<HTMLButtonElement | null>(null);
const shades = ref<string[]>([]);
const customColorTest = ref<StyleValue>();
const mousedown = ref(false);

watch(mousedown, () => {
    console.log('watch: ', mousedown.value);
});

const btnProps = defineProps({
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
const handleBtnTextColor: ComputedRef<String> = computed(() => {
    if (!btnProps.textColor)
        return '';
    return (btnColors as any)[ btnProps.textColor ];
});

const handleBtnColor: ComputedRef<StyleValue | String[] | String | undefined> = computed(() => {
    if (!btnProps.color)
        return btnStyles.default + ' ' + btnSizes.md;
    if (btnProps.color.startsWith('#') || btnProps.color.startsWith('rgb') || btnProps.color.startsWith('rgba')) {
        shades.value = createLighterShades(btnProps.color);

        mBtn.value?.addEventListener('mouseenter', () => mBtn.value!.style.backgroundColor = shades.value[ 0 ]);
        mBtn.value?.addEventListener('mouseleave', () => mBtn.value!.style.backgroundColor = btnProps.color);

        mBtn.value?.addEventListener('mousedown', () => mBtn.value!.style.backgroundColor = shades.value[ 1 ]);
        mBtn.value?.addEventListener('mouseup', () => mBtn.value!.style.backgroundColor = shades.value[ 0 ]);

        mBtn.value?.addEventListener('focusin', () => {
            if (!mousedown.value)
                mBtn.value!.style.boxShadow = `0px 0px 0px white, 0px 0px 0px 1.5px ${btnProps.color}`;
            mousedown.value = false;
        });
        mBtn.value?.addEventListener('blur', () => { mBtn.value!.style.boxShadow = ''; mousedown.value = false; });

        return { backgroundColor: btnProps.color };
    }
    return (btnStyles as any)[ btnProps.color ];
});

const handleBtnSize = computed(() => (btnSizes as any)[ btnProps.size ]);

const handleBtnLoadingState = computed(() => {
    if (typeof btnProps.loading === 'string' && btnProps.loading == 'false')
        return false;
    return Boolean(btnProps.loading);
});

const handleBtnShape = computed(() => {
    if (!btnProps.shape)
        return btnShapes.default;
    return (btnShapes as any)[ btnProps.shape ];
});

const handleBtnTransparency = computed(() => {
    if (typeof btnProps.transparent === 'string' && btnProps.transparent == 'false')
        return false;
    if (Boolean(btnProps.transparent))
        return 'm-btn-transparent';
});

const isCustomColor: ComputedRef<boolean> = computed(() => {
    if (typeof handleBtnColor.value == 'string')
        return false;
    const test: string = 'test';

    return typeof handleBtnColor.value == 'object' && (handleBtnColor as any).value?.backgroundColor?.startsWith('#') || (handleBtnColor as any).value?.backgroundColor?.startsWith('#') || (handleBtnColor as any).value?.backgroundColor?.startsWith('rgb');
})

</script>

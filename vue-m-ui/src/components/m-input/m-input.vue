<template>
    <div    class="m-input-main" 
            :class="[ { 'm-loading': handleLoadingState }, { 'm-text-bold': handleBoldText } ]">
        <label v-if="label" :for="id || label" class="m-input-label" :class="[ handleLabelColor, ]" :style="labelSize">
            {{ label }}
        </label>
        <div class="m-input-container">
            <input ref="m_input"
                :class="[ 'm-input', { 'm-input-icon': dynamicSVG(icon) },
                    handleColor, handleShape, (!textColor.startsWith('#') && !textColor.startsWith('rgb')) ? handleTextColor : '', handleSize, ]"
                :style="[ (textColor.startsWith('#') || textColor.startsWith('rgb')) ? (handleTextColor as StyleValue) : '', (color.startsWith('#') || color.startsWith('rgb')) ? (customColor as StyleValue) : '' ]"
                :placeholder="placeholder" :type="type" :name="id" :id="id || label" :disabled="(disabled as boolean)" />


            <span v-if="(type === 'email')" class="m-input-email-progress-bar" :class="{ 'm-animation-shake-error': playShakeError }" :style="validEmail" />

            <span v-if="dynamicSVG(icon)" class="m-input-border"></span>
            <component v-if="dynamicSVG(icon)" :is="dynamicSVG(icon)" :class="[ { 'm-icon-bold': handleBoldText } ]" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { StyleValue, computed, onMounted, ref } from 'vue';
import { dynamicSVG, isValidEmail } from '@/utils';
import { shapes, textColors } from '@/common';
import { colors, labelSizes, sizes } from './props';

const m_input = ref<HTMLInputElement>();
const customColor = ref<StyleValue>();
const labelSize = ref<StyleValue>();

const isEmail = ref(false);
const validEmail = ref<StyleValue>();
const playShakeError = ref(false);

onMounted(() => {
    const onInput = () => {
        isEmail.value = isValidEmail(m_input.value?.value);
        if (isEmail.value) 
            validEmail.value = {
               backgroundColor: 'rgb(4, 120, 87)'
            }
        else {
            validEmail.value = {
                backgroundColor: 'rgb(185, 28, 28)',
                transform: 'translate(0px)',
                animation: 'shakeError 0.82s cubic-bezier(.36,.07,.19,.97) 0s 1 normal forwards'
            }
        }
    }
    const onKeyUpEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            console.log(isEmail.value);
            console.log(playShakeError.value);
            if (!isEmail.value) {
                if (playShakeError.value)
                    return;
                playShakeError.value = true;
                setTimeout(() => playShakeError.value = false, 850);
            }
        }
    }
    
    if (props.type === 'email') {
        m_input.value?.addEventListener('input', onInput);
        m_input.value?.addEventListener('keyup', onKeyUpEnter);
    }
    else {
        m_input.value?.removeEventListener('input', onInput);
        m_input.value?.removeEventListener('keyup', onKeyUpEnter);
    }
});

const props = defineProps({
    id: {
        type: String,
    },
    label: {
        type: String,
    },
    labelColor: {
        type: String,
        default: 'default',
    },
    placeholder: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'text',
    },
    color: {
        type: String,
        default: 'default',
    },
    textColor: {
        type: String,
        default: 'default',
    },
    shape: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'md'
    },
    bold: {
        type: [ Boolean, String ],
        default: false,
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
    // TODO: autoFocusing
    autoFocus: {
        type: [ Boolean, String ],
        default: false,
    },
});



const handleColor = computed<string>(() => {
    removeEventListeners();
    if (!props.color)
        return colors.default;
    if (props.color.startsWith('#') || props.color.startsWith('rgb')) {
        customColor.value = { borderColor: props.color };
        addEventListeners();
        return '';
    }
    return (colors as any)[ props.color ];
});
function removeEventListeners() {
    m_input.value?.removeEventListener('focus', onFocus);
    m_input.value?.removeEventListener('focus', onBlur);
}
function addEventListeners() {
    m_input.value?.addEventListener('focus', onFocus);
    m_input.value?.addEventListener('blur', onBlur);
}
const onFocus = () => m_input.value!.style.boxShadow = `var(--m-focus-shadow-border-thickness) ${props.color}`;
const onBlur = () => m_input.value!.style.boxShadow = ``;

const handleTextColor = computed<string | StyleValue>(() => {
    if (!props.textColor)
        return textColors.default;
    if (props.textColor.startsWith('#') || props.textColor.startsWith('rgb'))
        return { color: props.textColor } as StyleValue;
    return (textColors as any)[ props.textColor ];
});

const handleLabelColor = computed<string>(() => {
    if (!props.labelColor)
        return textColors.default;
    return (textColors as any)[ props.labelColor ];
});

const handleLoadingState = computed(() => {
    if (typeof props.loading === 'string' && props.loading == 'false')
        return false;
    return Boolean(props.loading);
});

const handleBoldText = computed(() => {
    if (typeof props.bold === 'string' && props.bold == 'false')
        return false;
    return Boolean(props.bold);
});

const handleShape = computed<string>(() => {
    if (!props.shape)
        return shapes.default;
    return (shapes as any)[ props.shape ];
});

const handleSize = computed<string>(() => {
    if (!props.size)
        return sizes.default;

    labelSize.value = {
        fontSize: (labelSizes as any)[ props.size ],
        lineHeight: 1.5,
    };
    return (sizes as any)[ props.size ];
});



</script>

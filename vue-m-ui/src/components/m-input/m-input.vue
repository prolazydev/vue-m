<template>
    <div class="m-input-main" :id="containerId" :class="[ { 'm-loading': handleLoadingState }, { 'm-text-bold': handleBoldText } ]">
        <label  v-if="label" :for="id || label" class="m-input-label" :id="labelId"
                :class="[ handleLabelColor, labelClass ]" 
                :style="[labelSize!, (labelColor.startsWith('#') || labelColor.startsWith('rgb')) ? handleLabelColor : '', ]">
            {{ label }}
        </label>
        <div class="m-input-container">
            <input  ref="m_input" :autofocus="(autoFocus as boolean)" 
                    :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                    :class="[ 'm-input', { 'm-input-icon': dynamicSVG(icon) }, { 'm-input-password': (type === 'password') },
                        handleColor, handleShape, (!textColor.startsWith('#') && !textColor.startsWith('rgb')) ? handleTextColor : '', handleSize, ]"
                    :style="[ (textColor.startsWith('#') || textColor.startsWith('rgb')) ? (handleTextColor as StyleValue) : '', (color.startsWith('#') || color.startsWith('rgb')) ? (customColor as StyleValue) : '' ]"
                    :placeholder="placeholder" :type="type" :name="id" :id="id || label" :disabled="(disabled as boolean)" />

            <span   v-if="(type === 'email')" class="m-input-email-progress-bar"
                    :class="{ 'm-animation-shake-error': playShakeError }" 
                    :style="handleValidationStyle" />
            <component  v-if="type === 'password'" 
                        @click="togglePasswordVisibility" 
                        :show-password="showPassword" 
                        :is="dynamicSVG('password-icons')" />

            <span v-if="dynamicSVG(icon)" class="m-input-border"></span>
            <component v-if="dynamicSVG(icon)" :is="dynamicSVG(icon)" :class="[ { 'm-icon-bold': handleBoldText } ]" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { StyleValue, computed, reactive, ref } from 'vue';
import { dynamicSVG, isValidEmail } from '@/utils';
import { shapes, textColors } from '@/common';
import { colors, labelSizes, sizes } from './props';

const m_input = ref<HTMLInputElement>();
const customColor = ref<StyleValue>();
const labelSize = ref<StyleValue>();

const isEmail = ref(false);
const validEmail = ref<StyleValue>();
const playShakeError = ref(false);
const playedOnce = ref(false);
const showPassword = ref(false);
const validationStyle = reactive({
    backgroundColor: '',
    transform: ''
});

const props = defineProps({
	modelValue: String,
    id: String,
    containerId: String,
    label: String,
    labelId: String,
    labelColor: {
        type: String,
        default: 'default',
    },
    labelClass: {
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
    persistentValidation: {
        type: [ Boolean, String ],
        default: false,
    },
    autoFocus: {
        type: [ Boolean, String ],
        default: false,
    },
});
defineEmits([ 'update:modelValue' ])

// #region input validation 
const handleValidationStyle = computed<StyleValue>(() => {
    validEmail.value = validationStyle as StyleValue;

    if (props.persistentValidation)
        validationStyle.transform = 'translate(0px)';
    else
        validationStyle.transform = '';

    if (props.type === 'email') {
        m_input.value?.addEventListener('input', onInput);
        m_input.value?.addEventListener('keyup', onKeyUpEnter);
    } else {
        m_input.value?.removeEventListener('input', onInput);
        m_input.value?.removeEventListener('keyup', onKeyUpEnter);
    }

    return validationStyle;
});
const onInput = () => {
    if (!m_input.value?.value && !props.persistentValidation) 
        return validationStyle.transform = 'translateY(-25px)';
    isEmail.value = isValidEmail(m_input.value?.value);
    if (isEmail.value) {
        validationStyle.backgroundColor = 'rgb(4, 120, 87)';
        validationStyle.transform = props.persistentValidation ? 'translate(0px)' : '';
        playedOnce.value = false;
    }
    else {
        validationStyle.backgroundColor = 'rgb(185, 28, 28)';
        validationStyle.transform = 'translate(0px)';
        if (!playedOnce.value) {
            playShakeErrorAnimation();
            playedOnce.value = true;
        }
    }
};
const onKeyUpEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter')
        playShakeErrorAnimation();
};
function playShakeErrorAnimation() {
    if (!isEmail.value) {
        if (playShakeError.value)
            return;
        playShakeError.value = true;
        setTimeout(() => playShakeError.value = false, 850);
    }
}
function togglePasswordVisibility() {
    if (showPassword.value) 
        m_input.value!.type = "text"
    else 
        m_input.value!.type = "password"

    showPassword.value = !showPassword.value;
}
// #endregion

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
    if (props.labelColor.startsWith('#') || props.labelColor.startsWith('rgb'))
        return { color: props.labelColor } as StyleValue;
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

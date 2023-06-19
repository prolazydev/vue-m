<template>
    <div class="m-input-main" 
		:id="containerId" 
        :class="[ { 'm-loading': handleLoadingState }, { 'm-text-bold': handleBoldText } ]">
        <label  v-if="label" 
                :for="id || label" 
				class="m-input-label" 
				:id="labelId"
                :class="[ handleLabelColor, labelClass ]" 
                :style="[ labelSize!, (labelColor.startsWith('#') || labelColor.startsWith('rgb')) ? handleLabelColor : '', ]">
            {{ label }}
        </label>
        <div class="m-input-container">
            <input  ref="m_input" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                    :id="id || label" 
					:name="id" 
					:autofocus="(autoFocus as boolean)" 
                    :tabindex="tabindex"
					:placeholder="placeholder" 
					:type="type" 
                    :class="[ 'm-input', { 'm-input-icon': dynamicSVG(icon) }, { 'm-input-password': (type === 'password') },
						handleColor, handleShape, (!textColor.startsWith('#') && !textColor.startsWith('rgb')) ? handleTextColor : '', 
						handleSize, { 'm-input-password': type === 'password' } ]"
                    :style="[ (textColor.startsWith('#') || textColor.startsWith('rgb')) ? (handleTextColor as StyleValue) : '', 
						(color.startsWith('#') || color.startsWith('rgb')) ? (customColor as StyleValue) : '', ]"
                    :disabled="(disabled as boolean)" />
          
            <component  v-if="type === 'password'" 
                        @click="togglePasswordVisibility" 
                        :show-password="showPassword" 
                        :is="computedPasswordIcon" />

            <span v-if="computedCustomIcon" class="m-input-border"></span>
            <component v-if="computedCustomIcon" :is="computedCustomIcon" :class="[ { 'm-icon-bold': handleBoldText } ]" />
        </div>
		<span v-if="(type === 'email')" 
			class="m-input-email-progress-bar"
			:class="{ 'm-animation-shake-error': playShakeError }" 
			:style="handleValidationStyle" />
    </div>
</template>

<script lang="ts" setup>
import { StyleValue, computed, reactive, ref } from 'vue';
import { dynamicSVG, isValidEmail } from '../../utils';
import { shapes, textColors } from 'D:/Work/vue-m/git/vue-m/vue-m-ui/src/common';
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
    tabindex: {
        type: Number,
        default: 0
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

const computedCustomIcon = computed<boolean | any>(() => dynamicSVG(props.icon));
const computedPasswordIcon = computed<boolean | any>(() => dynamicSVG('password-icons'));

// #region input validation 
const handleValidationStyle = computed<StyleValue>(() => {
	m_input.value?.removeEventListener('input', onInput);
	m_input.value?.removeEventListener('keyup', onKeyUpEnter);
    m_input.value?.removeEventListener('focus', onFocusEmail);
    m_input.value?.removeEventListener('blur', onBlurEmail);
    validEmail.value = validationStyle as StyleValue;

    if (props.persistentValidation)
        validationStyle.transform = 'translateY(0px)';
    else
        validationStyle.transform = 'translateY(-25px)';

    if (props.type === 'email') {
        m_input.value?.addEventListener('input', onInput);
        m_input.value?.addEventListener('keyup', onKeyUpEnter);
        m_input.value?.addEventListener('focus', onFocusEmail);
        m_input.value?.addEventListener('blur', onBlurEmail);
	}

    return validationStyle;
});
const onFocusEmail = () => {
    validationStyle.transform = 'translateY(0px)';
}
const onBlurEmail = () => {
    if (props.persistentValidation)
        validationStyle.transform = 'translateY(0px)';
    else
        validationStyle.transform = 'translateY(-25px)';
}
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
    if (m_input.value!.type === 'password')
        m_input.value!.type = 'text';
    else
        m_input.value!.type = 'password';
    showPassword.value = !showPassword.value;
}
// #endregion

// #region input color 
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
// #endregion

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

<template>
	<input 	ref="m_switch" type="checkbox" class="m-switch" 
			@change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
			:checked="modelValue"
			:class="[ handleSize, !color.startsWith('#') && !color.startsWith('rgb') ? handleColor : '',
			{ 'm-switch-custom-color': (knobColor.startsWith('#') || knobColor.startsWith('rgb')) },
			{ 'm-switch-loading': loading },  ]" 
			:style="[ (color.startsWith('#') || color.startsWith('rgb')) ? handleColor : '', { width: customWidth } ]"
			:disabled="(disabled as boolean)" />
</template>

<script lang="ts" setup>
import { StyleValue, computed, ref } from 'vue';
import { colors, sizes } from './props';

const m_switch = ref<HTMLElement>();
// TODO: Add tab indexing
const props = defineProps({
	modelValue: Boolean,
	color: {
		type: String,
		default: 'default',
	},
	// TODO: customize knob color
	knobColor: {
		type: String,
		default: 'default',
	},
	size: {
		type: String,
		default: 'md',
	},
	customWidth: String,
	loading: {
		type: [ Boolean, String ],
		default: false,
	},
	disabled: {
		type: [ Boolean, String ],
		default: false,
	},
});
defineEmits(['update:modelValue'])

const handleColor = computed<string | StyleValue>(() => {
	const switchFocusShadowBorderColor = '--m-focus-shadow-border-color';
	const switchCustomKnobColor = '--m-switch-custom-knob-color';

	m_switch.value?.style.removeProperty(switchFocusShadowBorderColor)
	m_switch.value?.style.removeProperty(switchCustomKnobColor);
	if (props.knobColor.startsWith('#') || props.knobColor.startsWith('rgb')) 
		m_switch.value?.style.setProperty(switchCustomKnobColor, props.knobColor);
	if (!props.color)
		return colors.default;
	if (props.color.startsWith('#') || props.color.startsWith('rgb')) {
		m_switch.value?.style.setProperty(switchFocusShadowBorderColor, props.color);

		return { borderColor: props.color, backgroundColor: props.color } as StyleValue;
	}
	return (colors as any)[ props.color ];
});


const handleSize = computed(() => {
	if (!props.size)
		return sizes.default;
	return (sizes as any)[ props.size ];
});

</script>
export const btnStyles = {
    default: 'm-btn m-btn-primary',
    primary: 'm-btn m-btn-primary',
    secondary: 'm-btn m-btn-secondary',
    success: 'm-btn m-btn-success',
    danger: 'm-btn m-btn-danger',
    warning: 'm-btn m-btn-warning',
    info: 'm-btn m-btn-info',
    light: 'm-btn m-btn-light',
    dark: 'm-btn m-btn-dark',

    indigo: 'm-btn m-btn-indigo',
    purple: 'm-btn m-btn-purple',
    pink: 'm-btn m-btn-pink',
};

export const btnSizes = {
    'xs': 'm-btn-size-xs',
    'sm': 'm-btn-size-sm',
    'md': 'm-btn-size-md',
    'lg': 'm-btn-size-lg',
    'xl': 'm-btn-size-xl',
    '2xl': 'm-btn-size-2xl',
    '3xl': 'm-btn-size-3xl',
};

export const btnShapes = {
    default: 'm-btn-shape-default',
    square: 'm-btn-shape-square',
    round: 'm-btn-shape-round',
    pill: 'm-btn-shape-pill',
};

export const textColors = {
    default: '',

    dark: 'm-text-dark',
    light: 'm-text-light',
    primary: 'm-text-primary',
    secondary: 'm-text-secondary',
    success: 'm-text-success',
    clean: 'm-text-clean',

    white: 'm-text-white',
    black: 'm-text-black',
    indigo: 'm-text-indigo',
    purple: 'm-text-purple',
    pink: 'm-text-pink',
};

export function createLighterShades(color: any) {
    let r, g, b, a;
    if (color.startsWith('#')) {
        // hex color
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
        a = 1;
    } else if (color.startsWith('rgb')) {
        // rgb or rgba color
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        r = parseInt(match[ 1 ]);
        g = parseInt(match[ 2 ]);
        b = parseInt(match[ 3 ]);
        a = match[ 4 ] ? parseFloat(match[ 4 ]) : 1;
    } else
        throw new Error('Invalid color format');

    const factor = 0.2; // lighter shade factor
    const shade1 = `rgba(${r + (255 - r) * factor}, ${g + (255 - g) * factor}, ${b + (255 - b) * factor}, ${a})`;
    const shade2 = `rgba(${r + (255 - r) * factor * 2}, ${g + (255 - g) * factor * 2}, ${b + (255 - b) * factor * 2}, ${a})`;
    return [ shade1, shade2 ];
}
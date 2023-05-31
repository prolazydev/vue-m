import { defineAsyncComponent } from "vue";

export function dynamicSVG(name: String): boolean | any {
	if (name) 
        return defineAsyncComponent(() => import(`@/icons/${name}.vue`));

    return false;
}

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

export function isValidEmail(email: string = '') {
    // RFC 5322 standard
    // const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailPattern.test(email);
  }
import { defineAsyncComponent } from "vue";


export function dynamicSVG(name: String) {
	if (name) 
        return defineAsyncComponent(() => import(`@/icons/${name}.vue`));

    return false;
}
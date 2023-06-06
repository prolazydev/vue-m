import { mBtn, mInput, mSwitch } from "@/components";
import type { App } from "vue";

export default {
	install: (app: App, options: any = {}) => {
		app.component('m-btn', mBtn)
		app.component('m-input', mInput);
		app.component('m-switch', mSwitch);
	}
};

export { mBtn, mInput, mSwitch };

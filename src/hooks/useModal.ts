import type { IconValue } from "vuetify/lib/composables/icons.mjs";

export type ModalInfoType = {
    prependIcon: IconValue,
    title: string,
    text: string,
}

/**
 * modal properties info
 * @returns 
 */
const show = ref(false);
const info = ref<ModalInfoType>();

export function useModal() {
    const open = (prependIcon: IconValue, title: string, text: string) => {
        show.value = true;
        info.value = {
            prependIcon: prependIcon,
            title: title,
            text: text,
        }
    }

    const close = () => {
        show.value = false;
        info.value = undefined;
    }

    return {
        show,
        info,
        close,
        open,
    }
}
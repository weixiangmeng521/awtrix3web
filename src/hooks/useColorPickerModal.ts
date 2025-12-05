export type RBGDataType = {r: number, g: number, b: number};

/**
 * color picker up modal
 */
export type ColorPickerUpModal = {
    title: string,
    backupColor: RBGDataType,
    color: RBGDataType,
    resolver: (value: RBGDataType) => void,
}


const isShow = ref(false);
const info = ref<ColorPickerUpModal>({
    title: "",
    backupColor: {r:0, g:0, b:0},
    color: {r:0, g:0, b:0},
    resolver: () => ({r:0, g:0, b:0}),
});

export function useColorPickerModal() {
    const open = async (title:string, color: RBGDataType):Promise<RBGDataType> => {
        isShow.value = true;
        info.value.title = title;
        info.value.color = color;
        info.value.backupColor = color;
        return await new Promise(r => info.value.resolver = r);
    }

    const close = () => {
        isShow.value = false;
        info.value.color = info.value.backupColor;
        info.value.resolver && info.value.resolver(info.value.color);
    }

    const confirm = () => {
        isShow.value = false;
        info.value.resolver && info.value.resolver(info.value.color);
    }

    return {
        isShow,
        info,
        close,
        open,
        confirm,
    }
}
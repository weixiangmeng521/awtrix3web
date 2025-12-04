
export type NotifyColorType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';

export type NotifyMessageType = {
    text: string,
    timeout: number,
    color: NotifyColorType,
}

export const useNotificationStore = defineStore('notification', () => {
    const queue = ref<NotifyMessageType[]>([]);

    const push = (text:string, color: NotifyColorType, timeout = 1200) => {
        queue.value.push({
            text,
            timeout,
            color,
        });
    };

    const head = () => {
        if (!queue.value.length) return;
        return queue.value[0];
    }

    return {
        queue,
        push,
        head,
    };
});
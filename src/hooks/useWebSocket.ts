import { ref, onBeforeUnmount } from 'vue';
import SystemConfig from '@/config/SystemConfig';

// defined event list
const websoketEventList = [
    'ping',
    'scann_devices',
] as const;


// defined server response type list
const definedServerTypeList = [
    -1, // error
    0,  // invalid
    1,  // OK
    2,  // stream start flag
    3,  // streaming flag
    4,  // stream end flag
] as const;

// request
export type WebSoketSendDataType<T> = {
    event: (typeof websoketEventList)[number],
    payload?: T,
    message?: string,
}


// response
export type WebSocketResponseDataType<T> = {
    type: (typeof definedServerTypeList)[number],
    payload?: T,
    message?: string,
    refer: string,
}


export function useWebSocket() {
    const socket = ref<WebSocket>();
    const isConnected = ref(false);
    let onMessageCallback: ((msg: WebSocketResponseDataType<unknown>) => void) | undefined;

    const onMessage = <T = unknown>(cb: (msg: WebSocketResponseDataType<T>) => void) => {
        onMessageCallback = cb as (msg: WebSocketResponseDataType<unknown>) => void;
    };

    // connect data
    const connect = () => {
        socket.value = new WebSocket(SystemConfig.websoket);

        socket.value.onopen = () => {
            isConnected.value = true;
        };

        socket.value.onmessage = (event) => {
            // messages.value.push(JSON.parse(event.data));
            onMessageCallback && onMessageCallback(JSON.parse(event.data))
        };

        socket.value.onclose = () => {
            isConnected.value = false;
            setTimeout(connect, 1000); // 自动重连
        };
    };

    // send data
    const send = <T>(data: WebSoketSendDataType<T>) => {
        if (socket.value?.readyState === WebSocket.OPEN) {
            if (typeof data === 'string') {
                socket.value.send(data);
                return;
            }
            socket.value.send(JSON.stringify(data));
        }
    };

    let intervalId: number;

    // heartbeat function
    function ping() {
        // ping - pong
        send({ event: "ping" });
    }

    onMounted(() => {
        intervalId = setInterval(ping, 30000)
    })

    onBeforeUnmount(() => {
        socket.value?.close();
        intervalId && clearInterval(intervalId)
    });

    connect();

    return { socket, isConnected, onMessage, send };
}

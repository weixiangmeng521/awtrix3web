import { ref, onBeforeUnmount } from 'vue';
import SystemConfig from '@/config/SystemConfig';
import type { WSEvents } from '@/types/ws-events';

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
    event: (typeof WSEvents)[number],
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
    const messageQueue = ref<string[]>([]);
    let onMessageCallback: ((msg: WebSocketResponseDataType<unknown>) => void) | undefined;

    const onMessage = <T = unknown>(cb: (msg: WebSocketResponseDataType<T>) => void) => {
        onMessageCallback = cb as (msg: WebSocketResponseDataType<unknown>) => void;
    };

    // flush queue when socket is open
    const flushQueue = () => {
        if (socket.value?.readyState !== WebSocket.OPEN) return;

        while (messageQueue.value.length > 0) {
            const msg = messageQueue.value.shift()!;
            socket.value.send(msg);
        }
    };    

    // connect data
    const connect = () => {
        socket.value = new WebSocket(SystemConfig.websoket);

        socket.value.onopen = () => {
            isConnected.value = true;
            flushQueue();
        };

        socket.value.onmessage = (event) => {
            if(!event.data) return;
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
        const payload = JSON.stringify(data);        
        if (socket.value?.readyState === WebSocket.OPEN) {
            try {
                socket.value.send(payload);
                return;
            } catch {
                messageQueue.value.push(payload);
            }
        } else {
            messageQueue.value.push(payload);
        }
    };

    let intervalId: number;

    // heartbeat function
    function ping() {
        // ping - pong
        send({ event: "ping" });
    }

    
    function setAwtrixDeviceIp(){
        const connectedDeviceIp = window.localStorage.getItem("connectedDeviceIp");
        if(connectedDeviceIp) {
            send({ event: "set_awtrix_device_ip", payload: connectedDeviceIp });
        }
    }


    onMounted(() => {
        connect();        
        setAwtrixDeviceIp();
        intervalId = setInterval(ping, 30000)
    })

    onBeforeUnmount(() => {
        socket.value?.close();
        intervalId && clearInterval(intervalId)
    });

    return { socket, isConnected, send, onMessage };
}

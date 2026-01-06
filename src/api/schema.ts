import type { APISchema } from './request.d';
import { createRequestClient } from './request';
// https://github.com/kinglisky/axits/blob/main/index.ts
interface TestAPISchema extends APISchema {
    // check is awtrix device
    checkIsAwtrixDevice: {
        request: {
            ip: string,
        };
        response: {
            code: number,
            message: string,
            data: { isAwtrixDevice: boolean },
        };
    },
    rebootDevice: {
        request: {};
        response: {
            code: number,
            message: string,
            data: boolean
        };
    }
    getApiLoop: {
        request: {};
        response: {
            code: number,
            message: string,
            data: {[key: string]: number},
        };
    },
    setTranstionSpeed: {
        request: {
            value: number,
        };
        response: {
            code: number,
            message: string,
            data: boolean,
        };
    }
}

const httpClient = createRequestClient<TestAPISchema>({
    baseURL: 'http://localhost:9527/',
    apis: {
        checkIsAwtrixDevice: 'GET /api/check-is-awtrix-device',
        rebootDevice: 'GET /api/reboot-device',
        getApiLoop: 'GET /api/loop',
        setTranstionSpeed: 'POST /api/transitions/speed',
    }
});

export default httpClient;
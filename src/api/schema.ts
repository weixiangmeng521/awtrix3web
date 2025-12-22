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
            data: boolean
        };
    };
}

const httpClient = createRequestClient<TestAPISchema>({
    baseURL: 'http://localhost:9527/',
    apis: {
        checkIsAwtrixDevice: 'GET /api/check-is-awtrix-device',
    }
});

export default httpClient;
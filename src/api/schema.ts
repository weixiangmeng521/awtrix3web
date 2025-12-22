import type { APISchema } from './request.d';
import { createRequestClient } from './request';

interface TestAPISchema extends APISchema {
    getAwtrixDeviceInfo: {
        request: {
        };
        response: {
        };
    };
}

const httpClient = createRequestClient<TestAPISchema>({
    baseURL: '',
    apis: {
        getAwtrixDeviceInfo: 'GET /api/stats',
    }
});

export default httpClient;
import type { APISchema } from './request.d';
import { createRequestClient } from './request';
import { useAppStore } from '@/stores/app';

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
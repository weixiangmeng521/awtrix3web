/**
 * check if the device is an Awtrix device
 * @deprecated
 * @param ip 
 * @returns 
 */
export async function checkDeviceIsAwtrixDevice(ip: string) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(`http://${ip}/api/stats`, {
            method: 'GET',
            signal: controller.signal
        });

        clearTimeout(timer);

        if (response.ok) {
            const data = await response.json();
            if (data && typeof data === 'object' && 'ip_address' in data && 'version' in data) {
                return true;
            }
        }
    } catch (error) {
        // 超时或 fetch 错误都会走到这里
        return false;
    }

    return false;
}

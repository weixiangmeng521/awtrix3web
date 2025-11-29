<template>
    <v-card class="mx-auto mt-10" :loading="!props.deviceInfo" max-width="600">
        <v-card-item>
            <v-card-title>
                <!-- <div :class="deviceInfo?.matrix ? 'bg-green' : 'bg-red'" class="w-3 h-3 rounded-full d-inline-block mr-1" style="width: 10px;height:10px;border-radius:100%;"></div> -->
                <WifiIcon :value="props.deviceInfo?.wifi_signal" class="wifi-icon" />
                Device Info
            </v-card-title>
            <v-card-subtitle>
                UID: {{ props.deviceInfo?.uid }} | v{{
                    props.deviceInfo?.version }}
            </v-card-subtitle>
        </v-card-item>

        <v-card-text v-if="props.deviceInfo">
            <v-table density="comfortable">
                <tbody>
                    <tr>
                        <td><strong>IP Address</strong></td>
                        <!-- <td>{{ props.deviceInfo.ip_address }}</td> -->
                        <td><Clink :href="props.deviceInfo.ip_address">{{ props.deviceInfo.ip_address  }}</Clink></td>
                    </tr>
                    <tr>
                        <td><strong>WiFi Signal</strong></td>
                        <td>{{ props.deviceInfo.wifi_signal }} dBm</td>
                    </tr>
                    <tr>
                        <td><strong>Brightness</strong></td>
                        <td>{{ props.deviceInfo.bri }}</td>
                    </tr>
                    <tr>
                        <td><strong>Battery | Raw</strong></td>
                        <td>{{ props.deviceInfo.bat }}% | {{ props.deviceInfo.bat_raw }}</td>
                    </tr>
                    <tr>
                        <td><strong>Current App</strong></td>
                        <td>{{ props.deviceInfo.app }}</td>
                    </tr>
                    <tr>
                        <td><strong>Lux | LDR_raw</strong></td>
                        <td>{{ props.deviceInfo.lux }} | {{ props.deviceInfo.ldr_raw }}</td>
                    </tr>
                    <tr>
                        <td><strong>Temperature</strong></td>
                        <td>{{ props.deviceInfo.temp }}°C</td>
                    </tr>

                    <tr>
                        <td><strong>Humidity</strong></td>
                        <td>{{ props.deviceInfo.hum }}%</td>
                    </tr>

                    <tr>
                        <td><strong>Type</strong></td>
                        <td>{{ props.deviceInfo.type }}</td>
                    </tr>

                    <tr>
                        <td><strong>RAM Usage</strong></td>
                        <td>{{ formatRam(props.deviceInfo.ram) }}</td>
                    </tr>

                    <tr>
                        <td><strong>Message</strong></td>
                        <td>{{ props.deviceInfo.messages }}</td>
                    </tr>

                    <tr>
                        <td><strong>Uptime</strong></td>
                        <td>{{ formatUptime(props.deviceInfo.uptime) }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>

        <v-card-text v-else>
            Loading...
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import type { AwtrixStats } from '@/api/awtrix';
import Clink from "@/components/CLink.vue";

const props = defineProps<{
    deviceInfo?: AwtrixStats;
}>();

function formatRam(kb: number) {
    return (kb / 1024).toFixed(1) + ' MB';
}

function formatUptime(seconds: number) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d, ${h}h, ${m}m`;
}

</script>
<style scoped>
.space-y-2>*+* {
    margin-top: 8px;
}

.wifi-icon {
    --var-size: 20px;
    width: var(--var-size);
    height: var(--var-size);
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 3px;
}
</style>

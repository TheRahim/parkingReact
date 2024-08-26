/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_MONGO_URL: string;
    VITE_PARKING_CAPACITY: number;
    VITE_PARKING_BILLING_INTERVAL: number;
    VITE_PARKING_RATES: any;
    VITE_PARKING_RATES_180M: any;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
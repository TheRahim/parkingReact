/// <reference types="vite/client" />

interface ImportMetaEnv {
  API:string;

  VITE_API_URL?: string;
  API_GET_SPOTS: string;
  API_CHECK_SPOTS: string;
  API_IS_FULL :string;
  API_IS_AVAIBLE: string;
  API_BILL_CALCULATOR: string;

  API_PARK_CAR: string;

  API_EXIT_CAR: string;
  VITE_PARKING_CAPACITY: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

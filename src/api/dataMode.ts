// Production builds are static by default; local development keeps using the API.
export const useStaticData = import.meta.env.VITE_DATA_MODE
  ? import.meta.env.VITE_DATA_MODE === "static"
  : import.meta.env.PROD;

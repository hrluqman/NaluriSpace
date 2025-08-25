import axios from "axios";

type controlActionProp = "start" | "pause" | "stop" | "reset";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

const client = axios.create({ baseURL: BASE_URL, timeout: 5000 });

export const getStatus = async () => {
  const res = await client.get("/status");
  return res.data;
};

export const setControl = async (action: controlActionProp) => {
  const res = await client.post("/control", { action });
  return res.data;
};

export default { getStatus, setControl };

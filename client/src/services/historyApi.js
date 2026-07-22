import apiClient from "./axiosInstance";

export function getPeriods() {
  return apiClient.get("/periods");
}

export function getEvents() {
  return apiClient.get("/events");
}

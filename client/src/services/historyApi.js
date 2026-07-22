import apiClient from "./apiClient";

export function getPeriods() {
  return apiClient.get("/periods");
}

export function getEvents() {
  return apiClient.get("/events");
}

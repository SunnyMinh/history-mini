import apiClient from "./axiosInstance";

export function getPeriods() {
  return apiClient.get("/periods");
}

export const getPeriodById = (id) => {
  return apiClient.get(`/periods/${id}`);
};

export const createPeriod = (periodData) => {
  return apiClient.post(
    "/periods",
    periodData
  );
};

export const updatePeriod = (
  id,
  periodData
) => {
  return apiClient.put(
    `/periods/${id}`,
    periodData
  );
};

export const deletePeriod = (id) => {
  return apiClient.delete(
    `/periods/${id}`
  );
};

export function getEvents() {
  return apiClient.get("/events");
}

export const getEventById = (id) => {
  return apiClient.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return apiClient.post(
    "/events",
    eventData
  );
};

export const updateEvent = (
  id,
  eventData
) => {
  return apiClient.put(
    `/events/${id}`,
    eventData
  );
};

export const deleteEvent = (id) => {
  return apiClient.delete(
    `/events/${id}`
  );
};

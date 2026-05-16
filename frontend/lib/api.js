const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  listMachines: () => request("/api/machines"),
  getMachine: (machineId) => request(`/api/machines/${machineId}`),
  createMachine: (machine) =>
    request("/api/machines", { method: "POST", body: JSON.stringify(machine) }),
  updateMachine: (machineId, patch) =>
    request(`/api/machines/${machineId}`, { method: "PUT", body: JSON.stringify(patch) }),
  deleteMachine: (machineId) =>
    request(`/api/machines/${machineId}`, { method: "DELETE" }),

  listBookings: (machineId) =>
    request(machineId ? `/api/bookings?machineId=${encodeURIComponent(machineId)}` : "/api/bookings"),

  getBooking: (bookingId) => request(`/api/bookings/${bookingId}`),

  createBooking: (booking) =>
    request("/api/bookings", { method: "POST", body: JSON.stringify(booking) }),

  updateBooking: (bookingId, patch) =>
    request(`/api/bookings/${bookingId}`, { method: "PUT", body: JSON.stringify(patch) }),

  deleteBooking: (bookingId) =>
    request(`/api/bookings/${bookingId}`, { method: "DELETE" }),
};

export const helpers = {
  isValidContact(type, value) {
    if (!value) return false;
    if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return /^[+\d][\d\s()-]{6,}$/.test(value);
  },

  normalizeContact(type, value) {
    if (!value) return "";
    if (type === "email") return value.trim().toLowerCase();
    return value.replace(/[^\d+]/g, "");
  },

  maskContact(type, value) {
    if (!value) return "";
    if (type === "email") {
      const [name, domain] = value.split("@");
      if (!name || !domain) return value;
      return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`;
    }
    const tail = value.slice(-3);
    return `${"*".repeat(Math.max(value.length - 3, 4))}${tail}`;
  },

  generateVerificationCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  },

  formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  },

  toDateTimeLocalValue(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  },

  defaultTimes() {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    return {
      startTime: helpers.toDateTimeLocalValue(start),
      endTime: helpers.toDateTimeLocalValue(end),
    };
  },

  statusLabel(status) {
    switch (status) {
      case "out-of-order":
        return "Out of order";
      case "occupied":
        return "Occupied";
      case "cancelled":
        return "Cancelled";
      case "active":
        return "Active";
      default:
        return "Available";
    }
  },

  computeMachineStatus(machine, bookings) {
    if (!machine) return "available";
    if (machine.status === "out-of-order") return "out-of-order";

    const now = new Date();
    const isOccupied = bookings.some((booking) => {
      if (booking.machineId !== machine.machineId) return false;
      if (booking.bookingStatus !== "active") return false;
      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);
      return now >= start && now <= end;
    });

    return isOccupied ? "occupied" : "available";
  },

  isTimeSlotAvailable(bookings, machineId, startTime, endTime) {
    const requestedStart = new Date(startTime);
    const requestedEnd = new Date(endTime);
    return !bookings.some((booking) => {
      if (booking.machineId !== machineId) return false;
      if (booking.bookingStatus !== "active") return false;
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return requestedStart < bookingEnd && requestedEnd > bookingStart;
    });
  },
};

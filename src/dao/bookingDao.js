import db from "../db.js";
import { randomUUID } from "crypto";

function rowToBooking(row) {
  if (!row) return null;
  return {
    bookingId: row.booking_id,
    machineId: row.machine_id,
    customerName: row.customer_name,
    contactType: row.contact_type,
    contactValue: row.contact_value,
    startTime: row.start_time,
    endTime: row.end_time,
    bookingStatus: row.booking_status,
    verificationCode: row.verification_code,
    createdAt: row.created_at,
  };
}

/**
 * @param {object} booking
 * @returns {object}
 */
export function create(booking) {
  const bookingId = booking.bookingId || randomUUID();
  const createdAt = booking.createdAt || new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO bookings (
      booking_id, machine_id, customer_name, contact_type, contact_value,
      start_time, end_time, booking_status, verification_code, created_at
    ) VALUES (
      @booking_id, @machine_id, @customer_name, @contact_type, @contact_value,
      @start_time, @end_time, @booking_status, @verification_code, @created_at
    )
  `);
  stmt.run({
    booking_id: bookingId,
    machine_id: booking.machineId,
    customer_name: booking.customerName,
    contact_type: booking.contactType,
    contact_value: booking.contactValue,
    start_time: booking.startTime,
    end_time: booking.endTime,
    booking_status: booking.bookingStatus ?? "active",
    verification_code: booking.verificationCode ?? null,
    created_at: createdAt,
  });
  return get({ bookingId });
}

/**
 * @param {object} filter - {} all, { bookingId }, { machineId }
 */
export function get(filter = {}) {
  if (filter.bookingId) {
    const row = db.prepare(`SELECT * FROM bookings WHERE booking_id = ?`).get(filter.bookingId);
    return rowToBooking(row);
  }
  if (filter.machineId) {
    const rows = db
      .prepare(`SELECT * FROM bookings WHERE machine_id = ? ORDER BY start_time`)
      .all(filter.machineId);
    return rows.map(rowToBooking);
  }
  const rows = db.prepare(`SELECT * FROM bookings ORDER BY start_time`).all();
  return rows.map(rowToBooking);
}

export function update(bookingId, patch) {
  const existing = get({ bookingId });
  if (!existing) return null;
  const merged = {
    machineId: patch.machineId ?? existing.machineId,
    customerName: patch.customerName ?? existing.customerName,
    contactType: patch.contactType ?? existing.contactType,
    contactValue: patch.contactValue ?? existing.contactValue,
    startTime: patch.startTime ?? existing.startTime,
    endTime: patch.endTime ?? existing.endTime,
    bookingStatus: patch.bookingStatus ?? existing.bookingStatus,
    verificationCode:
      patch.verificationCode !== undefined ? patch.verificationCode : existing.verificationCode,
  };
  db.prepare(`
    UPDATE bookings SET
      machine_id = @machine_id,
      customer_name = @customer_name,
      contact_type = @contact_type,
      contact_value = @contact_value,
      start_time = @start_time,
      end_time = @end_time,
      booking_status = @booking_status,
      verification_code = @verification_code
    WHERE booking_id = @booking_id
  `).run({
    booking_id: bookingId,
    machine_id: merged.machineId,
    customer_name: merged.customerName,
    contact_type: merged.contactType,
    contact_value: merged.contactValue,
    start_time: merged.startTime,
    end_time: merged.endTime,
    booking_status: merged.bookingStatus,
    verification_code: merged.verificationCode,
  });
  return get({ bookingId });
}

export function remove(bookingId) {
  const existing = get({ bookingId });
  if (!existing) return false;
  const result = db.prepare(`DELETE FROM bookings WHERE booking_id = ?`).run(bookingId);
  return result.changes > 0;
}

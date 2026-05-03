import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "app.db"));
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS machines (
    machine_id TEXT PRIMARY KEY,
    machine_name TEXT NOT NULL,
    machine_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available',
    location_note TEXT NOT NULL DEFAULT '',
    capacity_kg TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS bookings (
    booking_id TEXT PRIMARY KEY,
    machine_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    contact_type TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    booking_status TEXT NOT NULL DEFAULT 'active',
    verification_code TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_bookings_machine ON bookings(machine_id);
`);

export default db;

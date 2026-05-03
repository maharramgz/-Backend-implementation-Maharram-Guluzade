# Laundry Room Helper — Frontend

Next.js (App Router) frontend for the Laundry Room Helper application.
Talks to the Express backend over REST.

## Requirements

- Node.js 18+
- A running backend at `http://127.0.0.1:3000` (see the root `README.md`)

## Install and run

```bash
npm install
npm run dev
```

The dev server starts on `http://127.0.0.1:3001`.

If the backend listens on a different host or port, set:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:4100 npm run dev
```

> **Note.** Next.js 15 cannot resolve modules when the absolute project
> path contains a `#` character. If your folder contains `#`, clone the
> repository into a clean path (for example
> `~/projects/laundry-room-helper`) before running this app.

## Screens

- **Overview** — list of machines with current status (User Story 1)
- **New Booking** — create a booking with email or phone for verification
  (User Story 2)
- **Schedule** — view bookings for a selected machine (User Story 3)
- **Manage Bookings** — cancel a booking using a verification code
  (User Story 4)

## How verification works

1. The user enters an email or phone number when creating a booking. It is
   stored on the booking record on the backend.
2. To cancel, the user enters the same email or phone, then asks for a
   six-digit code. The frontend generates the code, sends it to the
   backend with `PUT /api/bookings/:id` (field `verificationCode`), and
   shows it on screen as a demo (no real email/SMS gateway is required).
3. After the code is entered correctly, the booking is updated to
   `bookingStatus: "cancelled"` via `PUT /api/bookings/:id`.

This protects bookings from being cancelled by anyone other than the
person who created them, while keeping the application open without
registration or login.

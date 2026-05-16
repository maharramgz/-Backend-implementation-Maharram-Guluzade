"use client";

import { useState } from "react";
import { api, helpers } from "../lib/api";

export default function BookingCancelPanel({ booking, onChanged }) {
  const [contactInput, setContactInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [pendingCode, setPendingCode] = useState(null);

  async function handleSendCode() {
    const entered = helpers.normalizeContact(booking.contactType, contactInput.trim());
    if (entered !== booking.contactValue) {
      setFeedback({
        message: "The provided contact does not match this booking.",
        type: "error",
      });
      return;
    }

    const code = helpers.generateVerificationCode();
    try {
      await api.updateBooking(booking.bookingId, { verificationCode: code });
      setPendingCode(code);
      setFeedback({
        message: `Verification code sent to ${helpers.maskContact(
          booking.contactType,
          booking.contactValue
        )}. Demo code: ${code}`,
        type: "success",
      });
    } catch (error) {
      setFeedback({ message: error.message, type: "error" });
    }
  }

  async function handleVerifyCancel() {
    const entered = helpers.normalizeContact(booking.contactType, contactInput.trim());
    if (entered !== booking.contactValue) {
      setFeedback({
        message: "The provided contact does not match this booking.",
        type: "error",
      });
      return;
    }

    if (!pendingCode) {
      setFeedback({
        message: "Request a verification code before cancelling the booking.",
        type: "error",
      });
      return;
    }

    if (codeInput.trim() !== pendingCode) {
      setFeedback({
        message: "The verification code is incorrect.",
        type: "error",
      });
      return;
    }

    try {
      await api.updateBooking(booking.bookingId, {
        bookingStatus: "cancelled",
        verificationCode: null,
      });
      setFeedback({ message: "Booking cancelled successfully.", type: "success" });
      setPendingCode(null);
      setContactInput("");
      setCodeInput("");
      await onChanged?.();
    } catch (error) {
      setFeedback({ message: error.message, type: "error" });
    }
  }

  if (booking.bookingStatus !== "active") {
    return null;
  }

  return (
    <div className="verification-card">
      <p className="section-label" style={{ marginBottom: 8 }}>
        Cancel with verification
      </p>
      <label>
        <span>
          Confirm your{" "}
          {booking.contactType === "email" ? "email address" : "phone number"}
        </span>
        <input
          type="text"
          placeholder={
            booking.contactType === "email" ? "name@example.com" : "+46701234567"
          }
          value={contactInput}
          onChange={(event) => setContactInput(event.target.value)}
        />
      </label>

      <div className="verification-actions">
        <button type="button" className="ghost-btn" onClick={handleSendCode}>
          Send verification code
        </button>
      </div>

      <label>
        <span>Verification code</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit code"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
        />
      </label>

      <div className="verification-actions">
        <button type="button" className="primary-btn" onClick={handleVerifyCancel}>
          Verify and cancel
        </button>
      </div>

      <p className={`inline-feedback ${feedback.type ? feedback.type : ""}`}>
        {feedback.message}
      </p>
    </div>
  );
}

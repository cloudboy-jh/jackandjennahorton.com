-- Run this against your D1 database to create the RSVP table.
--
--   wrangler d1 execute jack-and-jenna-rsvp --file=schema.sql
--   (or --local for local dev)

CREATE TABLE IF NOT EXISTS rsvps (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  name         TEXT     NOT NULL,
  attending    TEXT     NOT NULL CHECK (attending IN ('yes', 'no')),
  plus_one     TEXT,
  meal_pref    TEXT,
  submitted_at TEXT     NOT NULL DEFAULT (datetime('now'))
);

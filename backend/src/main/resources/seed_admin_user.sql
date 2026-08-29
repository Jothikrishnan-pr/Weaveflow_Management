-- Creates one ADMIN login for a fresh database: username "admin", password "admin123"
-- Run this once, right after your tables are created, against whichever
-- database you're setting up (local MySQL or Aiven).
--
-- The value below is a BCrypt HASH, not the plain password — this is safe
-- to commit to a public repo. What is NOT safe is ever putting a real
-- plain-text password in a file like this.
--
-- CHANGE THIS PASSWORD after your first login on any real deployment.

INSERT INTO users (username, password_hash, role, active_status)
VALUES ('admin', '$2b$10$deBnDs6o.bGkQTQtB8ZiLuMVR/Deav3l.Qyb3UDGEHU3iajmUs0GS', 'ADMIN', TRUE);

-- To create a STAFF account the same way, just change the role.
-- (This example reuses the same "admin123" hash for convenience — change
-- the password for any account you actually intend to keep using.)
INSERT INTO users (username, password_hash, role, active_status)
VALUES ('staffuser', '$2b$10$deBnDs6o.bGkQTQtB8ZiLuMVR/Deav3l.Qyb3UDGEHU3iajmUs0GS', 'STAFF', TRUE);
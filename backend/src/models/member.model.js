const db = require("../config/db");

const getAllMembers = (callback) => {
  const sql = `
    SELECT
      id,
      full_name AS fullName,
      email,
      mobile,
      wing,
      flat_number AS flatNumber,
      role,
      status
    FROM members
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const createMember = (member, callback) => {
  const sql = `
    INSERT INTO members
    (full_name, email, mobile, wing, flat_number, role, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      member.fullName,
      member.email,
      member.mobile,
      member.wing,
      member.flatNumber,
      member.role,
      member.status,
    ],
    callback,
  );
};

const getMemberById = (id, callback) => {
  const sql = `
    SELECT
      id,
      full_name AS fullName,
      email,
      mobile,
      wing,
      flat_number AS flatNumber,
      role,
      status
    FROM members
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updateMember = (id, member, callback) => {
  const sql = `
    UPDATE members
    SET
      full_name = ?,
      email = ?,
      mobile = ?,
      wing = ?,
      flat_number = ?,
      role = ?,
      status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      member.fullName,
      member.email,
      member.mobile,
      member.wing,
      member.flatNumber,
      member.role,
      member.status,
      id,
    ],
    callback,
  );
};

module.exports = {
  getAllMembers,
  createMember,
  getMemberById,
   updateMember,
};

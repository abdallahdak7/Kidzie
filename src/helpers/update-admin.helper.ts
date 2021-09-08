function updateAdminByID(id: any, columns: any) {
  var query = ["UPDATE admins"];
  var set: any = [];
  query.push("SET");

  columns["first_name"] = columns["firstName"];
  columns["last_name"] = columns["lastName"];
  columns["phone_number"] = columns["phoneNumber"];

  delete columns["firstName"];
  delete columns["lastName"];
  delete columns["phoneNumber"];
  delete columns["username"];
  delete columns["email"];

  Object.keys(columns).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  query.push(`WHERE id = ${id} RETURNING *`);

  return query.join(" ");
}

module.exports = updateAdminByID;

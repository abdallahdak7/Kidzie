function updatePartnerByID(id: any, columns: any) {
  var query = ["UPDATE partners"];
  var set: any = [];
  query.push("SET");

  if (columns["firstName"]) {
    columns["first_name"] = columns["firstName"];
  }
  if (columns["lastName"]) {
    columns["last_name"] = columns["lastName"];
  }
  if (columns["phoneNumber"]) {
    columns["phone_number"] = columns["phoneNumber"];
  }

  delete columns["firstName"];
  delete columns["lastName"];
  delete columns["phoneNumber"];
  Object.keys(columns).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  query.push(`WHERE partner_id = ${id} RETURNING *`);

  return query.join(" ");
}

module.exports = updatePartnerByID;

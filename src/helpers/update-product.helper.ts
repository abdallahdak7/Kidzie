function updateProductByID(id: any, columns: any) {
  var query = ["UPDATE products"];
  var set: any = [];
  query.push("SET");

  if (columns["saleStarts"]) {
    columns["sale_starts"] = columns["saleStarts"];
  }
  if (columns["saleEnds"]) {
    columns["sale_ends"] = columns["saleEnds"];
  }
  if (columns["salePercentage"]) {
    columns["sale_percentage"] = columns["salePercentage"];
  }
  if (columns["onSale"]) {
    columns["on_sale"] = columns["onSale"];
  }

  delete columns["saleStarts"];
  delete columns["saleEnds"];
  delete columns["salePercentage"];
  delete columns["onSale"];
  Object.keys(columns).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  query.push(`WHERE kidzie_id = ${id} RETURNING *`);

  return query.join(" ");
}

module.exports = updateProductByID;

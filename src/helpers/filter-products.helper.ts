function filterProducts(columns: any) {
  var query = ["SELECT * FROM products WHERE"];
  var set: any = [];

  if (columns["kidzieId"]) {
    columns["kidzie_id"] = columns["kidzieId"];
  }
  if (columns["saleStarts"]) {
    columns["sale_starts"] = columns["saleStarts"];
  }
  if (columns["saleEnds"]) {
    columns["sale_ends"] = columns["saleEnds"];
  }
  if (columns["onSale"]) {
    columns["on_sale"] = columns["onSale"];
  }
  if (columns["salePercentage"]) {
    columns["sale_percentage"] = columns["salePercentage"];
  }

  delete columns["kidzieId"];
  delete columns["saleStarts"];
  delete columns["saleEnds"];
  delete columns["onSale"];
  delete columns["salePercentage"];

  Object.keys(columns).forEach(function (key, i) {
    if (i === 0) {
      set.push(key + " = ($" + (i + 1) + ")");
    } else {
      set.push("AND " + key + " = ($" + (i + 1) + ")");
    }
  });
  query.push(set.join(" "));

  return query.join(" ");
}

module.exports = filterProducts;

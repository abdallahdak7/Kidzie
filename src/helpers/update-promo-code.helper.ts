function updatePromoCodeByID(id: any, columns: any) {
  var query = ["UPDATE promo_codes"];
  var set: any = [];
  query.push("SET");

  if (columns["productGroup"]) {
    columns["product_group"] = columns["productGroup"];
  }
  if (columns["promoStarts"]) {
    columns["promo_starts"] = columns["promoStarts"];
  }
  if (columns["promoEnds"]) {
    columns["promo_ends"] = columns["promoEnds"];
  }

  delete columns["productGroup"];
  delete columns["promoStarts"];
  delete columns["promoEnds"];
  Object.keys(columns).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  query.push(`WHERE id = ${id} RETURNING *`);

  return query.join(" ");
}

module.exports = updatePromoCodeByID;

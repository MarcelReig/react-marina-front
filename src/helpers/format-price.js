export function formatPrice(euros) {
  return (euros / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR"
  });
}



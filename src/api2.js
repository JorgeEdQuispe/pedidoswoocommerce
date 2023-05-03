import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";

const api2 = new WooCommerceAPI({
  url: "https://dlayrafloreria.com",
  consumerKey: "ck_058790a12570d825976847b4e63125f72c5c1cbd",
  consumerSecret: "cs_dd80bbd08558e67997262304fe3ebd1ef46e1a57",
  version: "wc/v3",
});

export default api2;
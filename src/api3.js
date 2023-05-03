import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";

const api3 = new WooCommerceAPI({
  url: "https://enviaflores.pe",
  consumerKey: "ck_40d6eb9b376e640a45c11e776f007eb28510dc7b",
  consumerSecret: "cs_375ea0353c20181ce243b3b9375a40be02871ca3",
  version: "wc/v3",
});

export default api3;
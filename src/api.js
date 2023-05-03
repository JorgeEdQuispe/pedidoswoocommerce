import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceAPI({
  url: "https://enviaflores.pe",
  consumerKey: "ck_9486b89bb4951e0d8bb17915ed74904fe5c8fbb1",
  consumerSecret: "cs_3fe6cbc617542390624ecc90537b43abc861de08",
  version: "wc/v3",
});

export default api;

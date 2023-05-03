import React, { useState } from "react";
import api from "./api"; // importar la instancia de la API desde el archivo api.js
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./orders.module.css";
import { Suspense } from "react";
import ListOrders from "./ListOrders";

const Orders = () => {
  const updateOrderStatus = async (orderId) => {
    const data = {
      status: "completed",
    };

    try {
      const response = await api.put(`orders/${orderId}`, data);
      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className={`${styles["container"]} row`}>
      <div className="list-group col-3">
        <Suspense fallback={<div>Loading...</div>}>
          <ListOrders handleOrderClick={handleOrderClick} />
        </Suspense>
      </div>
      {selectedOrder && (
        <div className={`${styles["selected-order"]} col-7`}>
          <ul>
            {selectedOrder.line_items.map((item) => (
              <li key={item.id}>
                {item.image && (
                  <img
                    src={item.image.src}
                    alt={item.name}
                    className={`${styles["image-port"]}`}
                  />
                )}
                {item.name}
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="col-sm-6">
              <h3 className={`${styles["title"]}`}>Detalles del pedido:</h3>
              <p>Número: {selectedOrder.number}</p>
              <p>Total: {selectedOrder.total}</p>
              <p>Estado: {selectedOrder.status}</p>
              <p>Fecha de creación: {selectedOrder.date_created}</p>
            </div>

            <div className="col-12">
              <h4 className={`${styles["title"]}`}>Facturación</h4>
              <p>
                {selectedOrder.billing.first_name}{" "}
                {selectedOrder.billing.last_name}
              </p>
              <p>{selectedOrder.billing.address_1}</p>
              <p>{selectedOrder.billing.address_2}</p>
              <p>
                {selectedOrder.billing.city}, {selectedOrder.billing.state}{" "}
                {selectedOrder.billing.postcode}
              </p>
              <p>{selectedOrder.billing.country}</p>
              <p>Teléfono: {selectedOrder.billing.phone}</p>

              <h4 className={`${styles["title"]}`}>Envío</h4>
              <p>
                {selectedOrder.shipping.first_name}{" "}
                {selectedOrder.shipping.last_name}
              </p>
              <p>{selectedOrder.shipping.address_1}</p>
              <p>{selectedOrder.shipping.address_2}</p>
              <p>
                {selectedOrder.shipping.city}, {selectedOrder.shipping.state}{" "}
                {selectedOrder.shipping.postcode}
              </p>
              <p>{selectedOrder.shipping.country}</p>
              <p>Teléfono: {selectedOrder.shipping.phone}</p>
            </div>
            <div className={`${styles["customer-note"]} col-12`}>
              <h2 className={`${styles["title"]}`}>Nota</h2>
              {selectedOrder.customer_note}
            </div>
          </div>
          <button
            className={`${styles["btn"]} ${styles["btn-primary"]}`}
            onClick={() => updateOrderStatus(selectedOrder.id, "completed")}
          >
            Enviado
          </button>
          <h4>Artículos</h4>
        </div>
      )}
    </div>
  );
};

export default Orders;

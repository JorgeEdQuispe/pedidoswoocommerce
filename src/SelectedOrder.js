import React from "react";
import api from "./api";
import styles from "./orders.module.css";

const SelectedOrder = ({ order }) => {
  const updateOrderStatus = async (orderId) => {
    const data = {
      status: "completed",
    };

    try {
      const response = await api.put(`orders/${orderId}`, data);
      console.log("Order status updated:", response.data);
      // Espera un segundo para que la solicitud se complete antes de recargar la página
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles["selected-order"]} container-fluid col-9`}>
      <div className="col-md-12">
        <p className="order-details">
          Número: {order.number} <span></span>
          Total: {order.total}
          <span> </span>
          {order.status === "processing" ? "Pagado" : order.status}
          <span> </span>
          Fecha de compra:{" "}
          {new Date(order.date_created).toLocaleString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "America/Lima",
          })}
        </p>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h4>Artículos</h4>
          <ul>
            {order.line_items.map((item) => (
              <li key={item.id} className="mb-3">
                {item.image && (
                  <img
                    src={item.image.src}
                    alt={item.name}
                    className={`${styles["image-port"]} mr-3`}
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <div className={`${styles["section"]}`}>
            <h4 className={`${styles["title"]}`}>Facturación</h4>
            <p className={`${styles["info"]}`}>
              {order.billing.first_name} {order.billing.last_name}
            </p>
            <p className={`${styles["info"]}`}>{order.billing.address_1}</p>
            <p className={`${styles["info"]}`}>{order.billing.address_2}</p>
            <p className={`${styles["info"]}`}>
              Teléfono: {order.billing.phone}
            </p>
          </div>
          <div className={`${styles["section"]}`}>
            <h4 className={`${styles["title"]}`}>Envío</h4>
            <p className={`${styles["info"]}`}>
              {order.shipping.first_name} {order.shipping.last_name}
            </p>
            <p className={`${styles["info"]}`}>{order.shipping.address_1}</p>
            <p className={`${styles["info"]}`}>{order.shipping.address_2}</p>
            <p className={`${styles["info"]}`}>
              {order.shipping.city},{order.shipping.state}{" "}
              {order.shipping.postcode}
            </p>
            {order.meta_data.length > 0 && order.meta_data[0] && (
              <p className={`${styles["info"]}`}>
                Celular: {order.meta_data[0].value}
              </p>
            )}

            {order.meta_data.length > 2 && order.meta_data[2] && (
              <p className={`${styles["info"]}`}>
                fecha y Hora de entrega:{" "}
                {new Date(order.meta_data[2].value).toLocaleString("es-PE", {
                  timeZone: "America/Lima",
                })}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={`${styles["customer-note"]} row mb-3`}>
        <h2 className={`${styles["title"]}`}>Nota</h2>
        <p>{order.customer_note}</p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            className={`${styles["btn"]} ${styles["btn-primary"]} mr-3`}
            onClick={() => updateOrderStatus(order.id, "completed")}
          >
            Enviado
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedOrder;

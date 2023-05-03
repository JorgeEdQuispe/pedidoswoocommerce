import React from "react";
import "./App.css";
import styles from "./orders.module.css";

const OrderItem = ({ handleOrderClick, order }) => {
  return (
    <div
      className={`${styles["list-group-item"]}, ${styles["items-orders"]} `}
      key={order.id}
      onClick={() => handleOrderClick(order)}
    >
      <div>
        <h4 className={styles["order-number"]}>Nr: {order.number}</h4>
        <div className="">
          {order.line_items.map((item) => (
            <div className={`${styles["order-item"]}`} key={item.id}>
              {/* {item.image && (
                          <img
                            src={item.image.src}
                            alt={item.name}
                            className={`${styles["order-item-image"]}`}
                          />
                        )} */}
              <p className={`${styles["order-item-name"]} my-2`}>{item.name}</p>
            </div>
          ))}
          <p className={styles["order-date"]}>
            {new Date(order.date_created).toLocaleString("es-ES", {
              hour12: true,
            })}
          </p>
        </div>
        <p className={styles["order-total"]}>Total: S/.{order.total}</p>
        <p
          className={`${styles["order-status"]} ${order.status ===
            "processing" && styles["processing"]}`}
        >
          Estado: {order.status === "processing" ? "Pagado" : order.status}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;

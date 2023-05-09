import React from "react";
import styles from "./orders.module.css";

const OrderItem = ({ handleOrderClick, order }) => {
  const { id, number, line_items, date_created, total, status } = order;
  return (
    <div
      className={`${styles["list-group-item"]} ${styles["items-orders"]}`}
      key={id}
      onClick={() => handleOrderClick(order)}
    >
      <div>
        <h4 className={styles["order-number"]}>Nr: {number}</h4>
        <div>
          {line_items.map((item) => (
            <div className={styles["order-item"]} key={item.id}>
              {/* {item.image && (
                          <img
                            src={item.image.src}
                            alt={item.name}
                            className={`${styles["order-item-image"]}`}
                          />
                        )} */}
              <p className={`${styles["order-item-name"]} my-2`}>
                ({item.quantity}) {item.name}
              </p>
            </div>
          ))}
          <p className={styles["order-date"]}>
            {new Date(date_created).toLocaleString("es-ES", {
              hour12: true,
            })}
          </p>
        </div>
        <p className={styles["order-total"]}>Total: S/.{total}</p>
        <p
          className={`${styles["order-status"]} ${status === "processing" &&
            styles["processing"]}`}
        >
          Estado: {status === "processing" ? "Pagado" : status}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;

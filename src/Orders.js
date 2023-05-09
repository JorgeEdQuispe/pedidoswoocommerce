import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./orders.module.css";
import { Suspense } from "react";
import ListOrders from "./ListOrders";
import SelectedOrder from "./SelectedOrder"; // importar el componente SelectedOrder

const Orders = () => {
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
      {selectedOrder && <SelectedOrder order={selectedOrder} />}
    </div>
  );
};

export default Orders;

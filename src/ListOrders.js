import React, { useState, useEffect } from "react";
import api from "./api"; // importar la instancia de la API desde el archivo api.js
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";

const ListOrders = ({ handleOrderClick }) => {
  const [orders, setOrders] = useState([]);
  const OrderItem = lazy(() => import("./OrderItem"), {
    handleOrderClick: handleOrderClick,
  });

  useEffect(() => {
    const fetchOrders = () => {
      api
        .get("orders", {
          per_page: 20,
        })
        .then((response) => {
          setOrders(
            response.data.filter((order) => order.status === "processing")
          );
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };

    // Obtener los pedidos iniciales
    fetchOrders();

    // Configurar la llamada a fetchOrders() cada 5 minutos (300000 ms)
    const intervalId = setInterval(fetchOrders, 300000);

    // Limpieza de intervalo en caso de que Orders se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {orders.map((order) => (
        <Suspense fallback={<div>Loading...</div>} key={order.id}>
          <OrderItem order={order} handleOrderClick={handleOrderClick}/>
        </Suspense>
      ))}
    </>
  );
};

export default ListOrders;

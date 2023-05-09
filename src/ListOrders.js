import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import api from "./api";

const ListOrders = ({ handleOrderClick }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get("orders", {
        per_page: 10,
      });
      const filteredOrders = response.data.filter(
        (order) => order.status === "processing"
      );
      setOrders(filteredOrders);
      setError(null);
    } catch (error) {
      setError(error.response.data);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const intervalId = setInterval(fetchOrders, 300000);

    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  const OrderItem = useMemo(() => {
    return lazy(() => import("./OrderItem"));
  }, []);

  return (
    <>
      {error && <div>Error al obtener pedidos: {error}</div>}
      {orders.map((order) => (
        <Suspense fallback={<div>Cargando...</div>} key={order.id}>
          <OrderItem order={order} handleOrderClick={handleOrderClick} />
        </Suspense>
      ))}
    </>
  );
};

export default ListOrders;

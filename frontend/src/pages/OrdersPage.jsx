import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/order`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const handleDelete = async (orderId, productId) => {
    const conformation = confirm("Are you sure want to delete order?");
    if (conformation) {
      try {
        const response = await axios.delete(`${apiUrl}/order/${orderId}`, {
          data: { productId }, // Pass productId if deletion is for a specific product
        });

        if (response.status === 200) {
          // Update the state to remove the deleted item
          setOrders(
            (prevOrders) =>
              prevOrders
                .map((order) => {
                  if (order._id === orderId) {
                    return {
                      ...order,
                      cardItems: order.cardItems.filter(
                        (item) => item.product._id !== productId
                      ),
                    };
                  }
                  return order;
                })
                .filter((order) => order.cardItems.length > 0) // Remove orders with no cardItems
          );
          toast.success("Order Deleted..");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Delete Order");
      }
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen px-2 lg:px-10 py-10">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-blue-500 ">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-500">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity / Price
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-500">
                Order Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3 bg-blue-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="h-svh items-center py-5 px-5">
                <button
                  disabled
                  type="button"
                  className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <React.Fragment key={order._id}>
                  {order.cardItems.map((item, index) => (
                    <tr
                      key={`${order._id}-${index}`}
                      className="bg-blue-600 border-b border-blue-400"
                    >
                      <td className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100 cursor-pointer hover:bg-yellow-700">
                        {item.product.name}
                      </td>
                      <td className="px-6 py-4">{item.product.seller}</td>
                      <td className="px-6 py-4 bg-blue-500">
                        {item.product.category}
                      </td>
                      <td className="px-6 py-4">
                        {item.qty} / ${item.product.price}
                      </td>
                      <td className="px-6 py-4 bg-blue-500">${order.amount}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="bg-blue-500">
                        <button
                          className="text-white px-3 py-2  cursor-pointer hover:bg-red-500 rounded mx-1"
                          onClick={() =>
                            handleDelete(order._id, item.product._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;

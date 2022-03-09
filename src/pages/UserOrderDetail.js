import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { FaMoneyCheckAlt, FaTruck, FaRegListAlt } from "react-icons/fa";

const UserOrderDetail = () => {
  const { orderId } = useParams();
  const base_url = process.env.REACT_APP_BASE_URL;
  const accessToken = useSelector(
    (state) => state.loginReducer.user?.accessToken
  );
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  function capitalize(name) {
    return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  }

  useEffect(() => {
    if (accessToken) {
      fetch(`${base_url}/v1/user/order/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setOrder(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [base_url, accessToken, orderId]);

  const handlePayment = () => {
    window.snap.pay(order.order?.midtrans_snap_token);
  };

  const cancelOrder = () => {
    if (window.confirm('Are you sure you wish to cancel this order?')){
      fetch(`${base_url}/v1/user/order/cancel/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          navigate("/order");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <NavbarLayout />

      <div className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 ml-8">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-orange-800 hover:text-orange-400"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to="/order"
                className="ml-1 text-sm font-medium text-orange-800 hover:text-orange-500 md:ml-2"
              >
                Orders
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to={"/order/" + order.order?.id}
                className="ml-1 text-sm font-medium text-orange-800 md:ml-2"
              >
                Detail
              </Link>
            </div>
          </li>
        </ol>
      </div>

      <div className="flex justify-center bg-orange-50">
        <section className="w-100 flex flex-col items-center justify-center bg-orange-50 py-10">
          <ol className="items-start sm:flex md:mx-24 pb-10">
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="flex z-10 justify-center items-center w-6 h-6 bg-orange-200 rounded-full ring-0 ring-orange-800 sm:ring-8 shrink-0">
                  <FaRegListAlt>
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </FaRegListAlt>
                </div>
                <div className="sm:flex w-full bg-orange-200 h-0.5"></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3 className="text-lg font-semibold text-orange-900 break-all">
                  ID: {order.order?.midtrans_order_id}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-orange-400">
                  {new Date(order.order?.createdAt).toLocaleString("en-AU")}
                </time>
                <p className="text-base font-semibold text-orange-800 flex items-center mt-2">
                  Payment
                </p>
                <div
                  id="toast-simple"
                  className="flex items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow space-x"
                  role="alert"
                >
                  <FaMoneyCheckAlt className="text-orange-800 text-xl" />
                  <div className="pl-4 text-sm font-normal text-orange-800 flex items-center">
                    {order.paymentStatus}
                    {order.paymentStatus !== "SUCCESS" && (
                      <div className="text-center mb-3">
                        <button
                          onClick={handlePayment}
                          className="py-2 px-1 bg-orange-800 text-white rounded-md font-semibold"
                        >
                          Payment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-orange-900 ">
                  Delivery Address
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-orange-400">
                  {order.order?.address.name} ({order.order?.address.phone})
                </time>
                <p className="text-base font-normal text-orange-500">
                  {order.order?.address.address}, {order.order?.address.city},{" "}
                  {order.order?.address.province} (
                  {order.order?.address.postal_code})
                </p>
                <p className="text-base font-semibold text-orange-800 flex items-center mt-2">
                  Order Process
                </p>
                <div
                  id="toast-simple"
                  className="flex items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow space-x"
                  role="alert"
                >
                  <FaTruck className="text-orange-800 text-xl" />
                  <div className="pl-4 text-sm font-normal text-orange-800">
                    {order.order?.status}
                  </div>
                </div>
              </div>
            </li>

            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="flex z-10 justify-center items-center w-6 h-6 bg-orange-200 rounded-full ring-0 ring-orange-800 sm:ring-8 shrink-0">
                  <FaMoneyCheckAlt>
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </FaMoneyCheckAlt>
                </div>
                <div className="sm:flex w-full bg-orange-200 h-0.5"></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3 className="text-lg font-semibold text-orange-900 ">
                  Payment Detail
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-orange-400">
                  {order.order?.products.length} items |{" "}
                  {order.order?.grand_weight} kg
                </time>
                <p className="text-lg font-semibold text-orange-900 ">
                  Total product price
                </p>
                <p className="text-sm font-normal text-orange-500">
                  Rp.{order.order?.grand_total - order.order?.shipping_costs}
                </p>
                <p className="text-lg font-semibold text-orange-900 ">
                  Shipping costs
                </p>
                <p className="text-sm font-normal text-orange-500">
                  Rp. {order.order?.shipping_costs}
                </p>
                <p className="text-lg font-semibold text-orange-900 ">
                  Grand total
                </p>
                <p className="text-sm font-normal text-orange-500">
                  Rp. {order.order?.grand_total}
                </p>
                <div className="mt-3">
                  <button
                    onClick={cancelOrder}
                    className="py-2 px-2 bg-orange-500 text-white hover:bg-orange-800 rounded-md font-semibold text-base"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </li>
          </ol>

          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg max-w-[90vw]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Weight
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Sub Total
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.order?.products.map((item, i) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.img}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name && capitalize(item.name)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Rp.{item.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              @{item.weight} Kg
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                              {item.order_products.qty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            Rp.{item.order_products.sub_total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={"/product/" + item.id}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              Detail
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterLayout />
    </>
  );
};

export default UserOrderDetail;

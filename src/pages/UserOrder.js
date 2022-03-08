import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"

const UserOrder = () => {

    const base_url = process.env.REACT_APP_BASE_URL;
    const accessToken = useSelector(state => state.loginReducer.user?.accessToken);

    const [order, setOrder] = useState([]);
    
    const capitalize = (str) => {
        return str.replace(/\b(\w)/g, s => s.toUpperCase());
    }

    useEffect(() => {
        if (accessToken) {
            fetch(`${base_url}/v1/user/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": accessToken
                }
            }).then(res => res.json())
            .then(result => {
                console.log(result);
                setOrder(result.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [accessToken, base_url])

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
                  className="ml-1 text-sm font-medium text-orange-800 md:ml-2"
                >
                  Orders
                </Link>
              </div>
            </li>
          </ol>
        </div>
        
        <section className="min-h-[70vh] w-100 py-10 bg-orange-100">
        <div className="grid grid-cols-1 gap-5">
        {order.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row rounded-lg bg-white shadow-lg md:mx-auto mx-12  md:w-[70vw]">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={item.products[0]?.img}
                alt="items"
              />
              <div className="flex-1 p-6 flex flex-col justify-start">
                <div className="text-sm text-gray-600 flex flex-wrap items-center gap-3">
                  <FaShoppingBag className="text-green-800"/>
                  <p className="font-bold"> Transaction </p>
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "full",
                  })}
                  
                  <span className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"}>
                    {item.status}
                  </span>

                  <p className="text-gray-700 break-all">Order ID: {item?.midtrans_order_id}</p>
                </div>
                <div className="text-gray-900 font-bold text-xl mt-4">
                  {capitalize(item?.products[0]?.name)}
                </div>

                <p className="text-gray-700 text-base font-medium mb-2">
                  {item?.products[0]?.order_products?.qty} item x Rp.{" "}
                  {item?.products[0].price}
                </p>

                {item?.products.length > 1 && (
                  <Link to={"/order/" + item.id}  className="text-gray-700 text-base font-normal hover:text-orange-800">
                    + {item?.products.length - 1} other product
                  </Link>
                )}

                <div className="text-orange-800 flex justify-end mt-10 mb-2 font-semibold">
                    <p className="font-light">
                        Grand Total:  
                    </p>
                    &nbsp;Rp.{item.grand_total}
                </div>
                <div className="flex flex-col items-end justify-end items-end flex-1">
                    <Link
                      to={"/order/" + item.id}
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                    >
                      Order Details
                    </Link>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        </section>

        <FooterLayout />
      </>
    );
}
 
export default UserOrder;
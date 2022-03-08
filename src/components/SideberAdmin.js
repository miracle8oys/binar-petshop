import {NavLink} from 'react-router-dom'
import "../Style/sidebarAdmin.css"

const SidebarAdmin = () => {
    const menu = [
        {name: "Home", link: "/admin/dashboard"},
        {name: "Chat", link: "/admin/chat"},
        {name: "Orders", link: "/admin/orders"},
        {name: "Products", link: "/admin/products"},
        {name: "Adoptions", link: "/admin/adopt"},
        {name: "Supplies", link: "/admin/supplies"},
        {name: "Categories", link: "/admin/category"},
        {name: "Tags", link: "/admin/tags"},
        {name: "Couriers", link: "/admin/couriers"},
        {name: "Order Histories", link: "/admin/histories"},
        {name: "About", link: "/admin/about"},
    ]

    return (
        <div className="w-64 bg-orange-50 border-r border-slate-300">
            <ul className="grid grid-cols-1 divide-y divide-slate-300 border-b border-slate-300">
                <li className='bg-orange-200'>
                    <p className='text-center text-xl px-2 my-6 font-semibold'>DASHBOARD</p>
                </li>
                {
                    menu.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.link} className="" >
                                <p className={`text-xl p-2 hover:bg-orange-200 pl-4`}>{item.name}</p>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SidebarAdmin
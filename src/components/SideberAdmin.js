import {NavLink} from 'react-router-dom'

const SidebarAdmin = () => {
    return (
        <div className="w-64 bg-orange-50 border-r border-slate-300">
            <ul className="grid grid-cols-1 divide-y divide-slate-300 border-b border-slate-300">
                <li className='bg-orange-200'>
                    <p className='text-center text-xl px-2 my-6 font-semibold'>DASHBOARD</p>
                </li>
                <li>
                    <NavLink to="/admin/dashboard" className="">
                        <p className="text-xl p-2 hover:bg-orange-200 pl-4">Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/products" className="">
                        <p className='text-xl p-2 hover:bg-orange-200 pl-4'>Product</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/adopt" className="">
                        <p className='text-xl p-2 hover:bg-orange-200 pl-4'>Adopt</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/category" className="">
                        <p className='text-xl p-2 hover:bg-orange-200 pl-4'>Category</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/tags" className="">
                        <p className='text-xl p-2 hover:bg-orange-200 pl-4'>Tag</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SidebarAdmin
import FooterLayout from "../../components/Footer"
import NavbarLayout from "../../components/Navbar"

const AddProduct = () =>{
    return(
        <div className="flex flex-col h-screen w-full">
            <NavbarLayout/>
            <div className="flex-grow flex justify-center my-4 block">
                <form onSubmit={""} encType="multipart/form-data" className="bg-sky-50 rounded-lg shadow w-1/2 p-2">
                    <p className="md:text-2xl text-center font-semibold my-3">Product</p>
                    <div className="form-group mb-2 px-4">
                        <label for="name" className="form-label inline-block my-2">Product Name</label>
                        <input type="text" className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name"
                            placeholder="Enter name" required/>
                    </div>
                    <div className="form-group mb-2 px-4">
                        <label for="price" className="form-label inline-block my-2">Price</label>
                        <div className="flex">
                            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Rp</span>
                            <input type="number" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="price"
                                placeholder="10000" required/>
                        </div>
                    </div>
                    <div className="form-group mb-2 px-4">
                        <label for="tags" className="form-label inline-block my-2">Tag</label>
                        <input type="text" className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="tags"
                            placeholder="Enter price" required/>
                    </div>
                    <div className="form-group mb-6 px-4">
                        <label for="description" className="form-label inline-block my-2">Description</label>
                        <textarea className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="description"
                            placeholder="Description"></textarea>
                    </div>

                    <div className="flex justify-center py-6">
                        <input type="file" name="img" className="ml-10 text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-yellow-700
                        hover:file:bg-yellow-100
                        " multiple/>
                        

                    </div>


                    <div className="flex justify-center my-6">
                        <button type="submit" className="rounded w-40 bg-green-200 hover:bg-green-300 p-2 font-semibold">Submit</button>
                    </div>
                </form>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default AddProduct;
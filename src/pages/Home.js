import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import ListPet from "../components/ListPet";
import HomePet from "../assets/woof-delivery.png"
// import PetFood from "../assets/pet-food.png"
import ListCategories from "../components/ListCategories";

const Home = () => {
    return ( 
        // <h1>HomePage</h1>
        <div className="h-screen w-full mx-auto">
            <NavbarLayout/>
            <div className="bg-orange-50 md:container">
                <div className="py-5 flex items-center grid md:grid-cols-2 md:auto-cols-max ">
                    <div className="mx-auto font-bold text-center my-5 tracking-wide md:tracking-normal">
                        <h1 className="md:text-4xl font-display">Love your pet</h1>
                        <h1 className="md:text-4xl font-display">Make them healthy</h1>
                        <div className="md:mt-14 mt-8">
                            <button className="rounded-full bg-orange-400 p-2 md:p-3 text-sm font-medium text-white shadow-lg hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 w-52 md:w-max md:text-base" type="submit" name="submit">Browse products</button>
                        </div>
                        
                    </div>
                        <img src={HomePet} alt="Pet" className="hidden md:block"/> 
                </div>
            </div>
            <div className="mx-auto md:mx-5 px-3 mt-6 p-2">
                 <h5 className="font-bold md:text-lg font-display">Products Category</h5>
                 <ListCategories/>
            </div>
            <div>
                <div className="px-3 mb-10 md:mx-5 mx-auto mt-6">
                    <h4 className="font-bold md:text-lg font-display mb-4">Pet Adoption</h4>
                    <ListPet/>
                </div>         
            </div>
            <FooterLayout/>
        </div>
     );
}
 
export default Home;
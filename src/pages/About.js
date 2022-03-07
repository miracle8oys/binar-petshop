import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import { Link } from "react-router-dom";
import LogoPet from '../assets/newlogo.png'
import { useEffect, useState } from 'react';
import { FaPaw, FaShoppingBag, FaComments, FaChevronRight, FaRegAddressBook } from "react-icons/fa"

const About = () => {
    const [ aboutList, setAboutList ] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}/about`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/JSON"
            }})
        .then(res => res.json())
        .then(result => {
            console.log(result.data)
            setLoading(false);
            setAboutList(result?.data);
        })
        .catch((e) => {
            setLoading(true);
            console.log(e.message);
        });

    }, []);

    return (
      <div className="h-screen w-full mx-auto bg-white">
        <NavbarLayout />
        {loading ? (
          <div className="bg-orange-100 mx-auto h-screen"></div>
        ) : (
          <>
            <div className="bg-orange-100 mx-auto">
              <div className="py-5 mx-20 flex justify-center items-center grid lg:grid-cols-[30%_60%] gap-10 md:grid-cols-1 ">
                <div className="flex-shrink-0 flex items-center justify-center">
                    <img className="block lg:hidden h-40 w-auto" src={LogoPet} alt="Workflow"/>
                    <img className="hidden lg:block h-40 w-auto" src={LogoPet} alt="Logo"/>
                </div>

                <div className="font-bold text-start my-5 tracking-wide md:tracking-normal">
                  <h1 className="md:text-4xl text-orange-800">{aboutList?.name}</h1>
                  <div className="md:my-3 my-1">
                    <span class="px-2 inline-flex text-normal leading-5 font-thin rounded-full bg-orange-300 text-white">
                      Love your pet, Make them healthy
                    </span>
                  </div>
                  <p className="md:text-xl font-normal pt-5 italic">
                    {aboutList?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="container mx-auto my-10">
              <div className="text-center">
                <h1
                  className="mt-10 mb-10 section-heading wow fadeInDown animated text-2xl font-bold text-orange-800"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    WebkitAnimationDelay: "0.3s",
                    MozAnimationDelay: "0.3s",
                    animationDelay: "0.3s",
                  }}
                >
                  Our Product & Services
                </h1>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 flex justify-center my-2">
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100 flex flex-col items-stretch">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 flex gap-5 text-orange-800">
                        <FaShoppingBag className="text-orange-800"/>
                        
                        Pet Care Product
                      </div>
                      <p className="text-gray-700 text-base">
                        We believe that all pets are entitled to a happy and healthy life. 
                        Our high-quality products that support animal health include pet joint health 
                        support, supplements, dental care for your pets, skin & fur care products,
                        eye and ear care products, multivitamins for dogs and cats, and more.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex-1 flex flex-col justify-end">
                        <Link to={"/product"} className="inline-block bg-orange-400 hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex gap-3 items-center">
                            Our Products <FaChevronRight />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 flex justify-center my-2">
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100 flex flex-col items-stretch">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 flex gap-5 text-orange-800">
                        <FaPaw className="text-orange-800"/>
                        Pet Adoption
                      </div>
                      <p className="text-gray-700 text-base">
                        ABCD Petshop has wonderful animals looking for good homes. 
                        If you think you’re ready for the responsibility of adding a pet to your family, 
                        browse our adoptable animals online and contact us via our web messenger. 
                        With hundreds of available cats and dogs every day, we’re sure to have the right pet for your family. 
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex-1 flex flex-col justify-end">
                        <Link to={"/adopt"} className="inline-block bg-orange-400 hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex gap-3 items-center">
                            Adopt a Pet <FaChevronRight />
                        </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 flex justify-center my-2">
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100 flex flex-col items-stretch">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 flex gap-5 text-orange-800">
                        <FaComments className="text-orange-800"/>
                        Pet Care Advice
                      </div>
                      <p className="text-gray-700 text-base">
                        We provide help and support on areas that matter most to you and your pets, 
                        including food advice, health checklists & pet care.
                        We strive to communicate with our clients honestly, 
                        treat them fairly and always welcome their feedback.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex-1 flex flex-col justify-end">
                      <Link to={"/chat"} className="inline-block bg-orange-400 hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex gap-3 items-center">
                        Live Chat <FaChevronRight className="text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-100 flex justify-center items-stretch grid lg:grid-cols-[40%_40%] md:grid-cols-1 gap-10 px-20 mt-10 py-10">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg w-100">
                    <div className="px-4 py-5 sm:px-6 bg-gray-100">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-3"> <FaRegAddressBook/> Contact Us</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Our Petshop Contact & Shop Location</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border border-b-2 border-gray-100">
                            <dt className="text-sm font-medium">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {aboutList.name}, {aboutList.address}, {aboutList.city}, {aboutList.province} {aboutList.postal_code} 
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border border-b-2 border-gray-100">
                            <dt className="text-sm font-medium">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">(+62) | {aboutList.phone}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border border-b-2 border-gray-100">
                            <dt className="text-sm font-medium">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">abcd-petshop@gmail.com</dd>
                        </div>
                        </dl>
                    </div>
                    </div>

                <div style={{
                  overflow:"hidden",
                  paddingBottom:"56.25%",
                  position:"relative",
                  height:0}}>
                  <iframe title="petshop-maps" src={aboutList.maps} className={"rounded-lg shadow"} width="600" height="450" frameborder="0" style={{
                    left:0,
                    top:0,
                    height:"100%",
                    width:"100%",
                    position:"absolute"}} allowfullscreen></iframe>
                </div>
              
            </div>
          </>
        )}

        <FooterLayout />
      </div>
    );
}

export default About;
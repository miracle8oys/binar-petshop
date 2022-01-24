const ListPet = ({pet})=>{
    return(
        <>       
            <div>
                <img src={`${pet.img}`} alt={pet.name} className='md:w-56 w-48 rounded'/>
            </div>
            <div className='font-sans md:py-2 md:px-3 mx-2 md:mx-0 '>
                <p className='pt-2 text-xs md:text-sm font-medium'>{pet.name} | {pet.age} months</p>
                <p className='pb-2 text-xs md:text-sm'>{pet.animal_race}</p>
            </div>
        </> 
              

    )
}

export default ListPet;
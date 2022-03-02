const ListPet = ({pet})=>{
    const capitalizeEachLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    return(
        <>       
            <div>
                <img src={`${pet.img}`} alt={pet.name} className='w-full md:h-48 h-36 object-fit rounded'/>
            </div>
            <div className='font-sans md:py-2 md:px-3 mx-2 md:mx-0 '>
                <p className='pt-2 md:text-lg font-bold'>{capitalizeEachLetter(pet.name)}</p>
                <p className='pt-2 text-gray-600 font-medium'>{pet.age} months</p>
                <p className='pb-2 text-xs md:text-sm'>Species: {pet.animal_race}</p>
            </div>
        </>  
              

    )
}

export default ListPet;
import { FaCalendarAlt } from "react-icons/fa"

const capitalizeEachLetter = (string) => {
  let word = string.toLowerCase().split(" ");
  for (let i = 0; i < word.length; i++) {
    word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1);
  }
  return word.join(" ");
};

const ListPet = ({ pet }) => {
  return (
    <>
      <div>
        <img
          src={`${pet.img}`}
          alt={pet.name}
          className="w-full md:h-56 h-40 object-cover rounded"
        />
      </div>
      <div className="font-sans md:py-2 md:px-3 mx-2 md:mx-0 ">
        <p className="pt-2 md:text-lg font-bold">
          {capitalizeEachLetter(pet.name)}
        </p>
        <p className="pt-2 text-gray-600 font-medium">{pet.age} months</p>
        <p className="pb-2 text-xs md:text-sm">Race: {pet.animal_race}</p>
      </div>
    </>
  );
};

const NewListPet = ({ pet }) => {
  return (
    <div className="w-full ">
      <div
        className="c-card block bg-orange-50 shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`${pet.img}`}
            alt={pet.name}
          />
        </div>
        <div className="p-4">
          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            {pet.animal_race}
          </span>
          <h2 className="mt-2 mb-2  font-bold">
            {capitalizeEachLetter(pet.name)}
          </h2>
          <p className="flex gap-3 text-sm font-gray-600 justify-end items-center border-t pt-2">
            <FaCalendarAlt />{pet.age} months
          </p>
        </div>
      </div>
    </div>
  );
};

export { ListPet, NewListPet };

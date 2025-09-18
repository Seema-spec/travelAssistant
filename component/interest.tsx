import { useLocation } from "@/context/locationContext";
import { Fragment } from "react";

export default function ExploreCategories() {
  const { selectedCategory, toggleSelectCategory } = useLocation();
  const categories = [
    {
      name: "Natural Beauty",
      description: "Places like beaches, mountains, deserts, and forests can be a source of interest.",
      image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=600", 
    },
    {
      name: "History",
      description: "Places with historical significance, like monuments, ancient temples, and historic buildings, can be a draw.",
      image: "https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Culture",
      description: "Places where you can immerse yourself in the local culture, such as by exploring markets, meeting locals, or visiting museums and art galleries.",
      image: "https://images.pexels.com/photos/236171/pexels-photo-236171.jpeg?auto=compress&cs=tinysrgb&w=600", 
    },
    {
      name: "Religion",
      description: "Places of religious importance can be a source of interest.",
      image: "https://images.pexels.com/photos/57901/pexels-photo-57901.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sports",
      description: "Sports events like soccer games, sailing regattas, or Formula 1 races can attract tourists.",
      image: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=600", 
    },
    {
      name: "Inspiration",
      description: "Traveling can be a source of inspiration.",
      image: "https://images.pexels.com/photos/18224397/pexels-photo-18224397/free-photo-of-woman-with-backpack-hiking-in-forest.jpeg?auto=compress&cs=tinysrgb&w=600", 
    },
    {
      name: "Architecture",
      description: "Explore architectural wonders that showcase the beauty and history of construction.",
      image: "https://images.pexels.com/photos/29517659/pexels-photo-29517659/free-photo-of-khajuraho-temple-with-lush-greenery-at-daytime.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <Fragment>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Explore Categories</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-lg group-hover:opacity-75 transition duration-300 ease-in-out"  onClick={() => toggleSelectCategory(category.name)}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-64"
              />
               <div
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 ${
                    selectedCategory.includes(category.name)
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                 
                >
                  {selectedCategory.includes(category.name) ? "✓" : ""}
                </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-700">{category.name}</h3>
                <p className="mt-2 text-gray-500">{category.description}</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition duration-300 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

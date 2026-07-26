import CategoryCard from "../common/CategoryCard/CategoryCard.jsx";

const categories = [
  {
    name: "Bienestar",
    icon: "fa-solid fa-leaf",
    theme: "emerald",
  },
  {
    name: "Tecnología",
    icon: "fa-solid fa-microchip",
    theme: "blue",
  },
  {
    name: "Hogar",
    icon: "fa-solid fa-house-chimney",
    theme: "orange",
  },
  {
    name: "Nutrición",
    icon: "fa-solid fa-apple-whole",
    theme: "red",
  },
  {
    name: "Moda",
    icon: "fa-solid fa-shirt",
    theme: "pink",
  },
  {
    name: "Deportes",
    icon: "fa-solid fa-dumbbell",
    theme: "amber",
  },
  {
    name: "Mascotas",
    icon: "fa-solid fa-paw",
    theme: "amber",
  },
  {
    name: "Accesorios",
    icon: "fa-solid fa-glasses",
    theme: "indigo",
  },
];

export default function CategoryList(){

    return(

        <div className="flex justify-center flex-wrap gap-8 md:gap-16">

            {

                categories.map(category=>(

                    <CategoryCard
                        key={category.name}
                        category={category}
                    />

                ))

            }

        </div>

    )

}
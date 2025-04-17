import { categories } from "../../data/categories"
import { CategoryCard } from "./CategoryCard"
export function Categories({setCategory,category}){
    return <ul className="CategoriesContainer">
            <li className={`${category === "all" ? "active" :""}`} 
                onClick={()=> setCategory('all')}>
                    Tous
            </li>
            {/* La liste des categories ici */}
            {categories.map(element => (
                <CategoryCard 
                    key={element} 
                    name={element}
                    setCategory={setCategory}
                    category={category}
                />))}
        </ul>
}
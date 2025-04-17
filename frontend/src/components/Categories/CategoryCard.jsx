export function CategoryCard({name,setCategory,category}){
    console.log(name)
    return <li 
                className={`${category === name ? "active" :""}`}
                onClick={()=> setCategory(name)}
            >
        {name}
    </li>
}
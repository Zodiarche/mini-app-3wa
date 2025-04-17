
import { CommentCard } from "./CommentCard";

export function Comments({filteredComment}){
    
    return (
        <ul className="CommentsContainer">
            {filteredComment?.map(({title,message,category,date,id})=>(
                <CommentCard 
                    key={id}
                    title={title}
                    message={message}
                    category={category}
                    date={date}
                />
            ))}
        </ul>
    )
}
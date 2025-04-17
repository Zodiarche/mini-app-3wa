export function CommentCard({title,message,date,category}){
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    return(
        <li >
            <h2>{title}</h2>
            <span> Catégorie : {category} </span>
            <p> {message} </p>
            <p> {new Date(date).toLocaleDateString('fr-FR',options)} </p>
        </li>
    )
}
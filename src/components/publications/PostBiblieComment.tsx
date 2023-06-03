
 

const PostBiblieComment = ( props:
    { content: string, likes_count?: number, comments_count?: number, shared_count?: number }) => {
  return (
    <div> 
         {props.content}
    </div>
  )
}

export default PostBiblieComment
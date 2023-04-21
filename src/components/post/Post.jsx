import styles from "./Post.module.css"

import React, { useState } from 'react'
import { Comment } from "./comment/Comment"
import { Avatar } from "../avatar/Avatar"
import { format as formatDate, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"


// author: { imgUrl: string, name: string, role: string }
// post: { content: {type: 'a' | 'p', content: string}[], postedAt: Date, comments: { content: string, postedAt: Date, likes: number }[]}

function Post({ id, author, post, handleNewComment, onDeleteComment, onAddMoreLikes }) {

  const ISODate = new Date(post.postedAt)
  const [ newCommentText, setNewCommentText ] = useState("")
  const brFormattedDate = formatDate(ISODate,"dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR})

  const postedAtRelativeToNow = formatDistanceToNow(ISODate, {
    locale: ptBR,
    addSuffix: true
  })

  function handleSubmit(e){
    e.preventDefault()

    if(newCommentText.length === 0) return
    handleNewComment(id, newCommentText, new Date())
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.imgUrl} hasBorder/>
          <div className={styles.authorInfo}>
            <h3><strong>{author.name}</strong></h3>
            <p className={styles.authorJob}>{author.role}</p>
          </div>
        </div>

        <time title={brFormattedDate} dateTime={ISODate}>Publicado {postedAtRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          post.content.map(line => {
            const { type, content } = line
            if(type === "a") return <p key={`${type}_${content}`}><a href="#">{content}</a></p>
            else return <p key={`${type}_${content}`}>{content}</p>
          })
        }
      </div>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <strong>Deixe seu feedback</strong>

        <textarea value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Deixe um comentário" />
        <div className={styles.buttonWrapper}>
          <button type="submit">Publicar</button>
        </div>
        
      </form>

      <div className={styles.commentList}>
        {
          post.comments?.map(comment => {
            const { content, postedAt, likes } = comment

            return <Comment key={content} likes={likes} content={content} postedAt={postedAt} onDeleteComment={onDeleteComment} onAddMoreLikes={onAddMoreLikes} id={id} />
          })
        }
      </div>
    </article>
  )
}

export { Post }
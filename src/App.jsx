import "./global.css"
import { Header } from './components/header/Header'
import styles from "./App.module.css"
import { Sidebar } from "./components/sidebar/Sidebar"
import { Post } from "./components/post/Post"
import { useEffect, useState } from "react"


// author: { imgUrl: string, name: string, role: string }
// post: { content: string, postedAt: Date}

const mockedPosts = [
  {
    id: "01",
    author: {
      imgUrl: "https://avatars.githubusercontent.com/u/71572565?v=4",
      name: "Luiz Felipe Souza",
      role: "Dev front-end"
    },
    post: {
      content: [
        {type: "p", content:"Falaaa galera, primeiro post aqui pra testar 👌"},
        {type: "a", content:"#primeiroProjeto"}
      ],
      postedAt: new Date("2023-04-21 11:35:00"),
      comments: [
        { content: "Uau !! ✌️", postedAt: new Date("2023-04-21 14:29:00"), likes: 0}
      ]
    }
  },
  {
    id: "02",
    author: {
      imgUrl: "https://images.unsplash.com/photo-1611590027211-b954fd027b51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=30",
      name: "Naiara Gomes",
      role: "Designer"
    },
    post: {
      content: [
        {type: "p", content:"Olhaaa que legal!"},
        {type: "a", content:"#primeiroProjeto"},
        {type: "a", content:"#primeiroDeMuitos"}
      ],
      postedAt: new Date("2023-04-21 14:35:00"),
      comments: []
    }
  },

]

function App() {

  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const data = localStorage.getItem("allPostsAndComments")

    if(!data) setPosts(mockedPosts)
    else setPosts(JSON.parse(data))
  },[])
   
  function handleNewComment(id, content, postedAt){

    const newPosts = posts.map( post => {

      if(post.id === id) {
        post.post.comments = [...post.post.comments, {content, postedAt, likes: 0}]
        return post
      }
      return post
    })

    localStorage.setItem("allPostsAndComments", JSON.stringify(newPosts))
    setPosts(newPosts)


  }

  function handleDeleteComment(id, commentToDelete){

    const commentsWithoutDeletedOne = posts.map( post => {
      if(post.id === id){
        const commentsCleaned = post.post.comments.filter((comment) => {
          return comment.content !== commentToDelete
        })

        post.post.comments = commentsCleaned

        return post
      }
      return post
    })

    setPosts(commentsWithoutDeletedOne)

    localStorage.setItem("allPostsAndComments", JSON.stringify(commentsWithoutDeletedOne))

  }

  function handleAddMoreLikes(id, commentToLike){

    const postsWithNewLikes = posts.map( post => {

      if( post.id === id){
        const postWithNewAmoutOfLikes = post.post.comments.map( comment => {
          if(comment.content === commentToLike){
            comment.likes = comment.likes ? comment.likes + 1 : 1
            return post.post
          }
          post.post = postWithNewAmoutOfLikes
          return post
        })

        return post
      }

      return post
    })

    setPosts(postsWithNewLikes)
    localStorage.setItem("allPostsAndComments", JSON.stringify(postsWithNewLikes))
  }

  return (
    <div className="App">
      <Header />

      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>

        <main>
          {
            posts.map(singlePost => {
              const {author, id, post} = singlePost
              return (
                <Post
                  author={author}
                  post={post}
                  id={id}
                  handleNewComment={handleNewComment}
                  onDeleteComment={handleDeleteComment}
                  onAddMoreLikes={handleAddMoreLikes}
                  key={id}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}

export default App

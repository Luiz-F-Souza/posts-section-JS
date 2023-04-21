import styles from  "./Sidebar.module.css"
import { PencilLine } from "@phosphor-icons/react"
import { Avatar } from "../avatar/Avatar"


function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <img className={styles.cover} src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" alt="Imagem de capa escolida pelo usuário" />

      <div className={styles.profile}>
        <Avatar src="https://avatars.githubusercontent.com/u/71572565?v=4" hasBorder />
        <p className={styles['user-name']}><strong>Luiz Felipe</strong></p>
        <p className={styles['user-job']}>Front end Developer</p>
      </div>

      <footer className={styles.footer}>
        <a href="#"> 
        <PencilLine size="20" />
        Editar seu perfil
        </a>
      </footer>
    </div>
  )
}

export { Sidebar }
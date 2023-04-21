import styles from "./Avatar.module.css"

function Avatar({src, hasBorder}) {
  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt="Imagem de perfil do usuário" />
  )
}

export { Avatar }
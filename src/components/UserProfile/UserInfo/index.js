import styles from './Styles.module.scss'

export default function UserInfo({src, description, link}) {
  return (
    <a className={styles.contentList} href={link} target="_blank">
      <img className={styles.iconList} src={src}/>
      {description}
    </a>
  );
}
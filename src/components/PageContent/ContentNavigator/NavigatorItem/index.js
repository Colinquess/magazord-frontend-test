import styles from './Styles.module.scss'

export default function NavigatorItem({ image, name, counter, selected, value, handleClick }) {

  const otherClass = selected ? styles.enable : styles.disabled

  return (
    <span className={[styles.container , otherClass].join(' ')} onClick={() => handleClick(value)}>
      <img src={image} className={selected ? null : styles.unSelectedItem}/>
      <p className={styles.name}>
        {name}
      </p>
      <div className={styles.counter}>
        <span className={styles.counterNumber}>{counter}</span>
      </div>
    </span>
  )
}
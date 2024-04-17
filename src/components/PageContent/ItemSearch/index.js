import { useState, useEffect, useRef } from 'react'
import styles from './Styles.module.scss'

const ItemSearch = ({ searchHandles, languagesHandles, typesHandles }) => {

  const [search, setSearch] = searchHandles
  const [languages, setLanguages] = languagesHandles
  const [types, setTypes] = typesHandles

  const [showLanguage, setShowLanguage] = useState(false)
  const [showType, setShowType] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)

  let dragInitialPos = 0
  let dragPosY = 0
  let dragRoofLimit = 0
  let headerRef = null

  const typeHeaderRef = useRef(null)
  const languageHeaderRef = useRef(null)

  const handleLanguageStateChange = (e) => {

    const languageindex = e.target.getAttribute('languageindex')

    const { checked } = e.target

    let changedLanguages = [...languages]

    changedLanguages[languageindex].check = checked

    setLanguages(changedLanguages)

  }

  const handleTypeStateChange = (e) => {

    const typeindex = e.target.getAttribute('typeindex')

    const { checked } = e.target

    let changedTypes = [...types]

    changedTypes[typeindex].check = checked

    setTypes(changedTypes)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleTypeClick = () => {
    setShowType(state => !state)
    setShowLanguage(false)
  }

  const handleLanguageClick = () => {
    setShowLanguage(state => !state)
    setShowType(false)
  }

  const handleMagnifyClick = () => {
    setShowSearchBox(state => !state)
  }

  const handleHideOptions = () => {
    if(headerRef && headerRef.current)
    {
      headerRef.current.removeEventListener('mousedown', dragStart)
      headerRef.current.removeEventListener('touchstart', dragStart)
    }

    document.removeEventListener('mousemove', dragMove)
    document.removeEventListener('touchmove', dragMove)

    document.removeEventListener('mouseup', dragEnd)
    document.removeEventListener('touchend', dragEnd)
    
    setShowType(false)
    setShowLanguage(false)
    setShowSearchBox(false)
  }

  const dragMove = (e) =>{
    if(headerRef && headerRef.current)
    {
      if(e.touches)
      {
        dragPosY = e.touches[0].screenY - dragInitialPos
  
        if(e.touches[0].screenY > dragRoofLimit)
          headerRef.current.parentElement.style.transform = `translateY(${dragPosY}px)`
      }
      else
      {
        dragPosY = e.screenY - dragInitialPos
  
        if(e.screenY > dragRoofLimit)
          headerRef.current.parentElement.style.transform = `translateY(${dragPosY}px)`
      }
    }
  }

  const dragStart = (e) => {
    if(e.touches)
    {
      dragRoofLimit = e.touches[0].screenY
      dragInitialPos = e.touches[0].screenY
    }
    else
    {
      dragRoofLimit = e.screenY
      dragInitialPos = e.screenY
    }

    document.addEventListener('mousemove', dragMove)
    document.addEventListener('touchmove', dragMove)
  }

  const dragEnd = (e) => {
    if(dragPosY > (window.innerHeight * 0.5))
    {
      handleHideOptions()
    }
    else
    {
      if(headerRef && headerRef.current)
        headerRef.current.parentElement.style.transform = ''

      document.removeEventListener('mousemove', dragMove)
      document.removeEventListener('touchmove', dragMove)
    }

    headerRef = null
    dragRoofLimit = 0
    dragInitialPos = 0
  }

  const pullDownToCloseHandler = () => {
    if(headerRef && headerRef.current && !(window.innerWidth > 641))
    {
      headerRef.current.addEventListener('mousedown', dragStart)
      headerRef.current.addEventListener('touchstart', dragStart)

      document.addEventListener('mouseup', dragEnd)
      document.addEventListener('touchend', dragEnd)
    }
  }

  useEffect(() => {
    if(showType)
    {
      headerRef = typeHeaderRef
      pullDownToCloseHandler()
    }
  }, [showType])

  useEffect(() => {
    if(showLanguage)
    {
      headerRef = languageHeaderRef
      pullDownToCloseHandler()
    }
  }, [showLanguage])

  return (
    <>
      {
        (showType || showLanguage || showSearchBox) ? 
          <div className={styles.mask} onClick={handleHideOptions}></div>
          : null
      }
      <div className={(showSearchBox ? [styles.invertedContainer, styles.container].join(' ') : styles.container)}>

        <div className={styles.searchContainer}>
          <img 
            src={`/assets/search.svg`}
            className={styles.searchMagnify}
            onClick={handleMagnifyClick}
          />
          <input
            className={showSearchBox ? styles.searchBox : null}
            type="text"
            placeholder="Search Here"
            value={search}
            autoFocus
            onChange={handleSearchChange}
          />
        </div>

        <div className={(showSearchBox ? [styles.hiddenButtonContainer, styles.buttonContainer].join(' ') : styles.buttonContainer)}>
          <div>
            <span onClick={handleTypeClick} className={styles.buttonOption}>
              <img src={`/assets/checked.svg`} className={styles.iconChecked}/>
              <span className={styles.buttonText}>
                Type
              </span>
            </span>
            {showType ? 
              <div className={styles.listBodyContainer}>
                <div className={styles.listBody}>
                  <div className={styles.listHeader} ref={typeHeaderRef}>
                    <div className={styles.listHandle}>
                      <img src={`/assets/rectangle.svg`} className={styles.iconRectangle}/>
                    </div>
                    <div className={styles.listTitle}>
                      <span className={styles.listTitleText}>
                        Type
                      </span>
                      <img
                        src={`/assets/x.svg`}
                        onClick={handleHideOptions}
                        className={styles.listTitleX}
                      />
                    </div>
                  </div>
                  <ul>
                    {types.map((type, typeindex) => (
                      <li className={styles.itemList} key={type.id}>
                        <div className={styles.containerItemList}>
                          <input
                            type="checkbox"
                            typeindex={typeindex}
                            onChange={handleTypeStateChange}
                            checked={type.check}
                            className={styles.inputItemList}
                          />
                          <label htmlFor={type.id} className={styles.labelItemList}>
                            {type.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            : null}
          </div>

          <div>
            <span onClick={handleLanguageClick} className={styles.buttonOption}>
              <img src={`/assets/checked.svg`} className={styles.iconChecked}/>
              <span
                className={styles.buttonText}
              >
                Language
              </span>
            </span>
            {showLanguage ? 
              <div className={styles.listBodyContainer}>
                <div className={styles.listBody}>
                  <div className={styles.listHeader} ref={languageHeaderRef}>
                    <div className={styles.listHandle}>
                      <img src={`/assets/rectangle.svg`} className={styles.iconRectangle}/>
                    </div>
                    <div className={styles.listTitle}>
                      <span className={styles.listTitleText}>
                        Language
                      </span>
                      <img
                        src={`/assets/x.svg`}
                        onClick={handleHideOptions}
                        className={styles.listTitleX}
                      />
                    </div>
                  </div>
                  <ul>
                    {languages.map((language, languageindex) => (
                      <li className={styles.itemList} key={language.id}>
                        <div className={styles.containerItemList}>
                          <input
                            type="checkbox"
                            languageindex={languageindex}
                            onChange={handleLanguageStateChange}
                            checked={language.check}
                            className={styles.inputItemList}
                          />
                          <label
                            className={styles.labelItemList}
                            htmlFor={language.id}
                          >
                            {language.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemSearch
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [wishlist, setWishlist] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) return

    setWishlist(prevWishes => [
      ...prevWishes,
      {
        id: uuidv4(),
        text: trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1),
      },
    ])
    setInputValue('')
  }

  const handleDeleteWish = id => {
    setWishlist(prev => prev.filter(wish => wish.id !== id))
  }

  const handleClearWishes = () => {
    setWishlist([])
  }

  {
    /*
      Стилизация компонентов:
      - Стили для элементов списка вынесены в отдельные переменные (ниже), чтобы код был чище.
      - Остальные стили написаны инлайново, так как это требование тестового задания.
      - Использовал `flexbox` для удобного позиционирования элементов.
      - Настроил ширину, паддинги и шрифты для согласованного вида.
      - Сделал обрезку длинного текста (`textOverflow: ellipsis`), чтобы список выглядел аккуратно.
      - Ну а так вообще сильно не заморачивался по поводу стилей :)
  */
  }
  const liElemStyles = {
    width: '100%',
    boxSizing: 'border-box',
    fontWeight: '300',
    padding: '8px 12px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  }
  const spanInsideLiElemStyles = {
    flex: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordBreak: 'break-word',
  }
  const btnInsideLiElemStyles = {
    flexShrink: '0',
    width: '90px',
    padding: '4px 12px',
    fontFamily: 'inherit',
    fontWeight: '300',
    fontSize: '1rem',
    border: 'none',
    outline: 'none',
    borderRadius: '4px',
    backgroundColor: '#343F7C',
    color: '#fff',
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '520px',
        margin: '60px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
      <form
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          backgroundColor: '#d6d6d6',
          borderRadius: '8px',
        }}
        onSubmit={handleFormSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          placeholder="Введите желание"
          onChange={handleInputChange}
          style={{
            fontFamily: 'inherit',
            fontSize: '1rem',
            flex: '1',
            width: '76%',
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            outline: 'none',
          }}
        />
        <button
          style={{
            width: '24%',
            fontFamily: 'inherit',
            fontSize: '1rem',
            fontWeight: '400',
            padding: '8px 12px',
            border: '1px solid #343F7C',
            outline: 'none',
            borderRadius: '4px',
            backgroundColor: '#343F7C',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={!inputValue.trim()}>
          + Добавить
        </button>
      </form>
      <ul
        style={{
          width: '100%',
          boxSizing: 'border-box',
          margin: '0',
          padding: '16px',
          backgroundColor: '#d6d6d6',
          borderRadius: '8px',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
        {wishlist.length ? (
          wishlist.map(wish => (
            <li key={wish.id} style={liElemStyles}>
              <span style={spanInsideLiElemStyles} title={wish.text}>
                {wish.text}
              </span>
              <button
                style={btnInsideLiElemStyles}
                onClick={() => handleDeleteWish(wish.id)}>
                Удалить
              </button>
            </li>
          ))
        ) : (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '400',
            }}>
            Пока желаний нет...
          </p>
        )}
      </ul>
      {wishlist.length > 0 && (
        <button
          style={{
            padding: '8px 16px',
            fontFamily: 'inherit',
            fontWeight: '400',
            fontSize: '1rem',
            border: 'none',
            outline: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleClearWishes}>
          Очистить всё
        </button>
      )}
    </div>
  )
}
{
  /*
    Адаптация для работы с бэкендом:
    - Вместо хранения списка желаний в `useState`, я бы загружал данные с сервера при помощи `fetch` и `useEffect`.
    - Добавление нового желания отправляло бы `POST`-запрос на API, а затем обновляло бы состояние.
    - Удаление желания выполнялось бы через `DELETE`-запрос, после чего список обновлялся бы на клиенте.
    - Чтобы данные сохранялись между сессиями, сервер хранил бы список желаний в базе данных.
    - Можно также использовать `useContext` или Redux для глобального хранения данных.
    - В реальном проекте я бы добавил обработку ошибок и UI-индикаторы загрузки.
  */
}

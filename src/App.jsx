
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [list, setList] = useState([])
  const [todo, setTodo] = useState('')
  const getAllData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10'
    const response = await axios.get(url)
    const { data } = response
    console.log(data)
    setList(data)
  }
  useEffect(() => {
    getAllData()
  }, [])

  const handleDelete = (id) => {

    const findTask = list.filter((element) => element.id !== id)
    setList(findTask)

  }

  const handleSubmit = () => {
    if (todo.length > 0) {
      const newList = [
        ...list,
        {
          id: list.length + 1,
          userId: 1,
          title: todo
        }
      ]
      setList(newList)

    }
    //TODO:Elimianr el texto
    // console.log(document.getElementsByName('tarea'))
  }
  useEffect(() => {

  }, [list])
  const handleComplete = (id) => {
    //Buscar si existe el element

    const findTask = list.filter((element) => element.id == id)

    if (findTask) {
      const newList = list.map((element) => {
        if (element.id == id) {
          return {
            ...element,
            completed: element.completed ? false : true
          }

        }
        return element;
      })
      setList(newList)
    }

  }

  return (

    <>
      <h1 className='flex items-center justify-center uppercase font-extrabold text-4xl text-green-500'>Lista de tareas por hacer </h1>
      <div className='justify-center items-center flex content-center h-screen'>

        <div className='grid gap-4 grid-cols-2 w-1/3 '>

          {list.length > 0 ?
            list.map((element) => (
              <div className='rounded-2xl bg-green-500 p-2 text-white cursor-pointer  
               ' key={element.id}>
                <div className='flex justify-between' >
                  <div className='rounded-4xl bg-amber-50 w-1/4 text-green-600 justify-center items-center flex'>
                    {element.id}
                  </div>
                  <div className='cursor-pointer hover:bg-amber-50 hover:text-green-500  flex justify-center items-center rounded-full w-5' onClick={() => { handleDelete(element.id) }}>
                    X
                  </div>


                </div>
                <p
                  className=' p-1 rounded-2xl min-h-16'
                >{element.title}</p>
                <div
                  className='flex items-center  justify-center  p-1' onClick={() => { handleComplete(element.id) }}
                >
                  {
                    element.completed ? <div className='flex item-center justify-center w-1/2 bg-white rounded-2xl p-1 '>✅</div> :
                      <div className='flex item-center justify-center w-1/2 bg-white rounded-2xl p-1 '>❌</div>

                  }
                </div>
              </div>
            )
            )
            : <>No hay datos</>

          }
        </div>
        <div className=' w-1/3 '>
          <div className='flex flex-col items-center justify-center h-screen gap-4 uppercase text-green-500 font-bold'>
            Ingresa tu tarea
            <div>
              <div className='grid grid-cols-1 gap-2  p-2'>
                <input
                  className='bg-gray-100 p-2 text-center min-w-30 w-120 rounded-2xl  text-black'
                  name='tarea'
                  onChange={(e) => { setTodo(e.target.value) }}
                  type='text' placeholder='Ingresa tu nueva tarea'>
                </input>
                <button
                  onClick={() => handleSubmit()}
                  className='bg-green-400 text-white w-30 rounded-2xl hover:bg-green-900'>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App

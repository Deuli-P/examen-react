import { useEffect, useReducer, useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList';
import { v4 as uuidv4 } from 'uuid';


const intialState = []


const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":{
        const newList = [...state, action.payload];
        console.log("[REDUCER] ADD:",newList);
      return newList;
      }
    case "INIT":{
      const newList = action.payload
        return newList 
      }
    case "DELETE":{
        const newList = state.filter((product)=> product.id !== action.payload)
        return newList;
    }
    case 'UPDATE': {
        const newList = state.map(item => {
          if(item.id === action.payload.id){
            return action.payload.item
          }
          return item
        })
        return newList
    }
    default:
      return state;
  }
};

function App() {
  
  const [ list, dispatch ] = useReducer(reducer, intialState)

  const [ isAdd, setIsAdd ] =useState(false)

  const addProduct =(element)=> {
    const newProduct = {...element}
    newProduct.id = uuidv4()
    setIsAdd(true)
    dispatch({type:"ADD", payload: newProduct})
    setTimeout(()=> setIsAdd(false),[1500])
  }

  const deleteProduct = (id)=> {
    dispatch({type:"DELETE", payload:id})
    localStorage.setItem('list',JSON.stringify(list))
  }

  const editProduct=(id,newItem)=> {
      dispatch({
        type:"UPDATE", 
        payload:{
          id:id, 
          item:newItem
        }
      })
  }

  const StoreList =(newList)=> {
    localStorage.setItem('list',JSON.stringify(newList))
  }

  useEffect(()=> {
    const stored = localStorage.getItem('list')

    if(stored){
      dispatch({ type:"INIT", payload:JSON.parse(stored)})
    }
  },[])


  useEffect(()=> {

    StoreList(list)
  },[list])

  return (
    <>
      <header className='w-full h-20 bg-blue-400 flex justify-center items-center'>
      <h1 className='font-bold text-xl text-white'>Examen React</h1>
      </header>
      <main className='flex flex-col items-center'>
        <ProductForm addElement={addProduct} success={isAdd}/>
          <div className='w-[70%] h-1 bg-slate-400 rounded-full'/>
        <ProductList productList={list} onDelete={deleteProduct} onEdit={editProduct}/>
      </main>
    </>
  )
}

export default App

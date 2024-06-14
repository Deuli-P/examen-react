import { useRef, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const ProductForm = ({addElement,success}) => {

    const formEmpty={
        name: "",
        description:"",
        price: 0,
    }

    const formRef = useRef(null)

    const [ newForm, setNewForm ] = useState(formEmpty)

    const onSubmit=(e) => {
        e.preventDefault()
        addElement(newForm)
        setNewForm(formEmpty)
        formRef.current[0].focus()
    }

    const onChange=(e)=>{
        const value = e.target.value

        setNewForm((prev)=>(
            {
                ...prev,
                [e.target.name]: value
            }
        ))
    }

  return (
    <form ref={formRef} onSubmit={onSubmit} className='flex flex-col justify-start items-center py-10 gap-6'>
        <div className='w-[400px] flex flex-col justify-start'>
            <label htmlFor="name" className=' flex flex-col'>
                Name
                <input 
                    type="text" 
                    name='name'  
                    value={newForm.name} 
                    onChange={onChange}
                    className=' px-2 py-1 bg-slate-200 ring-0 forcus:ring-2 focus:ring-red-600 rounded-lg'
                />
            </label>
            <label htmlFor="price" className=' flex flex-col items-end'>
                Prix
                <input 
                    type="number" 
                    name='price'  
                    value={newForm.price} 
                    onChange={onChange}
                    className=' px-2 py-1 w-[100px] bg-slate-200 ring-0 forcus:ring-2 focus:ring-red-600 rounded-lg'
                />
            </label>
            <label htmlFor="name" className=' flex flex-col'>
                Description
                <textarea 
                    type='text'
                    name='description'  
                    value={newForm.description} 
                    onChange={onChange}
                    className=' h-24 px-2 py-1 bg-slate-200 ring-0 forcus:ring-2 focus:ring-red-600 rounded-lg '
                />
            </label>
        </div>
        { success ?
            <div className='size-10 duration-300 animate-bounce transition-all ease-out rounded-full bg-green-400 text-white flex justify-center items-center'>
                <FaCheck />
            </div>
        :
            <button className='py-2 px-4 bg-blue-700 text-white rounded-full'>Ajouter</button>
        }
    </form>
  )
}

export default ProductForm
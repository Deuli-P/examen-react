import { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdCancel, MdEdit } from "react-icons/md";


const Card = ({product,onDelete,onEdit}) => {

    const [editProductValue, setEditProductValue ] = useState(product)

    const{ name, id, description, price} = product
    const[ isEdit, setIsEdit ] = useState(false)

    // lorsque isEdit est true
        // transform la card en cardEdit
        // Lors de la validation du formulaire renvoi le editProduct dans onEdit

    const handleDelete=()=> {
        onDelete(id)
    }

    const handleEdit=()=> {
        onEdit(id,editProductValue)
        setIsEdit(false)
        setEditProductValue(product)
    }

    const onChange=(e)=> {
        
        setEditProductValue(prev =>({
            ...prev,[e.target.name]: e.target.value
        }))
    }

    const RenderCardEdit=()=> (
        <form  
            onSubmit={handleEdit}
            className='flex flex-col h-full gap-4 rounded-lg shadow-md w-full md:w-[450px] min-w-[250px] max-[450px] bg-slate-300 p-4'
        >
            <label 
                htmlFor="edit-name"
                className="flex flex-col gap-1"
            >
                Name:
            <input 
                className='font-bold' 
                autoComplete
                value={editProductValue.name} 
                type="text" 
                name="name"
                onChange={onChange}
                />
            </label>
            <label 
                htmlFor="edit-description" 
                className="flex flex-col items-start"
            >
                Description:
            <textarea 
                className='h-20 w-full'
                value={editProductValue.description} 
                name="description"
                onChange={onChange}
                />
                </label>
            <label 
                htmlFor="edit-price"
                className="flex flex-col gap-1"
            >
                Prix:
            <input 
                value={editProductValue.price}  
                type="number" 
                name="price"
                onChange={onChange}
                className="w-auto"
            />
            </label>
            <div className="flex flex-row gap-4 w-full justify-center">
                <button 
                    className="size-8 p-2 bg-green-200 rounded-full shadow-lg hover:shadow-none duration-150 transition-all ease-in flex items-center justify-center"
                    onClick={handleEdit}
                    >
                    <FaCheck className="text-green-500 w-full h-full"/>
                </button>
                <button 
                    className="size-8 p-2 bg-red-500 rounded-full shadow-lg hover:shadow-none duration-150 transition-all ease-in flex items-center justify-center"
                    onClick={()=>{
                        setIsEdit(false)
                        setEditProductValue(product)
                        }}
                        >
                    <MdCancel className="text-red-200 w-full h-full"/>
                </button>
            </div>
        </form>
    )

    const RenderCard=()=> (
        <article  className='flex flex-col h-full gap-4 rounded-lg shadow-md w-full md:w-[450px] min-w-[250px] max-[450px] bg-slate-300 p-4' >
            <div className="flex flex-row justify-between items-center">
            <span className='font-bold' >{name}</span>
            <div className="flex flex-row gap-2">
                <div 
                    className="size-8 p-2 bg-green-200 rounded-full shadow-lg hover:shadow-none duration-150 transition-all ease-in flex items-center justify-center"
                    onClick={()=> setIsEdit(true)}
                    >
                    <MdEdit className="text-green-500 w-full h-full"/>
                </div>
                <div 
                    className="size-8 p-2 bg-red-200 rounded-full shadow-lg hover:shadow-none duration-150 transition-all ease-in flex items-center justify-center"
                    onClick={handleDelete}
                    >
                    <FaTrash className="text-red-500 w-full h-full"/>
                </div>
            </div>
            </div>
            <div className='flex flex-row justify-between w-full items-end' >
                <p className='max-w-[80%]' >{description}</p>
                <div className='flex flex-row justify-start' >
                    <strong className='text-blue-400 font-semibold ' >{price}</strong>
                    <p className=''>€</p>
                </div>
            </div>
    </article>
    )


  return (
    <>
        {isEdit ? 
            (<RenderCardEdit />)
        :
            (<RenderCard />)
        }
    </>
  )
}

export default Card
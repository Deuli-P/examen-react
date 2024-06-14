import Card from './Card'

const ProductList = ({productList,onDelete,onEdit}) => {


    console.log("Longueur productList:",productList.length);
    console.log("productList:",productList);
  return (
    <section className='flex flex-col items-center py-10 gap-6'>
        <h2 className=' font-medium underline underline-offset-4'>Liste des Produits vendu</h2>
        <div className='flex lg:flex-row lg:flex-wrap gap-3 flex-col items-center lg:justify-center'>
            {productList && productList.length > 0 ?
                productList.map((item)=> <Card product={item} key={item.id} onEdit={onEdit} onDelete={onDelete}/>)
            :
            <span className='text-red-400'>Aucun objet n&apos;est vendu pour le moment</span>
            }
        </div>
    </section>
  )
}

export default ProductList

const { log } = require('console');
const fs = require('fs').promises
const { json } = require('stream/consumers')


class ProductManager {
    constructor() {
        
        this.path =  `${__dirname}../assets/productos.json`
        this.products = []
    }

    static id = 0;

    addProducts = async  (title, description, price, thumbnail, code, stock) => { 

        ProductManager.id++
        
        for(let i = 0; i < this.products.length;i++){
            if(this.products[i].code === code) {
                console.log( `el codigo ${code} esta repetido `);
                break;
            }
        }
        
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
            
        }
        
        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++;
            this.products.push({...
                newProduct,
                id: ProductManager.id,
            }); 
           
        } 
        else {console.log("todos los campos son requeridos");
        }

        this.products.push(newProduct)
        

        await fs.writeFile(this.path, JSON.stringify(this.products, null, "    ")) 
    }

    getProduct() {
        return this.products;
        
    }

    existe (id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductbyId(id) {
        !this.existe(id)? console.log("Not Found") : console.log(this.existe(id));


        
       
    }

    
   
     async createProduct (title, description, price, thumbnail, code, stock,id){
         const productos = {title, description, price, thumbnail, code, stock,id}
   
         const existingProduct = await this.updateProducts(this.existe)
   
         existingProduct.push(productos)
   
         const productContents= JSON.stringify(existingProduct, null, "    ")
         await fs.writeFile(this.path, productContents)
        }

     async updateProducts (){
       
         try {  
            const productContents = await fs.readFile(this.path)
            const existingProduct = JSON.parse(productContents)
    
            return(existingProduct)
         }
         catch {
             return []
         }
         }

        




                //eliminar producto

                async deleteProduct  (id)  {
                    try {
                        
                        let contenido = await fs.readFile(this.path, 'utf-8');
                        let productos = JSON.parse(contenido);
                                    
                        let productosActualizados = productos.filter((producto) => producto.id !== id);
                       
                        let nuevoContenido = JSON.stringify(productosActualizados, null, 1 );
                                  
                        await fs.writeFile(this.path, nuevoContenido, 'utf-8');
            
                        console.log('Producto eliminado correctamente.');
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                    }
                }   
                    
            
                
}



const productos = new ProductManager

// console.log(productos.getProduct());

   productos.addProducts('samsung', 'descripcion1', 100000, 'imagen1', 'abc123', 100,)
 // productos.addProducts('titulo2', 'descripcion2', 100000, 'imagen2', '001abc', 5)
 // productos.addProducts('titulo3', 'descripcion3', 100000, 'imagen3', '001abc', 5)
 

 //console.log(productos.getProduct());


 

//    productos.getProductbyId(1);
//   productos.getProductbyId(4);


  const main = async () => {      const productManager = new ProductManager(this.path)
     

     await productManager.createProduct({
              title: 'iphone',
              description: 'description1',
              price: 4000,
              thumbnail: 'thumbnail1',
               code: 'abc123',
               stock: 5,
               id: 2,
            })
   

      console.log(await productManager.updateProducts());
  }
    // main()



productos.deleteProduct(2);
 

 

 


  module.exports = ProductManager
 







 


 
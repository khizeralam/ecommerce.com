// variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItem = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//cart
let cart = [];
//buttons 
let buttonsDOM = [];
//getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch('products.json')
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item .feilds;
                const {id} =item.sys
                const image = item.feilds.image.feilds.file.url;
                return {title,price,id,image}
            })
            return products    
}
    catch (error) {
            console.log(error);
        }
    }

}

//display products
class UI {
    displayProducts(products){
        let result =  '';
        products.forEach(product => {
            result += `
            <!--Single product -->
            <article class="product">
                <div class="img-container">
                <img src=${product.image} 
                alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                <i class="fa-2x fa fa-shopping-cart"></i>Add to bag</button>
            </div>  
            <h3${product.title}</h3>
            <h4>$${product.price}</h4>          
            </article>

            <!--End of Single product -->
            `;
        });
        productsDOM.innerHTML = result;
    }
     getBagButtons(){
         const buttons = [...document.querySelectorAll(".bag-btn")];
         buttonsDom = buttons;
         buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = 'In Cart';
                button.disabled = true;
            }   else {
                button.addEventListener("click", event => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                //gets proudcts from products 
                let cartItem = Storage.getProduct(id);
                console.log(cartItem)
                //add products to the cart
                //save cart in local storage 
                //set cart values
                //display cart items
                //show cart

                });
            }
         });
     }
}

// local storage class
class Storage {
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProducts(id){
    let products =JSON.parse(localStorage.getItems('products'));
    return products.find(products =>product.id === id )
    }
}

    document.addEventListener("DOMContentLoader", () => {
        const ui = new UI();
        const products = new Products();

        //get all products
        products.getProducts().then(products =>
        { ui.displayProducts(products);
        Storage.saveProducts(products);
        }).then(()=> {
          ui.getBagButtons();
        });
       
    });
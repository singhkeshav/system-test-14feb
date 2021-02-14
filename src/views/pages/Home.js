// --------------------------------
//  Define Data Sources
// --------------------------------
import jsonData from '../../services/cart.js';
'use strict';
let getData = async () => jsonData['items'];
let Home = {
    render: async () => {
        let posts = await getData();

        let self = this;
        let view =  /*html*/`
            <main class="main-container">
                    <section class="section">
                    <hr>
                    <span class="font-title"> All Items</span>
                    <button class="item-added-in-cart"><span id="addedin_cart">0</span> Item Added In Cart</button>
                    <hr>
                        <div class="products">
                        
                        ${posts.map(post =>
                            /*html*/`<div class="product">
                                <div class="discount">${post.discount}% off</div>
                                <img class="product__image" src="${post.image}">
                                <h2 class="product__name">${post.name}</h2>
                                <h3 ><span class="display-price"> ${post.price.display}   </span> <span class="product__price"> ${post.price.actual}</span></h3>
                                <button class="btn btn--primary" data-keshav-data="${post.name}" onclick="addToCart(this)">Add To Cart</button>
                            </div>`
                    ).join('\n ')
                        }
                            
                        </div>
                    </section>

                    <section class="section">
                    <hr>
                    <hr>
                        <div class="cart"></div>
                        <div class="counting" id="counting">
                        Total Item(<span id="cart-total-item-id">0</span>)<span class="total_item_count product__price" id="total_item_count"></span><br/>
                        Discount   <span class="total_discount product__price" id="total_discount"></span>
                        <div class="payU"><span class="order-payu-label">Order Total:</span>     <span class="payu-total product__price" id="payutotal"></span> </div>
                        </div>
                    </section>

	</main>
        `
        return view
    }
    , after_render: async () => {
        let posts = await getData();
        localStorage.setItem('posts', JSON.stringify(posts))
    }

}

export default Home;
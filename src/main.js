// import CartJson from './services/cart';
// var CartJson =  require('./services/cart')
let cart = [];

const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');


//>> Insert New Cart Item In Dom.....
let insertItemToDOM = (product) => {
    const cartDOM = document.querySelector('.cart');
    cartDOM.insertAdjacentHTML('beforeend', `
        <div class="cart__item ${product.name}">
            <img class="cart__item__image" src="${product.image}" alt="${product.name}">
            <h3 class="cart__item__name">${product.name}</h3>
            <h3 class="cart__item__price" id="${product.name}_price">${product.price.actual}</h3>
            <button class="btn btn--primary btn--small${(product.quantity === 1 ? ' btn--danger' : '')}" data-action="DECREASE_ITEM" onclick="decreaseItem(this)" data-product-name="${product.name}" data-product-quanity="${product.quantity}">&minus;</button>
            <h3 class="cart__item__quantity" id="${product.name}">${product.quantity || 1}</h3>
            <button class="btn btn--primary btn--small" data-product-name="${product.name}" data-product-quanity="${product.quantity}" data-action="INCREASE_ITEM" onclick="increaseItem(this)">&plus;</button>
            <button  class="btn btn--danger btn--small" data-product-name="${product.name}" data-product-quanity="${product.quantity}" onclick="removeItem(this)">&times;</button>
        </div>
    `);
}

//>> Remove Item From Cart.....
let removeItem = (e) => {
    let dataSet = e.dataset;
    e.parentNode.parentNode.removeChild(e.parentNode);
    cart = cart.filter(row => row['name']!=dataSet['productName']);
    setTimeout(()=>{totalCount()},1000)

}

//increase Item.....
let  increaseItem = (e) => {
    let dataSet = e.dataset;
    cart = cart.map(row=> {
        if(row['name'] ==dataSet['productName']){
            let quantity = Number(row['quantity'])+1;
            let documentQuantity = document.getElementById(dataSet['productName']);
            let insertPrice =  document.getElementById(dataSet['productName']+'_price');
            documentQuantity.innerHTML = quantity;
            row['quantity'] = quantity;
            row['totalPrice'] =  quantity * row['price']['actual'];
            insertPrice.innerHTML = quantity * row['price']['actual'];
            return row;
        } else{
            return row;
        }
    });

    setTimeout(()=>{totalCount()},1000)
}

//Decrease Item Quantity...
let  decreaseItem = (e) => {
    let dataSet = e.dataset;
    cart = cart.map(row=> {
        if(row['name'] ==dataSet['productName']){
            let quantity = 1;
            if(Number(row['quantity'])>1)
             quantity = Number(row['quantity'])-1;
            let documentQuantity = document.getElementById(dataSet['productName']);
            let insertPrice =  document.getElementById(dataSet['productName']+'_price');
            documentQuantity.innerHTML = quantity;
            row['quantity'] = quantity;
            row['totalPrice'] =  quantity * row['price']['actual'];
            insertPrice.innerHTML = quantity * row['price']['actual'];

            return row;
        } else{
            return row;
        }
    });
    setTimeout(()=>{totalCount()},1000)

}

//Add To Click
let  addToCart = (e) => {
    let postData = JSON.parse(localStorage.getItem('posts'));
    let findObj = postData.find(row=> row['name'] == e.dataset.keshavData)
    findObj['quantity'] = 1;
    findObj['totalPrice'] =  1 * findObj['price']['actual'];

    let isExists = cart.find(row=> row['name'] == e.dataset.keshavData);
    if(!isExists){   
     cart.push(findObj);
     insertItemToDOM(findObj);
     setTimeout(()=>{totalCount()},1000)
    }
}


let totalCount = () =>{
    let totalCount = 0;
    let totalAmount = 0;
    let total_discount = 0;
    let payutotal = 0;
    if(cart.length>0){
        document.getElementById("counting").style.display = "block";
    } else{
        document.getElementById("counting").style.display = "none";

    }

     cart.forEach(element => {
        totalCount+= element['quantity'];
        totalAmount+= element['price']['display']*element['quantity'];
        total_discount+= element['discount'] * element['quantity'];
        payutotal+= element['totalPrice'];
     });

    setTimeout(()=>{
        let totalCountNode = document.getElementById('cart-total-item-id');
        let total_item_count = document.getElementById('total_item_count');
        let total_discount_node = document.getElementById('total_discount');
        let addedin_cart = document.getElementById('addedin_cart');
        let payutotalNode = document.getElementById('payutotal');
        totalCountNode.innerHTML = totalCount;
        total_item_count.innerHTML = totalAmount;
        total_discount_node.innerHTML = total_discount;
        payutotalNode.innerHTML= payutotal;
        addedin_cart.innerHTML= totalCount;
    },100)
}
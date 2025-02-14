
const products = [
    {id: 1,name:"Radio",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3x9a9-AeERT2wnoJC-pZSqFw4xW0y1_V7ZA&s",price:680},
    {id: 2, name: "Webcam",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/projector/i/6/u/i9-pro-10-ei9027-led-projector-egate-original-imah3tzkr5jkzhyq.jpeg?q=70",price: 8990},
    {id: 3, name: "Laptop",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/computer/4/3/o/-original-imah27qsamfccyxz.jpeg?q=70",price: 20768},
    {id: 4, name: "Laptop",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/computer/a/0/5/-original-imagvrefuybuvbe5.jpeg?q=70",price: 12456},
    {id: 5, name: "Smart Watch",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/g/w/4/-original-imagxp8uu5pequex.jpeg?q=70",price: 1399},
    {id: 6, name: "Cycle",Image:"https://rukminim2.flixcart.com/image/612/612/l58iaa80/electric-cycle/i/y/f/-original-imagfykthgudy4qz.jpeg?q=70",price: 33789},
    {id: 7, name: "Toy",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/musical-keyboard/i/v/i/37-0-2-a151-piano-toy-with-microphone-usb-power-cable-sound-original-imah3wpggrtxddyg.jpeg?q=70",price: 789},
    {id: 8, name: "Mobile",Image:"https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/k/h/-original-imah5ywff9rr76zh.jpeg?q=70",price: 30999},
]

//Render Products

function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML= `
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick = "addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}

//Search functionality
function searchProducts(query){
    const filterProducts = products.filter(product => 
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}

//Add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//Sorting
function sortProducts(criteria){
 if(criteria === "price"){
    return products.sort((a,b) => a.price-b.price);
 }
 return products;
}

//Adding Event listners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//Add to cart

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`)
    renderCart();
}

//Render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}

//Remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}

//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}


if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();

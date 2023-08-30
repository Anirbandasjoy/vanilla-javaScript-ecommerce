const buyNow = document.getElementById("buyNow");
buyNow.disabled = true;
const loadProductData = async () => {
  const spiner = document.getElementById("spiner");
  const spinContaier = document.getElementById("spinContaier");

  spiner.style.display = "block";
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Not featching data Nework erro");
    }
    const data = await res.json();
    displayData(data);
  } catch (error) {
    getId("cardContainer").innerText = error.message;
    console.log(error.message);
  } finally {
    spiner.style.display = "none";
    spinContaier.style.display = "none";
  }
};

const displayData = (data) => {
  const cardContainer = getId("cardContainer");
  data.map((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
    <figure><img src=${product.image} alt=${
      product.title
    } class="w-44 h-44 p-4"/></figure>
    <div class="card-body">
    <div class="flex justify-between">
         <h2 class="card-title">${product.title.slice(
           0,
           10
         )} <div class="badge badge-secondary">$${product.price}</div></h2>

   <span onclick="showDetail(${product.id}); my_modal_3.showModal();">
  <i class="fa-solid fa-arrow-right btn rounded-full"></i>
</span>
    </div>
    <p class="text-gray-500">${product.description.slice(0, 60)}</p>
    <div class="card-actions justify-end">
      <button onclick="addToCard('${
        product.id
      }')" class="btn bg-lime-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
</button>
    </div>
  </div>
</div>

    `;
    cardContainer.appendChild(div);
  });
};

// show details
const showDetail = async (id, modal) => {
  const modalBody = getId("modalBody");
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="card lg:card-side">
  <div class="flex-1">
   <figure><img class="w-80 h-80" src=${data.image} alt=${data.title}/></figure>
  </div>
  <div class="card-body flex-1">
    <h2 class="card-title font-bold">${data.title}</h2>
    <p class="text-gray-400">${data.description}</p> 
  </div>
</div>
    `;
    modalBody.appendChild(div);
    getId("modalBtn").addEventListener("click", () => {
      div.innerHTML = "";
    });
  } catch (error) {
    console.log(error.message);
  }
};

const goBack = async () => {
  loadProductData();
};

let cardCount = 0;
let totalCount = 0;

const addToCard = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    const addToCardContainer = getId("addToCardContainer");
    const div = document.createElement("div");
    div.innerHTML = `
   <div id="cartItem_${data.id}" class="flex justify-between items-center" data-price="${data.price}">
    <div class="avatar">
        <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
            <img src=${data.image} />
        </div>
    </div>
    <p>$${data.price}</p>
    <i class="fa-solid fa-delete-left btn" onclick="removeFromCart('${data.id}')"></i>
</div>
    
    `;
    addToCardContainer.appendChild(div);

    const price = getId("price");
    totalCount = totalCount + data.price;
    price.innerText = totalCount.toFixed(2);

    if (totalCount > 0) {
      buyNow.disabled = false;
    }

    cardCount++;
    const cardCountElement = getId("cardCount");
    cardCountElement.innerText = cardCount;
    showToast("Item added to cart!");
  } catch (error) {
    console.log(error.message);
  }
};

// remove card element

const removeFromCart = (id) => {
  const cartItem = getId(`cartItem_${id}`);
  const itemPrice = parseFloat(cartItem.dataset.price);
  cartItem.remove();

  totalCount -= itemPrice;
  price.innerText = totalCount.toFixed(2);

  cardCount--;
  const cardCountElement = getId("cardCount");
  cardCountElement.innerText = cardCount;

  showToast("deleted successfully");

  if (cardCount === 0) {
    buyNow.disabled = true;
  }
};

loadProductData();
const getId = (id) => {
  return document.getElementById(id);
};

const showToast = (message) => {
  const toastContainer = getId("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
     <div class="flex items-center ">
        <span class="toast-icon">✅</span>
       <span class="toast-message">${message}✌️</span>
     </div>
  `;
  toastContainer.appendChild(toast);

  // Delay for a short period before showing the toast
  setTimeout(() => {
    toastContainer.style.left = "13rem"; // Slide in from the left
  }, 100);

  // Remove the toast after a few seconds
  setTimeout(() => {
    toast.remove();
    toastContainer.style.left = "-100px"; // Slide out to the left
  }, 3000);
};

// buy now

getId("buyNow").addEventListener("click", () => {
  showToast("Suceessfull Buying");
  setTimeout(() => {
    location.reload();
  }, 2000);
});

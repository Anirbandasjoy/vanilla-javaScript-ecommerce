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

       <i class="fa-solid fa-arrow-right btn rounded-full"></i>
    
    </div>
    <p class="text-gray-500">${product.description.slice(0, 60)}</p>
    <div class="card-actions justify-end">
      <button onclick="displaySingleData('${
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

let cardCount = 0;
const displaySingleData = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    const addToCardContainer = getId("addToCardContainer");
    const div = document.createElement("div");
    let price = getId("price");
    currentPrice = Number(getId("price").innerText);
    console.log(currentPrice);

    div.innerHTML = `
    
    <div class="flex justify-between items-center ">
        <div class="avatar">
        <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
            <img src=${data.image} />
        </div>
        </div>
        <p>$${data.price}</p>

        <i class="fa-solid fa-delete-left"></i>
    
    </div>
    
    `;
    addToCardContainer.appendChild(div);

    cardCount++;
    const cardCountElement = getId("cardCount");
    cardCountElement.innerText = cardCount;
  } catch (error) {
    console.log(error.message);
  }
};

loadProductData();

const getId = (id) => {
  return document.getElementById(id);
};

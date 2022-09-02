// step 1
const loadAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

const setAllMenu = async () => {
    // 1. calling loadall function to get the values of data
    const data = await loadAllProducts();
    //2.  loop through data to get all catagory and set them dynamically in the menu
    const menu = document.getElementById("all_menu")

    // 2a . to remove duplicate .. push only single catagory in this newarr
    let newarr = [];
    for (const product of data) {

        if (newarr.indexOf(product.category) === -1) {
            newarr.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${product.category}</a>
    
            `
                ;
            menu.appendChild(li)
        }

    }

}

// step 3 search input field enter key handler
const searchField = document.getElementById("search_field")
searchField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();
        // console.log(allProducts); array

        // filter the foundproducts array by giving a condition:catagory inclueds search value
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts);


        // show the filtered products
        const productContainer = document.getElementById("product_container");
        const notFound = document.getElementById("not_found")
        productContainer.textContent = '';
        notFound.textContent = ''

        // not found
        if (foundProducts.length === 0) {
            notFound.innerHTML = `<p class='text-5xl text-red-500'>Product not found</p>`
        }


        foundProducts.forEach(product => {
            const { category, image, title, description } = product
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card card-compact bg-base-100  shadow-xl ">
             <figure><img src="${image}" alt="Shoes" class='h-60 w-full' /></figure>
            <div class="card-body">
             <h2 class="card-title">${category}</h2>
             <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
              <div class="card-actions justify-end">
              <label for="my-modal-3" class="btn modal-button btn bg-sky-700" onclick="showModal('${description}','${image}')">Show Details</label>
             
            </div>
         </div>
        </div> 
            `
            productContainer.appendChild(div);
        });
    }
})


// modal
const showModal = (description, image) => {
    // console.log(description, image);
    const modalBody = document.getElementById("modal_body");
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <figure><img src="${image}" alt="Shoes" class='h-60 w-full' /></figure>
    <p>${description ? description : "details not found"}</>
    
    
    `
}



// / we did this way before
// const loadAllProducts = async () => {
//     const url = 'https://fakestoreapi.com/products';
//     const res = await fetch(url);
//     const data = await res.json();
//     display(data);

// }
// const display = (products) => {
//     console.log(products);
// }
// loadAllProducts();

setAllMenu();


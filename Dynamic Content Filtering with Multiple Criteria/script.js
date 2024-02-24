const products = [
    { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
    { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
    { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
  ];
  
function createCategoryOptions() {
    const categoryDropdown = document.getElementById("category");
    const uniqueCategories = getUniqueValues(products, 'category');
  
    const allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = "all";
    allCategoriesOption.textContent = "All Categories";
    categoryDropdown.appendChild(allCategoriesOption);
  
    uniqueCategories.forEach(category => {
      const categoryOption = document.createElement("option");
      categoryOption.value = category;
      categoryOption.textContent = category;
      categoryDropdown.appendChild(categoryOption);
    });

    categoryDropdown.addEventListener("change", renderProducts);
}

  
function createTagCheckboxes() {
    const tagsContainer = document.querySelector('.tags');
    const uniqueTags = getUniqueTags(products);

    uniqueTags.forEach(tag => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = tag;

        const label = document.createElement('label');
        label.textContent = tag;
        label.setAttribute('for', tag);

        checkbox.addEventListener('change', renderProducts);

        tagsContainer.appendChild(checkbox);
        tagsContainer.appendChild(label);
    });
}

function renderProducts() {
    const categoryFilter = document.getElementById("category");
    const selectedCategory = categoryFilter.value;

    const tagCheckboxes = document.querySelectorAll('.tags input:checked');
    const selectedTags = Array.from(tagCheckboxes).map(checkbox => checkbox.id);

    const filteredProducts = filterProductsByCategoryAndTags(products, selectedCategory, selectedTags);
    displayProducts(filteredProducts);
}

  
  function filterProductsByCategoryAndTags(products, category, tags) {
    return products.filter(product => {
      const categoryMatch = category === "all" || product.category === category;
      const tagsMatch = tags.length === 0 || tags.every(tag => product.tags.includes(tag));
      return categoryMatch && tagsMatch;
    });
  }
  
  function createProductElement(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
  
    const idElement = document.createElement("p");
    idElement.textContent = `ID: ${product.id}`;
  
    const nameElement = document.createElement("p");
    nameElement.textContent = `Name: ${product.name}`;
  
    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${product.category}`;
  
    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${product.price}`;
  
    const tagsElement = document.createElement("p");
    tagsElement.textContent = `Tags: ${product.tags.join(', ')}`;
  
    productDiv.appendChild(idElement);
    productDiv.appendChild(nameElement);
    productDiv.appendChild(categoryElement);
    productDiv.appendChild(priceElement);
    productDiv.appendChild(tagsElement);
  
    return productDiv;
  }
  
  function displayProducts(products) {
    const contentSection = document.querySelector('.content');
    contentSection.innerHTML = "";
  
    if (products.length === 0) {
      const noProductsElement = document.createElement("p");
      noProductsElement.textContent = "No products found.";
      contentSection.appendChild(noProductsElement);
      return;
    }
  
    products.forEach(product => {
      const productElement = createProductElement(product);
      contentSection.appendChild(productElement);
    });
  }
  
  function getUniqueValues(array, property) {
    return [...new Set(array.map(item => item[property]))];
  }
  
  function getUniqueTags(products) {
    const allTags = products.reduce((tags, product) => [...tags, ...product.tags], []);
    return [...new Set(allTags)];
  }
  
  createCategoryOptions();
  createTagCheckboxes();
  renderProducts();
  
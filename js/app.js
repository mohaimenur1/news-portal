/* category fetching */

const categoryFetching = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const response = await fetch(url);
  const data = await response.json();
  showCategories(data.data.news_category);
};

const showCategories = (categories) => {
  const display = categories
    .map((category) => {
      return `

        <button type="button" class="btn btn-outline-category me-2 mb-2">
          ${category.category_name}
        </button>
        
    `;
    })
    .join("");
  const categoryContainer = document.getElementById("category-section");
  categoryContainer.innerHTML = display;
};

categoryFetching();

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

        <button onClick="categoryClick('${category.category_id}')" type="button" class="btn btn-outline-category me-2 mb-2">
          ${category.category_name}
        </button>
        
    `;
    })
    .join("");
  const categoryContainer = document.getElementById("category-section");
  categoryContainer.innerHTML = display;
};

categoryFetching();

const categoryClick = async (categoryId) => {
  console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  showingDataByCategory(data.data);
};

const showingDataByCategory = (datas) => {
  const display = datas
    .map((data) => {
      return `
    
    <div class="col-lg-6">
    <div class="card">
      <div class="card-body">
        <img
          class="img-fluid w-auto"
          src="${data.image_url}"
          alt=""
          srcset=""
        />
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">
          ${data.details}
        </p>

        <div
          class="news-own d-flex justify-content-between align-items-center"
        >
          <div class="author-section">
            <img src="" alt="" srcset="" />
            <h5>rahi</h5>
          </div>
          <div class="views">
            <i>view</i>
            <strong>1.5M</strong>
          </div>
          <div class="details-button">
            <a href="#" class="btn back-ground-color text-white"
              >Details</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    })
    .join("");

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = display;
};

showingDataByCategory();

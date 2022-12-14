/* category fetching */

const categoryFetching = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    showCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const showCategories = (categories) => {
  // console.log(categories);
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
  toggleSpinner(true);

  console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    showingDataByCategory(data.data);
  } catch (error) {
    console.log(error);
  }
};

const showingDataByCategory = (datas) => {
  console.log(datas);
  datas.sort((a, b) => parseFloat(b.total_view) - parseFloat(a.total_view));
  const display = datas
    .map((data) => {
      return `
    
    <div class="col-lg-6 mb-4">
    <div class="card shadow">
      <div class="card-body">
        <img
          class="img-fluid w-auto"
          src="${data.image_url}"
          alt=""
          srcset=""
        />
        <h5 class="card-title title-first-word">${
          data.title ? data.title : "No Title Found"
        }</h5>
        <p class="card-text text-shorten">
          ${data.details}
        </p>

        <div
          class="news-own d-flex justify-content-between align-items-center"
        >
          <div class="author-section d-flex align-items-center">
            <img class="author-img me-2" src="${
              data.author.img
            }" alt="" srcset="" />
            <h5 class="title-first-word">${
              data.author.name ? data.author.name : "No Author Name Availabe"
            }</h5>
          </div>
          <div class="views">
            <i class="fa fa-eye text-color"></i>
            <strong class="text-color">${
              data.total_view ? data.total_view : "No Total View Found"
            } k</strong>
          </div>
          <div class="details-button">
            <button
                type="button"
                onClick="detailNews('${
                  data._id
                }')" class="btn btn-modal back-ground-color text-white"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    })
    .join("");

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = display
    ? display
    : `
        <div class="d-flex justify-content-center">
        <div class="alert not-found-container w-50 rounded-5 text-center">No News Found!</div>
        </div>
    `;

  toggleSpinner(false);

  const totalShowing = `
    
        <h4 class="text-color text-light">
          ${datas.length} items found for this category
        </h4>

    `;

  const totalNewCount = document.getElementById("total-news");
  totalNewCount.innerHTML = totalShowing;
};

//details news
const detailNews = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    showingNews(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const showingNews = (singleNews) => {
  console.log(singleNews);
  const display = `

        <img
        class="img-fluid w-auto"
        src="${singleNews.image_url ? singleNews.image_url : "No Image Found"}"
        alt=""
        srcset=""
      />
        <p class="card-text">
          ${singleNews.details ? singleNews.details : "No Details Found"}
        </p>
  
  `;
  const modalDataContainer = document.getElementById("modal-data");
  modalDataContainer.innerHTML = display;

  const modalAuthorDetails = document.getElementById("modal-author-details");
  modalAuthorDetails.innerHTML = `
  
      <div class="author-section d-flex align-items-center">
        <img class="author-img me-2 mb-2" src="${
          singleNews.author.img
        }" alt="" srcset="" />
        <h5 class="me-2">${
          singleNews.author.name
            ? singleNews.author.name
            : "No author name availble"
        }</h5>
        <h1><span class="badge bg-secondary">${
          singleNews.rating.badge
        }</span></h1>
      </div>
  
  `;

  const modalTitleChange = document.getElementById("modal-titel-id");
  modalTitleChange.innerText = `${
    singleNews.title ? singleNews.title : "No Title Found"
  }`;
};

//loader toogle function
const toggleSpinner = (isLoading) => {
  const loadingSection = document.getElementById("loader");
  if (isLoading) {
    loadingSection.classList.remove("d-none");
  } else {
    loadingSection.classList.add("d-none");
  }
};

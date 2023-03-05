let userInput = document.getElementById("user-input");
const button = document.getElementById("btn");
const container = document.getElementById("container");

window.addEventListener("load", () => {
  userInput.value = "";
});

button.addEventListener("click", () => {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  fetch(url + userInput.value)
    .then((res) => res.json())
    .then((data) => {
      let meals = data.meals;

      if (meals === null || userInput.value === "") {
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.innerHTML = `
        <i class="fa-solid fa-face-sad-tear sorry"></i>
        <h3 class='invalid'>Invalid Input</h3>
        `;
      } else {
        meals.forEach((meal, idx) => {
          container.style.display = "grid";
          let li = document.createElement("li");
          li.className = "list";
          li.dataset.index = idx;
          li.innerText = meal.strMeal;

          container.appendChild(li);

          li.addEventListener("click", () => {
            container.style.display = "flex";
            container.style.flexDirection = "column";
            let index = li.dataset.index;

            container.innerHTML = `
            <h1>${meals[index].strMeal}</h1>
      <img
        src=${meals[index].strMealThumb}
        alt=""
      />

      <div class="ingredients">
        <h3>Instructions</h3>
        <p>${meals[index].strInstructions}</p>
      </div>

      <a id="recipe" href='${meals[index].strYoutube}'><i class="fa-brands fa-youtube"></i>Video</a>
            `;
          });
        });
      }

      userInput.value = "";
    });

  container.innerHTML = "";
});

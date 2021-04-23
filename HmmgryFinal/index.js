window.addEventListener('load', () => {
  if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
  }
});

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('recipe-container');
// const get_meal_btn = document.getElementById('get_meal');
// localStorage.setItem('get_meal'); //store a key/value

// var retrievedRecipe = localStorage.getItem('get_meal');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createMeal(res.meals[0]);
	});
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=267; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}

	const newInnerHTML = `

		<div class="row-recipe">

			<div>
				<img src="${meal.strMealThumb}" alt="Recipe Image" class="meal-recipe-img">
        <h4 class="recipe_Name">${meal.strMeal}</h4>
        </div>

    <div class="recipe_details">
        <div>



      	${meal.strCategory ? `<p class="tags"><strong>Category– </strong> ${meal.strCategory}</p>` : ''}

				${meal.strArea ? `<p class="tags"><strong>Area – </strong> ${meal.strArea}</p>` : ''}
        </div>

        <div>
				<h5>INGREDIENTS</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>

			     </div>

			<div>
        <h5>INSTRUCTIONS</h5>
				<p>${meal.strInstructions}</p>
			</div>
		</div>

	`;

	meal_container.innerHTML = newInnerHTML;
}







// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});

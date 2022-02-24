const prevButton = document.querySelector(`.slider__button--prev`);
const nextButton = document.querySelector(`.slider__button--next`);
const item = document.querySelector(`.slider__item`);
const sliderList = document.querySelector(`.slider__list`);
const slider = document.querySelector(`.slider`);

const ITEM_QUANTITY = 5;
const FIRST_GROUP_OF_SLIDES = ITEM_QUANTITY;
const LAST_GROUP_OF_SLIDES = ITEM_QUANTITY * (-1);
const REPLACE_TIMEOUT = 600;
const TRANSITION_VALUE = `transform 0.6s ease`;
const TRANSFORM_VALUE_RESET = `translate(0)`;
const step = item.offsetWidth * ITEM_QUANTITY * (-1);

const replaceForward = () => {
	const slides = sliderList.querySelectorAll(`.slider__item`);
	const slidesArr = Array.from(slides);
	slidesArr.slice(0, FIRST_GROUP_OF_SLIDES).forEach(slide => {
		sliderList.append(slide);
	});
	sliderList.style.transition = `none`;
	sliderList.style.transform = TRANSFORM_VALUE_RESET;
};

const replaceBack = () => {
	const sliderList = document.querySelector(`.slider__list`);
	const slides = sliderList.querySelectorAll(`.slider__item`);
	const slidesArr = Array.from(slides);
	slidesArr.slice(LAST_GROUP_OF_SLIDES).reverse().forEach(slide => {
		sliderList.prepend(slide);
	});
	sliderList.style.transition = `none`;
	sliderList.style.transform = `translate(${step}px)`;
}

nextButton.addEventListener(`click`, () => {
	sliderList.style.transform = `translate(${step}px)`;
	setTimeout(replaceForward, REPLACE_TIMEOUT);
	sliderList.style.transition = TRANSITION_VALUE;
});

prevButton.addEventListener(`click`, () => {
	replaceBack();
	setTimeout(() => {
		sliderList.style.transition = TRANSITION_VALUE;
		sliderList.style.transform = TRANSFORM_VALUE_RESET;
	});
});

sliderList.addEventListener(`transitionstart`, (evt) => {
	if (evt.target === sliderList) {
		slider.classList.add(`slider--in-move`);
	}
});

sliderList.addEventListener(`transitionend`, (evt) => {
	if (evt.target === sliderList) {
		slider.classList.remove(`slider--in-move`);
	}
})
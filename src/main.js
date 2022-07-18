// @ts-check
import axios from 'axios';


class App {
  /**
  *  @typedef {Object} Category
  *    @property {string} background
  *    @property {string} icon
  *    @property {string} name
  *    @property {number} totalQuizzes
  *    @property {number} level
  *    @property {number} users
  */

  // @ts-ignore
  #API_URL = import.meta.env?.VITE_API_URL;
  #cardsContainer = document.querySelector('.cards-container');
  /** @type Array<Category> */
  categories;

  /**
   *
   * @description fetches courses from larnU API
   * @returns Array<Category>
   */
  async #fetchCourses() {
    const { data } = await axios.get(this.#API_URL);

    /** @type {Array<Category>} */
    const categories = data.communityCategories;
    return categories;
  }

  /**
   *
   * @param {Category} categ
   */
  #createCard(categ) {
    const {
      totalQuizzes, users, background, name, level, icon,
    } = categ;

    const safeGuardImage = './src/W45FBKIC.png';
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <figure class="card__image">
      <img src=${background || safeGuardImage} alt=${name} class="main-image" />
      <img src=${icon} alt="" class="card__icon" />
      </figure>
      <div class="card__content">
      <h4 class="card-title">${name}</h4>

      <div class="card__info">
        <p><b>total quizzes</b> <span>${totalQuizzes}</span></p>
        <p><b>users</b>  <span>${users}</span></p>
        <p><b>level</b>  <span>${level}</span></p>
      </div>

      <a class="btn" href="#">Go to larnU</a>
    `;
    return card;
  }

  /**
   *
   * @param {HTMLDivElement} card
   */
  #appendCard(card) {
    this.#cardsContainer?.append(card);
  }

  /**
   *
   * @description App starts running here.
   */
  async init() {
    try {
      this.categories = await this.#fetchCourses();

      this.categories.forEach((categData) => {
        const newCard = this.#createCard(categData);
        this.#appendCard(newCard);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}


const app = new App();

app.init().then(() => {
  console.log(app.categories);
});

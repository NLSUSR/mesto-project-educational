const Section = class {

  #container;
  #render;
  
  constructor(object) {

    this.#container = object.container;
    this.#render = object.render;

  };

  renderItems = items => {

    items.forEach(item => {

      this.#render(item);

    })

  };

  appendItem = item => {

    this.#container.append(item);

  };

  prependItem = item => {

    this.#container.prepend(item);

  };

};

export default Section;

const Section = class {
  constructor(object) {

    this._container = object.container;
    this._render = object.render;

  };

  renderItems = items => {

    items.forEach(item => {

      this._render(item);

    })

  };

  appendItem = item => {

    this._container.append(item);

  };

  prependItem = item => {

    this._container.prepend(item);

  };

};

export default Section;

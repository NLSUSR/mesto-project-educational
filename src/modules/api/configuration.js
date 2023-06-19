const configuration = {
  resource: "https://nomoreparties.co/v1/plus-cohort-20",
  endpoints: {
    main: "/users/me/",
    avatar: "/users/me/avatar/",
    cards: "/cards/",
    likes: "/cards/likes/",
  },
  methods: {
    remove: "DELETE",
    change: "PATCH",
    send: "POST",
    request: "GET",
    add: "PUT",
  },
  headers: {
    authorization: "b920c8ce-3925-48c5-9ff8-5e542e04acb8",
    "content-type": "application/json",
  },
};

export default configuration;

const faviconIcon = new URL("../../images/favicon/practicum.ico", import.meta.url);
const logotype = new URL("../../images/main-pics/logo.svg", import.meta.url);
const closeIcon = new URL("../../images/main-pics/close.svg", import.meta.url);
const deleteIcon = new URL("../../images/main-pics/delete.svg", import.meta.url);
const penIcon = new URL("../../images/main-pics/edit-pen.svg", import.meta.url);
const likeIcon = new URL("../../images/main-pics/like.svg", import.meta.url);
const likeActiveIcon = new URL("../../images/main-pics/like-active.svg", import.meta.url);
const plusIcon = new URL("../../images/main-pics/profile-plus.svg", import.meta.url);
const splashLogo = new URL("../../images/splash/splashBlack.svg", import.meta.url);

const images = [
  {
    name: "favicon",
    image: faviconIcon
  },
  {
    name: "close",
    image: closeIcon
  },
  {
    name: "delete",
    image: deleteIcon
  },
  {
    name: "pen",
    image: penIcon
  },
  {
    name: "likeActive",
    image: likeActiveIcon
  },
  {
    name: "like",
    image: likeIcon
  },
  {
    name: "logo",
    image: logotype
  },
  {
    name: "plus",
    image: plusIcon
  },
  {
    name: "splash",
    image: splashLogo
  },
];

export { images }
const API_BASE_URL = "https://algoexpert.io/api/testimonials";
const PAGE_SIZE = 5;
const testimnialContainer = document.getElementById("testimonial-container");

let afterId = null;
let canFetchTestimonials = true;

testimnialContainer.addEventListener("scroll", handleScroll);

function handleScroll(e) {
  if (!canFetchTestimonials) return;

  const bottomSpaceLeftToScroll =
    this.scrollHeight - // total height of content within scroll container including whihc is off the scren
    this.scrollTop - // scroll so far
    this.clientHeight; // height of container in which we are showing our content
  // if boottomSpaceLeftTScroll > 0 means we still have content to see
  if (bottomSpaceLeftToScroll > 1) return; // > 0 is not working
  fetchAndAppendTestimonials();
}

const createTestimonialUrl = () => {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("limit", PAGE_SIZE);
  if (afterId) url.searchParams.set("after", afterId);
  console.log(url);
  return url;
};

const fetchTestimonials = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const createTestimonialElement = (message) => {
  const ele = document.createElement("p");
  ele.classList.add("testimonial");
  ele.textContent = message;
  return ele;
};

const fetchAndAppendTestimonials = async () => {
  canFetchTestimonials = false;

  const url = createTestimonialUrl();
  const { testimonials, hasNext } = await fetchTestimonials(url);

  const fragment = document.createDocumentFragment();
  testimonials.forEach(({ message }) => {
    fragment.appendChild(createTestimonialElement(message));
  });
  testimnialContainer.appendChild(fragment);

  canFetchTestimonials = true;

  if (hasNext) {
    afterId = testimonials[testimonials.length - 1].id;
  } else {
    testimnialContainer.removeEventListener("scroll", handleScroll);
  }
};

fetchAndAppendTestimonials();

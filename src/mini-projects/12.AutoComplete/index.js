import { getFruits, debounce } from "./services.js";

const input = document.getElementById("search-input");
const suggestionBox = document.getElementsByClassName("search-suggestion")[0];
console.log(suggestionBox);
let suggestions = [];
let controller = new AbortController();

const handleSearch = (event) => {
  const keyword = event.target.value;
  if (!keyword) {
    suggestionBox.classList.remove("suggestion-visible");
    controller.abort();
    return;
  }
  try {
    controller.abort();
    controller = new AbortController();
    getFruits(keyword, controller.signal).then(populateSuggestions);
  } catch (e) {
    suggestionBox.classList.remove("suggestion-visible");
    console.log(e);
  }
};

const populateSuggestions = (_suggestions = []) => {
  if (!_suggestions.length) return;

  suggestionBox.classList.add("suggestion-visible");
  suggestions = _suggestions;
  suggestionBox.innerHTML = "";
  const container = document.createDocumentFragment();
  suggestions.forEach((suggestion) => {
    const suggestionDiv = document.createElement("div");
    suggestionDiv.classList.add("suggestion");
    suggestionDiv.innerText = suggestion;
    container.appendChild(suggestionDiv);
  });
  suggestionBox.appendChild(container);
};

(() => {
  input.addEventListener("input", debounce(handleSearch, 300));
})();

// getFruits("or").then(console.log);

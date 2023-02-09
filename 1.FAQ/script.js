const FAQ_DATA = [
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a client-side and server-side scripting language inserted into HTML pages and is understood by web browsers.",
  },
  {
    question: "What is the use of isNaN function?",
    answer: "isNan function returns true if the argument is not a number; otherwise, it is false.",
  },
  {
    question: "Which company developed JavaScript?",
    answer: "Netscape is the software company that developed JavaScript.",
  }
]

const rootEle = document.getElementById('root');
const fragment = document.createDocumentFragment();
const createFAQ = () => {
  FAQ_DATA.forEach(({ question, answer }) => {
    const container = document.createElement('details');
    const ques = document.createElement('summary');
    const content = document.createElement('div');
    const ans = document.createElement('p');

    content.classList.add('content')
    ques.classList.add('question');
    ans.classList.add('answer');

    ques.innerText = question;
    ans.innerText = answer;

    content.appendChild(ans);
    container.appendChild(ques);
    container.appendChild(content);
    fragment.append(container);
  })
  rootEle.appendChild(fragment);
}

createFAQ();


document.cookie = `name=uday; expires = ${new Date(2023, 5, 1).toUTCString()};`
document.cookie = `sessionID=jfshk84379; expires = ${new Date(2023, 5, 1).toUTCString()};`

console.log(document.cookie)
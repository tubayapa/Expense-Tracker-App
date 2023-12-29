const expenseInput = document.querySelector("#expense");
const priceInput = document.querySelector("#price");
const formBtn = document.querySelector("#add-btn");
const list = document.querySelector("#list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#input-status");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");



// tarayicidan isim alma

const username = localStorage.getItem("name") || "";
nameInput.value = username;

//kullanici ismini tarayici depoda saklama
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

//event listeners
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);
// total state

let total = 0;

function updateTotal(price) {
  total += parseInt(price); // or Number
  totalInfo.innerText = total;
}

//functions
function addExpense(e) {
  e.preventDefault();

  if (!priceInput.value || !expenseInput.value) {
    alert("Fill in the form!");
    return;
  }

  //creating div

  const expenseDiv = document.createElement("div");

  //adding class

  expenseDiv.classList.add("paying");
  if (statusCheck.checked) {
    expenseDiv.classList.add("payed");
  }

  // setting content

  expenseDiv.innerHTML = `
<h4>${expenseInput.value}</h4>
<h4 id="value" >${priceInput.value}</h4>
<div class="buttons">
  <img id="payment" src="/images/pay.png" alt="">
  <img id="remove" src="/images/remove.png" alt="">
</div>`;

  // sending expensed item to HTML ( adding list)

  list.appendChild(expenseDiv);

  // update total

  updateTotal(priceInput.value);

  //clearing form

  expenseInput.value = "";
  priceInput.value = "";
}

// manage list click event

function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    const wrapperElement = element.parentElement.parentElement;

    // silinen elemanin fiyatini alma

    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);

    // silinenin fiyatini toplamdan cikarma
    updateTotal(-Number(deletedPrice));

    wrapperElement.remove();
  }
}
// filtreleme

function handleFilter(e) {
  console.log(e.target.value);

  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      default:
        break;
    }
  });
}

// local storage set item

localStorage.setItem("deneme", "123");
localStorage.setItem("user", "tuba");

// local storage get item

const localData = localStorage.getItem("user");

// .remove

localStorage.removeItem("user");

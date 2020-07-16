// * Create a variable to store the whole expression
let exp = "";
let displayExp = "";
const display = document.querySelector(".display > p");

// * Click and store the numbers to be calculated
function populateVal() {
  const digitsBtns = document.querySelectorAll(".digits");

  for (const btn of digitsBtns) {
    btn.addEventListener("click", (event) => {
      for (const btn of operatorBtns) {
        btn.disabled = false;
      }

      exp += event.target.textContent.toString();
      displayExp = exp.replace("*", "×");
      displayExp = displayExp.replace("/", "÷");
      display.textContent = displayExp;
    });
  }
}
populateVal();

// * Click and store the operators
const operatorBtns = document.querySelectorAll(".functions");

function saveOperator() {
  for (const btn of operatorBtns) {
    btn.addEventListener("click", () => {
      btn.disabled = true;
      decimal.disabled = false;
      negate.disabled = false;

      exp += btn.getAttribute("operator");
      displayExp = exp.replace("*", "×");
      displayExp = displayExp.replace("/", "÷");
      display.textContent = displayExp;
    });
  }
}
saveOperator();

// * Count the decimals of a number
const countDecimals = function (value) {
  if (Math.floor(value) !== value)
    return value.toString().split(".")[1].length || 0;
  return 0;
};

// * Check if the expression is correct
function checkExp(exp) {
  let a = exp.split('');
  // - exp = '2'
  let case1 = a.every(item => isNaN(item) == false) // true -> number
  // - exp = '2+' / '2+3-'
  let case2 = isNaN(a.slice(-1)) == true; // true -> operator
  // - exp = '2.+3' / 
  let case3 = null;
  for (let i = 0; i < a.length; i++) {
    if (isNaN(a[i])) {
      if (isNaN(a[i + 1]) && (a[i + 1] != '-')) {
        case3 = true;
        break;
      }
    }
  }
  // - exp = '*2' / '/2'
  let case4 = isNaN(a[0]) && (a[0] != '-');
  // - exp = '3/0' / '2+3/3+2/0'
  let case5 = null;
  for (let i = 0; i < a.length; i++) {
    if (a[i] == '/') {
      if (a[i + 1] == 0) {
        case5 = true;
        break;
      }
    }
  }

  // * Display messages for different expressions
  if (case3 || case4) {
    alert('Seems like something\'s wrong');
    return true;
  } else if (case1 || case2) {
    alert('Please enter another number');
  } else if (case5) {
    alert('Dividing by 0 is illegal');
    return true;
  }
}

// * Calculate and display the final result
function displayResult() {
  const equalBtn = document.querySelector(".equal");

  equalBtn.addEventListener("click", () => {
    if (checkExp(exp)) {
      null;
    } else {
      exp = Function("return " + exp)();
      countDecimals(exp) > 2 ? exp = exp.toFixed(3) : exp;
      display.textContent = exp;
    }
  });
}
displayResult();

// * Set the clear button
function clearResult() {
  const clear = document.querySelector("#clear");
  clear.addEventListener("click", () => {
    decimal.disabled = false;
    negate.disabled = false;
    for (const btn of operatorBtns) {
      btn.disabled = false;
    };

    display.textContent = "";
    exp = "";
  });
}
clearResult();

// * Disable decimal button once clicked
const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
  decimal.disabled = true;
})

// * Backspace button
const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
  let a = exp.split('');
  a.pop();
  exp = a.join('');
  displayExp = exp.replace("*", "×");
  displayExp = displayExp.replace("/", "÷");
  display.textContent = displayExp;
})

// * Negate button
const negate = document.querySelector(".negate");
negate.addEventListener("click", (event) => {
  negate.disabled = true;

  exp += event.target.getAttribute("attr");
  displayExp = exp.replace("*", "×");
  displayExp = displayExp.replace("/", "÷");
  display.textContent = displayExp;
})

// * Add click effect to all buttons 
const allBtns = document.getElementsByTagName('button');
for (const btn of allBtns) {
  btn.addEventListener("mousedown", () => {
    btn.style.alignSelf = 'end';
    btn.style.boxShadow = '0 0 1px 1px #3a3a3a';
    btn.style.height = '4.2rem';
  })
  window.addEventListener("mouseup", () => {
    btn.style.alignSelf = 'start';
    btn.style.boxShadow = '0 2px 1px 1px #3a3a3a';
    btn.style.height = '4.4rem';
  })
}


// ? Change the core calculation algorithm, use functions instead of expressions, only show the current input on the display, do calculation automatically if possible
// ? Add a another display area to record the history or the whole expression
// ? Use scientific symble to display larger numbers
// ? Make negate button work when core algorithm changed and error messages
// ? Change display text size when there's too many numbers
// ? Add keyboard support
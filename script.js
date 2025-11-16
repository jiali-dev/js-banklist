'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2025-11-12T21:31:17.178Z',
    '2025-11-03T07:42:02.383Z',
    '2025-11-11T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2021-02-03T10:25:43.511Z',
    '2021-03-15T14:58:19.002Z',
    '2021-05-01T08:33:45.928Z',
    '2021-06-22T16:14:12.175Z',
    '2021-07-30T19:47:03.581Z',
    '2021-09-09T09:11:56.327Z',
    '2021-11-20T12:22:36.904Z',
    '2022-01-05T21:33:49.274Z',
  ],
  currency: 'EUR',
  locale: 'de-DE'
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2023-03-11T07:22:15.351Z',
    '2023-04-05T18:09:26.902Z',
    '2023-06-18T10:57:44.281Z',
    '2023-07-20T15:43:03.710Z',
    '2023-09-02T11:22:18.563Z',
    '2023-10-10T17:37:42.184Z',
    '2023-12-25T20:50:14.665Z',
    '2024-02-14T09:12:30.418Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Functions
const formatDate = ( date, locale = '', time = false ) => {
  if( locale ) {
    return new Intl.DateTimeFormat(locale).format(date);
  }
  
  const day = `${date.getDate()}`.padStart(2,0);
  const month = `${date.getMonth()}`.padStart(2,0);
  const year = date.getFullYear();

  let formatDate =  `${day}/${month}/${year}`;

  if( time ) {
    const hours = `${date.getHours()}`.padStart(2,0);
    const minutes = `${date.getMinutes()}`.padStart(2,0);
    formatDate += ` , ${hours}:${minutes}`
  }

  return formatDate
}

const daysPassed = ( date1, date2, locale = '' ) => {

  const diff = Math.round(Math.abs(date1 - date2) / (1000 * 24 * 60 * 60));

  if( diff === 0 ) 
    return 'Today';
  else if( diff === 1 )
    return 'Yesterday';
  else if( diff <= 7 )
    return `${diff} days ago.`
  else 
    return formatDate(date1, locale)
}

/////////////////////////////////////////////////
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => 
  ({
    movement: mov,
    movementDate: acc.movementsDates.at(i)
  }));

  if( sort ) combinedMovsDates.sort((a,b) => a.movement - b.movement);
  
  combinedMovsDates.forEach(function (obj, i) {
    // Get movement and Date
    const { movement, movementDate } = obj;

    // Determine type
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = daysPassed(new Date(movementDate), new Date(), currentAccount.locale);

    // Create HTML string
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type.toUpperCase()}
          </div>
          <div class="movements__date">
            ${displayDate}
          </div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>`;

    // Insert HTML into the DOM
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Function to create usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const calcDisplayBalance = function (acc) {
  // Calculate and display balance
  acc.balance = acc.movements.reduce((accu, mov) => accu + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} EUR`;
};

const calcDisplaySummary = function (acc) {
  // Calculate and display income
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income.toFixed(2)}€`;

  // Calculate and display outcome
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  // Calculate and display interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// Update UI
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

// Login functionality
let currentAccount;

// Add Event listener for login button
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // Find the account based on username input
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // Check if PIN is correct
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Get Current Date
    const now = new Date();
    const currentDate = formatDate(now, currentAccount.locale, true);

    labelDate.textContent = currentDate;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }

  // Transfer Money Functionallity
  btnTransfer.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
    );

    // Clear Inputs
    inputTransferAmount.value = inputTransferTo.value = '';
    if (
      amount > 0 &&
      amount <= currentAccount.balance &&
      receiverAcc?.username !== currentAccount.username
    ) {

      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc?.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc?.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }
  });

  // Add Loan
  btnLoan.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);
      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      
      updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
  });

  // Close account
  btnClose.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );

      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
    }

    inputCloseUsername = inputClosePin = '';
  });
});

// Sort movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

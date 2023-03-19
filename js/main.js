// Effect duration
const duration = 1000;

// Select game container
const gameContainer = document.querySelector(`.memory-game`);

// Create array from the game blocks
const blocks = Array.from(gameContainer.children);

// Create range of keys
const orderRange = [...Array(blocks.length).keys()];

// Select The Start Game Button
document.querySelector(`.control-btn span`).onclick = function () {
  // Prompt Window To Ask For Name
  const yourName = prompt(`Whats Your Name?`);
  // If there's no name
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(`.name span`).innerHTML = "Unknown";

    // If there's A name
  } else {
    // Set Name To Your Name
    document.querySelector(`.name span`).innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(`.control-btn`).remove();
};

// Check matched blocks
const checkMatchedBlocks = function (firstBlock, secondBlock) {
  const triesElement = document.querySelector(`.tries span`);

  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove(`is-flipped`);
    secondBlock.classList.remove(`is-flipped`);

    firstBlock.classList.add(`has-match`);
    secondBlock.classList.add(`has-match`);

    document.getElementById(`success`).play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove(`is-flipped`);
      secondBlock.classList.remove(`is-flipped`);
    }, duration);

    document.getElementById(`failed`).play();
  }
};

// Shuffle function
const shuffleFunction = function (arr) {
  let curr = arr.length,
    temp,
    random;

  while (curr > 0) {
    // Get random number
    random = Math.floor(Math.random() * curr);

    // Decrease length by one
    curr--;

    // Save curr element in the stash
    temp = arr[curr];

    // Current element = random element
    arr[curr] = arr[random];

    // Random element = get element from the stash
    arr[random] = temp;
  }

  return arr;
};
shuffleFunction(orderRange);

// Stop flipping function
const stopClicking = function () {
  // Add class no clicking on main container
  gameContainer.classList.add(`no-clicking`);

  setTimeout(() => {
    // Remove class no clicking after the duration
    gameContainer.classList.remove(`no-clicking`);
  }, duration);
};

// Flip block function
const flipBlock = function (selectedBlock) {
  // Add class
  selectedBlock.classList.add(`is-flipped`);

  // Collect all flipped cards
  const allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains(`is-flipped`)
  );

  // If there's two selected blocks
  if (allFlippedBlocks.length === 2) {
    // Stop flipping function
    stopClicking();
    // Check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
};

// Add order css property to the game block
blocks.forEach((block, i) => {
  block.style.order = orderRange[i];

  block.addEventListener(`click`, function () {
    // Trigger the flip block function
    flipBlock(block);
  });
});

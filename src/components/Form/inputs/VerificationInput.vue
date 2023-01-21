<script setup>
const { ref }=require("vue-demi");

let code = ref(Array(5));
let dataFromPaste;
const keysAllowed = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
function isNumber(event) {
 
  (event.currentTarget).value = "";
  const keyPressed = (event).key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
}
function handleInput(event) {
  const inputType = (event).inputType;
  let currentActiveElement = event.target;
  if (inputType === "insertText")
    (currentActiveElement.nextElementSibling)?.focus();
  if (inputType === "insertFromPaste" && dataFromPaste) {
    for (const num of dataFromPaste) {
      let id = parseInt(currentActiveElement.id.split("_")[1]);
      currentActiveElement.value = num;
      code[id] = num;
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement =
          currentActiveElement.nextElementSibling;
        (currentActiveElement.nextElementSibling)?.focus();
      }
    }
  }
}
function handleDelete(event) {
  //keydown event = move to previous element then only delete number
  let value = (event.target).value;
  let currentActiveElement = event.target;
  if (!value)
    (currentActiveElement.previousElementSibling)?.focus();
}
function onPaste(event) {
  dataFromPaste = (event).clipboardData
    ?.getData("text")
    .trim()
    .split("");
  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault();
    }
  }
}
</script>

<template>
  <div class="parent">
    <div class="child">
      <form>
        <input
          v-for="(n, index) in code"
          :key="index"
          type="number"
          pattern="\d*"
          :id="'input_' + index"
          maxlength="1"
          v-model="code[index]"
          @input="handleInput"
          @keypress="isNumber"
          @keydown.delete="handleDelete"
          @paste="onPaste"
          :class="{'filled-input': code[index]}"
        />
      </form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
#app {
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  margin: auto;
}
.parent {
  text-align: center;
  position: relative;
  margin: auto;
  height: 8rem;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
form {
  display: flex;
  flex-direction: row;
  gap: 18px;
}
input[type="number"] {
  font-size: 2rem;
  padding: 1.65rem 0;
  text-align: center;
  font-weight: 500;
  border-radius: .8rem;
  border: .1rem solid rgba($color: $blue, $alpha: .5);
  caret-color: transparent !important;
  outline: none;
    &.filled-input {
        border: .1rem solid rgba($color: $blue, $alpha: 1) !important;
    }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@media only screen and (max-width: 1080px) {
  input[type="number"] {
    width: 8rem;
  }
}
@media only screen and (max-width: 600px) {
  input[type="number"] {
    width: 4rem;
  }
}
@media only screen and (max-width: 500px) {
  form {
    gap: .8rem;
  }
  input[type="number"] {
    // width: 12vw;
    // font-size: 40px;
  }
}
</style>
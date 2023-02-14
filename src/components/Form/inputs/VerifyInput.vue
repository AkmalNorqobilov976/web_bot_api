<template>
    <div class="verify-input">
        <input 
            type="number" 
            max="1" 
            maxlength="1" 
            name='code' 
            class='verify-input__code-input' 
            required
        />
        <input 
            type="number" 
            max="1" 
            maxlength="1" 
            name='code' 
            class='verify-input__code-input' 
            required
        />
        <input 
            type="number" 
            max="1" 
            maxlength="1" 
            name='code' 
            class='verify-input__code-input' 
            required
        />
        <input 
            type="number" 
            max="1" 
            maxlength="1" 
            name='code' 
            class='verify-input__code-input' 
            required
        />
        <input 
            type="number" 
            max="1" 
            maxlength="1" 
            name='code' 
            class='verify-input__code-input' 
            required
        />
    </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() { //34432
      const inputModels = ref("")
      const authStore = useAuthStore();
        onMounted(() => {
            const inputElements = [...document.querySelectorAll("input.verify-input__code-input")];
            inputElements.forEach((ele, index) => {
                ele.addEventListener("keydown", (e) => {
                // if the keycode is backspace & the current field is empty
                // focus the input before the current. Then the event happens
                // which will clear the "before" input box.
                if (e.keyCode === 8 && e.target.value === "")
                    inputElements[Math.max(0, index - 1)].focus();
                });
                ele.addEventListener("input", (e) => {
                    inputModels.value = inputElements.map(({ value }) => value).join("");
                    authStore.$patch({
                        code: inputModels.value
                    }) 
                // take the first character of the input
                // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
                // but I'm willing to overlook insane security code practices.
                const [first, ...rest] = e.target.value;
                e.target.value = first ?? ""; // first will be undefined when backspace was entered, so set the input to ""
                const lastInputBox = index === inputElements.length - 1;
                const didInsertContent = first !== undefined;
                if (didInsertContent && !lastInputBox) {
                    // continue to input the rest of the string
                    inputElements[index + 1].focus();
                    inputElements[index + 1].value = rest.join("");
                    inputElements[index + 1].dispatchEvent(new Event("input"));
                }
                });
            });
        });
        
        const onInput = (e, key) => {
            inputModels[key] = e.data; 
        }    
        return {
            inputModels,
            onInput
        }
    },
});
</script>

<style lang="scss" scoped>
    .verify-input {
        display: flex;
        margin-top: 1.4rem;
        margin-bottom: 1.4rem;
        justify-content: center;
        gap: .8rem;
        &__code-input {
            appearance: none;
            display: inline;
            text-align: center;
            color: $black;
            font-size: 2rem;
            font-weight: 500;
            width: 4.8rem;
            outline: none;
            height: 5.6rem;
            border: .1rem solid rgba($color: $blue, $alpha: .4);
            border-radius: .8rem;
            caret-color: transparent; //33443
            
            &:focus {
                border: .1rem solid rgba($color: $blue, $alpha: 1);
            }

            &:valid {
                border: .1rem solid rgba($color: $blue, $alpha: .6) ;
            }
        }
    }

   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
</style>
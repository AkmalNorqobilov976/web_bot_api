import {ref} from 'vue'
export const useVMoney = () => {
    const numberFormatterConfig = ref({
        prefix: '',
        suffix: '',
        masked: false,
        thousands: ',',
        decimal: '.',
        precision: 0,
        disableNegative: false,
        disabled: false,
        min: null,
        max: 10000000,
        allowBlank: false,
        minimumNumberOfCharacters: 0,
      })

      return {
        numberFormatterConfig
      }
}
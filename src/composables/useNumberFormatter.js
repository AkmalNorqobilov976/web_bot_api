import { computed } from 'vue';
export function useNumberFormatter() {

    const numberReformatter = (value) => {
        return value.split(',').join('');
    }

    const numberFormatter = (value) => {
        return computed(() => new Intl.NumberFormat(undefined).format(value))
    };

    return {
        numberReformatter,
        numberFormatter
    }
}
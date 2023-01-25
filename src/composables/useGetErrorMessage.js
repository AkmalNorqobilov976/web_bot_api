
export function useGetErrorMessage() {

    const getErrorMessage = (error) => {
        console.log(Object.keys(JSON.parse(JSON.stringify(error, null, 4))));
        return JSON.parse(JSON.stringify(error, null, 4)).response
            .data.message;
    }

    return {
        getErrorMessage
    }
}
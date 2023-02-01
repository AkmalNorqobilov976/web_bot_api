
export function useGetErrorMessage() {

    const getErrorMessage = (error) => {
        return JSON.parse(JSON.stringify(error, null, 4)).response
            .data.message;
    }

    return {
        getErrorMessage
    }
}
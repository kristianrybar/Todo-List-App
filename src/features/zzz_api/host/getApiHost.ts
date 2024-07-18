export const getApiHost = () => {
    let mockApiHost = 'https://66960df60312447373c0d868.mockapi.io'
    if (import.meta.env.VITE_REACT_MOCK_API_HOST)
        mockApiHost = import.meta.env.VITE_REACT_MOCK_API_HOST

    return mockApiHost
}
export const getApiHost = () => {
    let mockApiHost = ''
    if (import.meta.env.VITE_REACT_MOCK_API_HOST)
        mockApiHost = import.meta.env.VITE_REACT_MOCK_API_HOST

    return mockApiHost
}
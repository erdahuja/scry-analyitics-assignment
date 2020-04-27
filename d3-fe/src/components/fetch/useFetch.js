import React from 'react';

const useFetch = (url, options = {}) => {
    const [response, setResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return [response, isLoading];
};

export default useFetch;
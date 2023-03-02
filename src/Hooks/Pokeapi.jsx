import { useState, useEffect, useRef } from 'react';

function useFetch(url){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
                setIsLoading(res);
            } catch(e) {
                setIsError(e);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return [data, isLoading, isError];
}

export default useFetch;
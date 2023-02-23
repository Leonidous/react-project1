import { useState, useEffect, useRef } from 'react';

function useFetch(url){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
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
    }, [dataFetchedRef]);
    return [data, isLoading, isError];
}

export default useFetch;
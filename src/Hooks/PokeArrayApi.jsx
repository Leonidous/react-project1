import { useState, useEffect} from 'react';

function useArrayFetch(urlArray){
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            if(urlArray && urlArray.length > 0) {
                const Endpoints = urlArray.map(async (urlObj) => 
                    fetch(urlObj)
                );
    
                const rawResponseList = await Promise.all(Endpoints);
                const data = await Promise.all(
                    rawResponseList.map((res) => res.json())
                );
                setData(data);
            }
        };
        fetchData();
    }, [JSON.stringify(urlArray)]);
    return[data];
}

export default useArrayFetch;
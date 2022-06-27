import { useState,useEffect} from "react";

//custom hook should start with the word use

const useFetch = (url) => {

    const [ data, setData ] = useState(null);
    const [isPending ,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url,{signal: abortCont.signal})
        .then(res => {
            console.log(res);
            if(!res.ok)
            throw Error('could not fetch data for that resource');
    
            return res.json();
        })
        .then((data)=>{
            
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if(err.name ==='AbortError')
            {
                console.log('fetch abort');
            }else{
            setError(err.message);
            setIsPending(false);
            }
        });
        return () => abortCont.abort();

    },[url]);
    
    return {data,isPending,error}
}

export default useFetch;

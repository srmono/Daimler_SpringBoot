import { useEffect, useState } from "react";

function LifeCycle() {

    const [data, setData] = useState(null);

    useEffect( () => {

        console.log("Component mounted")

        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await response.json()
            setData(result[0])
            console.log("data fetched")
        }
        fetchData();

        return () => {
            console.log(("clean up when component unmounts or before effect rerun"))
        }

    }, [] )

  return (
    <>
        <div>Fetch Data </div>
        { data && <h2> {data.title} </h2>}
    </>
  )
}

export default LifeCycle
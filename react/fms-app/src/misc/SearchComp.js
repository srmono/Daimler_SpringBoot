import React, {useState} from 'react'

function SearchComp() {
    const items = [
        "Java Script",
        "Python",
        "Dotnet",
        "GoLang",
        "Kotlin",
        "Node",
        "Microsoft",
        "Aws",
        "Azure",
        "GCP"
    ]

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange  =(e) => {
        setSearchQuery(e.target.value)
    }

    const filteredItems = items.filter( (item) => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

  return (
    <>
        <h2> List of Technologies</h2>
        <input 
            type="text"
            placeholder='Search ...'
            value={searchQuery}
            onChange={handleChange}
        />
    {/* {searchQuery} */}
    {/* {filteredItems} */}
        <ul>
            {
                filteredItems.length > 0 ? (
                    filteredItems.map(
                        (item, index) => <li key={index}> {item} </li>
                    )
                ) : ( <li> No Results </li>)
            }
        </ul>
    </>
  )
}

export default SearchComp
import React, {useMemo, useState} from 'react'

function SearchComponent({ users }) {
    const [query, setquery] = useState("");

    //const filteredUsers = users.filter((user) => user.toLowerCase().includes(query.toLowerCase()))

    const filteredUsers = useMemo(
        () => users.filter( (user) => user.toLowerCase().includes(query.toLowerCase()) ),
        [users, query]
    )

  return (
    <div>
        <input
            type='text'
            placeholder='Search Users'
            value={query}
            onChange={(e) => setquery(e.target.value)}
         />
         <ul>
            {filteredUsers.length > 0 ? 
                ( filteredUsers. map(
                    (user) => ( <li key={user}> {user}</li>)
                )) :  
                (<div> No user Found </div>)
            }
         </ul>
    </div>
  )
}

export default SearchComponent
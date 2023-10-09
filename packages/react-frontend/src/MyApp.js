import Table from "./Table";
import Form from './Form';
import React, {useState, useEffect} from 'react';


function MyApp() {
  const [characters, setCharacters] = useState([

  ]);
  
  function removeOneCharacter (index) {
    deleteUser(characters[index].id);
    const updated = characters.filter((character, i) => {
        return i !== index
    });
  setCharacters(updated);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );
  
  return (
    <div className="container">
    <Table characterData={characters} 
	    removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
  );
  function updateList(person) { 
    postUser(person)
    .then((response) => { if (response.status === 201) {
      return response.json()
    }
  })
    .then((json) => { setCharacters([...characters, json]);
    })
    .catch((error) => {
      console.log(error);
    })

}
function deleteUser(id) {
  const url = `Http://localhost:8000/users/${id}`;
  const promise = fetch(url, { method: "DELETE" });
  return promise;
}
}

export default MyApp;

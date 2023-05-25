import React, { useEffect, useState } from "react";
import axios from "../../axios";

enum Sex {
  Male = "Male",
  Female = "Female",
}

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  address: string;
  valid_id_type: string;
  valid_id_pic: string;
  birthday: Date;
  age: number;
};

const Users = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/users/voter-list")
      .then((res) => setUser(res.data.users))
      .catch((error) => console.log({ error }));
  }, []);

  if (users.length === 0) return <div>
    No verified voters.
  </div>;

  return (
    <div className="users-wrapper">
      <span className="title-small">Voter List</span>
      {users.map((user, index) => (
        <div key={index} className="user-wrapper">
          Name: {user.first_name} {user.last_name}
          <br/>
          Email: {user.email}
          <br/>
          Sex: {user.sex}
          <br/>
          Birthday: {user.birthday}
          <br/>
          Age: {user.age}
          <br/>
          Address: {user.address}
          <br/>
          Valid ID Type: {user.valid_id_type}
          <br/>
          Valid ID Number: {user.valid_id_pic}
        </div>
      ))}
    </div>
  );
};

export default Users;

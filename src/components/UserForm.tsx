import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";

export const UserForm = () => {
  const queryClient = useQueryClient();
  const newUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("error"),
  });
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    age: 0,
    single: false,
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    newUser.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={({ target }) =>
          setFormData({ ...formData, name: target.value })
        }
        placeholder="Name"
        type="text"
      />
      <input
        onChange={({ target }) =>
          setFormData({ ...formData, fullName: target.value })
        }
        placeholder="Full Name"
        type="text"
      />
      <input
        onChange={({ target }) =>
          setFormData({ ...formData, age: +target.value })
        }
        placeholder="Age"
        type="number"
      />
      <label>single:</label>
      <input
        onChange={({ target }) =>
          setFormData({ ...formData, single: target.checked })
        }
        type="checkbox"
        name=""
        id=""
      />
      <button type="submit">save</button>
    </form>
  );
};

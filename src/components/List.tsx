import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUser } from "../api/users";

export const List = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    select: (users) => users.sort((a, b) => b.id - a.id),
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <div>
      <h1>User List</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        users?.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.fullName}</p>
            <p>{user.age}</p>
            <div>
              <h3>Single:</h3>
              <p>{`${user.single}`}</p>
              <input
                checked={user.single}
                onChange={({ target }) =>
                  updateUserMutation.mutate({
                    ...user,
                    single: target.checked,
                  })
                }
                type="checkbox"
              />
            </div>
            <button
              onClick={() => deleteUserMutation.mutate(user.id)}
              type="button"
            >
              DELETE
            </button>
          </div>
        ))
      )}
    </div>
  );
};

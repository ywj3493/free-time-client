import fetchWithAuth from "../common";

export async function updateUser(request: UserUpdateRequest) {
  try {
    const response = await fetchWithAuth("/users/update", {
      method: "PUT",
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.log(error);
  }
}

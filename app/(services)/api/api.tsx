import axios from "axios";

interface User {
    username?: string;
    email: string;
    password: string;
}

export const registerUser = async (user: User) => {
  console.log(user);
  const response = await axios.post(
    "https://grumpy-heads-cheat.loca.lt/api/users/register",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginUser = async (user: User) => {
  const response = await axios.post(
    "https://grumpy-heads-cheat.loca.lt/api/users/login",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
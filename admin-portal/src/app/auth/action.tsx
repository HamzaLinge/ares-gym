"use server";

export async function login(prevState: any, formData: FormData) {
  console.log(prevState);
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(loginData);
  try {
    const res = await fetch("http://localhost:3001/auth/local/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.json());
    return { message: "Success" };
  } catch (error) {
    console.error(error);
    return { message: "Error" };
  }
}

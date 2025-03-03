export const sendRegisterRequest = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: "Failed to connect to server." };
    }
  };
  
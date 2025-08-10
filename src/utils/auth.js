const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const adminEmails = ["admin@example.com", "superadmin@example.com"];

export const signUp = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await res.json();

  if (data.error) {
    return { success: false, message: data.error.message };
  }

  if (!adminEmails.includes(email.toLowerCase())) {
    return { success: false, message: "Access denied. Admins only." };
  }

  return { success: true, data };
};

export const login = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await res.json();

  if (data.error) {
    return { success: false, message: data.error.message };
  }

  if (!adminEmails.includes(email.toLowerCase())) {
    return { success: false, message: "Access denied. Admins only." };
  }

  return { success: true, data };
};

export const sendPasswordResetEmail = async (email) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestType: "PASSWORD_RESET", email }),
    }
  );

  const data = await res.json();

  if (data.error) {
    return { success: false, message: data.error.message };
  }

  return { success: true, message: "Password reset email sent" };
};

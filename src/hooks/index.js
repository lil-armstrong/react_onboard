// Auth provider hook
import { useState } from "react";
export function useProvideAuth() {
  const [session, setSession] = useState(null);
  const [users, setUser] = useState({});
  const [error, setError] = useState(null);
  return {
    session,
    setSession,
    setUser,
    users,
    setError,
    error,
  };
}

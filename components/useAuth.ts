import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // geçici: auth devre dışı
    setUser(null);
    setLoading(false);
  }, []);

  return { user, loading };
}

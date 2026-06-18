import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase"; // path sende farklıysa düzelt

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (!sb) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data } = await sb.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    }

    init();
  }, []);

  return { user, loading };
}

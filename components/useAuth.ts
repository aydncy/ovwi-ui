import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data } = await sb.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    }

    init();

    const { data: listener } = sb.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

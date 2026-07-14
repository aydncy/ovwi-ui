'use client';

import Link from 'next/link';
import { useUser } from '@/lib/useUser';

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-black text-white">
            O
          </div>

          <span className="font-bold text-white">
            OVWI
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          /docs
            Docs
          </Link>

          {user ? (
            dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>
          ) : (
            <>
              /auth/login
                Login
              </Link>

              <Link
                       Sign up
              </Link>
            </>
          )}
        </div>

        <div className="text-sm text-slate-500">
          © 2026 OVWI · Open Verifiable Workflow Infrastructure
        </div>
      </div>
    </footer>
  );
}

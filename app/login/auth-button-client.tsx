'use client';

import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  user: User | null;
}

export default function AuthButtonClient({ user }: Props) {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return user ? (
    <button onClick={handleSignOut}>Logout</button>
  ) : (
    <button onClick={handleSignIn}>Login</button>
  );
}

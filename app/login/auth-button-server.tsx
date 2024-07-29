import { createClient } from '@/utils/supabase/server';
import AuthButtonClient from './auth-button-client';

export default async function AuthButtonServer() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return <AuthButtonClient user={data?.user} />;
}

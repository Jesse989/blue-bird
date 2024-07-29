'use server';

import { createClient } from '@/utils/supabase/server';

export const addTweet = async (formData: FormData) => {
  const title = formData.get('title');
  if (!title) {
    throw new Error('Title is required');
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  await supabase
    .from('tweets')
    .insert({ title: String(title), user_id: user.id });
};

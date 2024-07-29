import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import NewTweet from './new-tweet';
import Tweets from './tweets';
import AuthButtonServer from './login/auth-button-server';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(*)');

  if (!user) {
    redirect('/login');
  }

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      likes: tweet.likes?.length,
      user_has_liked_tweet: tweet.likes?.some(
        (like) => like.user_id === user.id,
      ),
    })) ?? [];

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      <Tweets tweets={tweets} />
    </>
  );
}

'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { LikeAction } from './tweets';

interface Props {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (action: LikeAction) => void;
}

export default function Likes({ tweet, addOptimisticTweet }: Props) {
  const router = useRouter();

  const handleLikes = async () => {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return;
    }

    if (tweet.user_has_liked_tweet) {
      addOptimisticTweet({
        type: 'unlike',
        tweet,
      });

      await supabase
        .from('likes')
        .delete()
        .match({ tweet_id: tweet.id, user_id: user.id });
    } else {
      addOptimisticTweet({
        type: 'like',
        tweet,
      });

      await supabase
        .from('likes')
        .insert({ tweet_id: tweet.id, user_id: user.id });
    }

    router.refresh();
  };

  return (
    <form action={handleLikes}>
      <button>{tweet.likes} Likes</button>
    </form>
  );
}

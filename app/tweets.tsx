'use client';

import { useEffect, useOptimistic } from 'react';
import Likes from './likes';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, Stack } from '@mui/joy';

export type LikeAction = {
  type: 'like' | 'unlike';
  tweet: TweetWithAuthor;
};

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const supabase = createClient();
  const router = useRouter();
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    LikeAction
  >(tweets, (state, action) => {
    const newTweets = [...state];

    switch (action.type) {
      case 'like':
        return newTweets.map((tweet) => {
          if (tweet.id === action.tweet.id) {
            return {
              ...tweet,
              likes: tweet.likes + 1,
              user_has_liked_tweet: true,
            };
          }

          return tweet;
        });
      case 'unlike':
        return newTweets.map((tweet) => {
          if (tweet.id === action.tweet.id) {
            return {
              ...tweet,
              likes: tweet.likes - 1,
              user_has_liked_tweet: false,
            };
          }

          return tweet;
        });
    }
  });

  useEffect(() => {
    const channel = supabase
      .channel('realtime tweets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tweets',
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [router, supabase]);

  return (
    // create a flex box list of tweets
    <Stack gap={2}>
      {optimisticTweets.map((tweet) => (
        <Stack key={tweet.id} gap={1}>
          <Card>
            <p>
              {tweet.author.name} {tweet.author.username}
            </p>
            <p>{tweet.title}</p>
            <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
          </Card>
        </Stack>
      ))}
    </Stack>
  );
}

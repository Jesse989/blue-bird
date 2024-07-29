import { Tables } from '@/types/supabase';

type Tweet = Tables<'tweets'>;
type Profile = Tables<'profiles'>;

declare global {
  type TweetWithAuthor = Tweet & {
    author: Profile;
    likes: number;
    user_has_liked_tweet: boolean;
  };
}

import { addTweet } from './actions';

export default function NewTweet() {
  return (
    <form action={addTweet}>
      <input type="text" name="title" className="bg-inherit" />
      <button type="submit">Tweet</button>
    </form>
  );
}

import { query } from '../../lib/db';
import Link from 'next/link';

export default async function Home({ searchParams }) {
  const sort = searchParams.sort === 'asc' ? 'ASC' : 'DESC';
  const posts = await query('SELECT * FROM posts ORDER BY created_at ' + sort);

  return (
    <>
      <h1>Posts</h1>
      <select onChange={(e) => (window.location.href = `/?sort=${e.target.value}`)}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
      <a href="/posts/new">New Post</a>
    </>
  );
}
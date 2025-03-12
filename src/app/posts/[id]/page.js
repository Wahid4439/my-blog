"use client";

import { useState } from 'react';
import { query } from '../../../lib/db';

export default async function Post({ params }) {
  const post = (await query('SELECT * FROM posts WHERE id = $1', [params.id]))[0];
  const comments = await query('SELECT * FROM comments WHERE post_id = $1', [params.id]);

  if (!post) return <p>Not found</p>;

  async function handleDelete() {
    await fetch(`/api/posts?id=${params.id}`, { method: 'DELETE' });
    window.location.href = '/';
  }

  return (
    <>
      <h1>{post.title}</h1>
      <button onClick={handleDelete}>Delete</button>
      <h2>Comments</h2>
      {comments.map((c) => (
        <p key={c.id}>{c.content}</p>
      ))}
      <CommentForm postId={params.id} />
    </>
  );
}

function CommentForm({ postId }) {
  const [content, setContent] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ postId, content }),
    });
    setContent('');
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
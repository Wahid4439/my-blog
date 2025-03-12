"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Post</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button type="submit">Save</button>
    </form>
  );
}
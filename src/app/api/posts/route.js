import { query } from '../../../lib/db';
import { redirect } from 'next/navigation';

export async function POST(request) {
  const body = await request.json();
  if (body.title) {
    await query('INSERT INTO posts (title) VALUES ($1)', [body.title]);
    redirect('/');
  } else if (body.postId && body.content) {
    await query('INSERT INTO comments (post_id, content) VALUES ($1, $2)', [body.postId, body.content]);
    return new Response(null, { status: 201 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await query('DELETE FROM posts WHERE id = $1', [id]);
  return new Response(null, { status: 204 });
}
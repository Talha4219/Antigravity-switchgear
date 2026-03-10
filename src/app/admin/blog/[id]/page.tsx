'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState, use, useReducer } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';

// Dynamic import for RichTextEditor to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/ui/rich-text-editor'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full border rounded-md bg-muted/20 animate-pulse" />
});

const initialState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '',
  date: '',
  imageId: '',
  status: 'Draft' as 'Published' | 'Draft',
  loading: true,
  submitting: false,
  uploading: false,
};

type Action =
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_POST'; post: any }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_UPLOADING'; value: boolean };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_POST':
      return { ...state, ...action.post, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SET_SUBMITTING':
      return { ...state, submitting: action.value };
    case 'SET_UPLOADING':
      return { ...state, uploading: action.value };
    default:
      return state;
  }
}

export default function EditBlogPostPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const post = await res.json();
        dispatch({ type: 'SET_POST', post });
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to load blog post');
        router.push('/admin/blog');
      } finally {
        dispatch({ type: 'SET_LOADING', value: false });
      }
    }
    fetchPost();
  }, [params.id, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    dispatch({ type: 'SET_UPLOADING', value: true });
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        dispatch({ type: 'SET_FIELD', field: 'imageId', value: data.url });
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      dispatch({ type: 'SET_UPLOADING', value: false });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTING', value: true });
    try {
      const res = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: state.title,
          slug: state.slug,
          excerpt: state.excerpt,
          content: state.content,
          author: state.author,
          date: state.date,
          imageId: state.imageId,
          status: state.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update post');
      }
      router.push('/admin/blog');
    } catch (error: any) {
      console.error('Error updating post:', error);
      alert(`Error: ${error.message}`);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  }

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={state.title} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={state.slug} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'slug', value: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={state.author} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'author', value: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" placeholder="YYYY-MM-DD" value={state.date} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageId">Image URL</Label>
              <div className="flex gap-2">
                <Input id="imageId" value={state.imageId} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'imageId', value: e.target.value })} required placeholder="Enter URL or upload image" />
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('imageUpload')?.click()}
                  disabled={state.uploading}
                >
                  {state.uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={state.status} onValueChange={(value) => dispatch({ type: 'SET_FIELD', field: 'status', value: value as 'Published' | 'Draft' })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={state.excerpt} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'excerpt', value: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              value={state.content}
              onChange={(value) => dispatch({ type: 'SET_FIELD', field: 'content', value })}
              placeholder="Write your article content here..."
              className="min-h-[400px]"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={state.submitting}>
              {state.submitting ? 'Updating...' : 'Update Post'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/admin/blog')}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";


// Sanity query to fetch posts
const POSTS_QUERY = `*[ 
  _type == "post" 
  && defined(slug.current) 
] | order(publishedAt desc)[0...12] { 
  _id, 
  title, 
  slug, 
  publishedAt, 
  image { asset -> { url } } 
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  // Fetch posts from Sanity
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
    console.log(posts)
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <div className="flex items-center gap-4">
                {post.image && post.image.asset && (
                  <img 
                    src={post.image.asset.url} 
                    alt={post.title} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

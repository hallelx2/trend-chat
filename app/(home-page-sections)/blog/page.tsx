import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

const blogPosts = [
    {
        id: 1,
        title: "Leveraging AI for Trend Analysis: A Comprehensive Guide",
        excerpt: "Discover how artificial intelligence is revolutionizing the way businesses analyze and predict market trends.",
        date: "May 15, 2023",
        author: "Jane Doe",
        image: "/placeholder.svg"
    },
    {
        id: 2,
        title: "The Power of Niche Communities in Market Research",
        excerpt: "Explore the untapped potential of niche online communities and how they can provide valuable insights for your business.",
        date: "May 10, 2023",
        author: "John Smith",
        image: "/placeholder.svg"
    },
    {
        id: 3,
        title: "From Data to Decisions: Actionable Insights with TrendChat",
        excerpt: "Learn how to transform raw data into actionable business strategies using TrendChat's advanced analytics.",
        date: "May 5, 2023",
        author: "Alice Johnson",
        image: "/placeholder.svg"
    }
]

export default function Blog() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-8 text-center">TrendChat Blog</h1>
                    <p className="text-xl text-center mb-12">Stay updated with the latest insights, trends, and tips from our experts.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="bg-black rounded-lg shadow-md overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{post.date}</span>
                                        <span>By {post.author}</span>
                                    </div>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

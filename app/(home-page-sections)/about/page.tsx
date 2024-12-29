import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'

export default function About() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-8 text-center">About TrendChat</h1>

                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-200 mb-4">
                            At TrendChat, we're on a mission to empower businesses and individuals with real-time insights from niche online communities. We believe that understanding trends and conversations as they happen is crucial for making informed decisions in today's fast-paced world.
                        </p>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">How TrendChat Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">1. Data Collection</h3>
                                <p className="text-gray-200 mb-4">
                                    Our advanced web scraping technology continuously gathers data from forums, social media, and niche online communities in real-time.
                                </p>

                                <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
                                <p className="text-gray-200 mb-4">
                                    Our sophisticated AI algorithms process the collected data, performing sentiment analysis, trend detection, and summarization.
                                </p>

                                <h3 className="text-xl font-semibold mb-2">3. Conversational Interface</h3>
                                <p className="text-gray-200 mb-4">
                                    Users can interact with our AI through a natural language interface, asking questions and receiving insights about trends and discussions.
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/placeholder.svg"
                                    alt="TrendChat Process"
                                    width={400}
                                    height={400}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                        <p className="text-gray-200 mb-4">
                            TrendChat was founded by a team of data scientists, AI researchers, and business strategists who saw the need for more accessible and actionable insights from online conversations.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
                        <p className="text-gray-200 mb-4">
                            We're always looking for talented individuals who are passionate about AI, data analysis, and helping businesses make smarter decisions. Check out our careers page for current openings.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

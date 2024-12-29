import Link from 'next/link';
import { FC } from "react";
import { Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

interface PricingTierProps {
    name: string;
    price: string; // Use `string` to allow flexibility for formats like "$49.99"
    features: string[];
    cta: string;
    highlighted?: boolean; // Optional prop
}

const PricingTier: FC<PricingTierProps> = ({ name, price, features, cta, highlighted = false }) => (
    <div className={`bg-black rounded-lg shadow-lg p-8 ${highlighted ? 'border-2 border-blue-600' : ''}`}>
        <h3 className="text-2xl font-semibold mb-4">{name}</h3>
        <p className="text-4xl font-bold mb-6">
            {price}
            <span className="text-lg font-normal">/month</span>
        </p>
        <ul className="mb-8 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <Link
            href="/signup"
            className={`block w-full text-center py-2 px-4 rounded-md ${highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition duration-300`}
        >
            {cta}
        </Link>
    </div>
);

export default function Pricing() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Plan</h1>
                    <p className="text-xl text-center mb-12">Select the perfect plan for your needs and start uncovering valuable insights today.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingTier
                            name="Free"
                            price="$0"
                            features={[
                                "Basic trend summaries",
                                "Limited queries per day",
                                "Community support",
                                "Access to public datasets"
                            ]}
                            cta="Get Started"
                        />
                        <PricingTier
                            name="Pro"
                            price="$49"
                            features={[
                                "Advanced analytics",
                                "Unlimited queries",
                                "Conversational insights",
                                "Priority support",
                                "Custom data sources"
                            ]}
                            cta="Choose Pro"
                            highlighted={true}
                        />
                        <PricingTier
                            name="Enterprise"
                            price="Custom"
                            features={[
                                "Custom integrations",
                                "API access",
                                "Dedicated account manager",
                                "24/7 premium support",
                                "On-premise deployment options"
                            ]}
                            cta="Contact Sales"
                        />
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
                        <p className="text-gray-700 mb-8">We offer tailored plans for large organizations and specific use cases. Let's discuss your needs.</p>
                        <Link
                            href="/contact"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Contact Our Sales Team
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

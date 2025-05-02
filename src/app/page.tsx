"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import AIChatbot from "@/components/ai-chatbot";

const stats = [
  { label: "Global Victims", value: "40.3 million" },
  { label: "Annual Profit", value: "$150 billion" },
  { label: "Children Trafficked", value: "1 in 4 victims" },
];

const teamMembers = [
  {
    name: "Aditya Bhatia",
    description: "Computer Science Student passionate about AI for Social Good.",
  },
  {
    name: "Mahin Mirza",
    description: "Computer Science Student driven to make a difference with AI.",
  },
];

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Basic form validation
        if (!name || !email || !message) {
            toast({
                title: "Error!",
                description: "Please fill in all fields.",
                variant: "destructive",
            });
            return;
        }

        // Simulate a successful submission
        toast({
            title: "Success!",
            description: "Your message has been sent.",
        });

        // Clear the form
        setName("");
        setEmail("");
        setMessage("");
    };

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-teal-600">Combating Human Trafficking Using AI</h1>
        <p className="text-lg mb-6">Leveraging Technology for a Safer Tomorrow</p>
        <p className="text-gray-700 leading-relaxed">
          GuardianAI is dedicated to using artificial intelligence to combat human trafficking. We provide
          resources, support, and tools to help NGOs, law enforcement, and communities fight against this
          global issue.
        </p>
      </section>

      {/* Problem Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Problem Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Human trafficking is a grave violation of human rights, affecting millions worldwide. It's a
          complex issue that's hard to detect due to its hidden nature and the sophistication of traffickers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{item.value}</CardTitle>
                <CardDescription>{item.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed">
          Traditional methods often fall short. However, AI offers new possibilities by analyzing vast
          amounts of data to identify patterns and suspicious activities that would otherwise go unnoticed.
        </p>
      </section>

      {/* About Human Trafficking */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">About Human Trafficking</h2>
        <h3 className="text-2xl font-semibold mb-2">Definition</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Human trafficking involves compelling or coercing individuals into forced labor, sexual exploitation, or other forms of servitude.
        </p>

        <h3 className="text-2xl font-semibold mb-2">Types of Trafficking</h3>
        <h4 className="text-xl font-semibold mb-2">Sex Trafficking</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Exploitation of individuals for commercial sex acts through force, fraud, or coercion.
        </p>
        <h4 className="text-xl font-semibold mb-2">Labor Trafficking</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Forced labor or debt bondage where individuals are compelled to work against their will under threat of penalty.
        </p>
        <h4 className="text-xl font-semibold mb-2">Child Trafficking</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Recruitment, harboring, transportation, or obtaining of a child for labor or sexual exploitation.
        </p>

        <h3 className="text-2xl font-semibold mb-2">Causes and Risk Factors</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Poverty, lack of education, social inequality, political instability, and armed conflicts increase vulnerability to trafficking.
        </p>

        <h3 className="text-2xl font-semibold mb-2">Signs of Trafficking</h3>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Living in poor conditions and under strict surveillance.</li>
          <li>Lack of personal identification documents.</li>
          <li>Signs of physical abuse, malnourishment, or psychological trauma.</li>
          <li>Fear or anxiety when interacting with law enforcement.</li>
        </ul>
      </section>

      {/* AI Solution */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our AI Solution</h2>
        <p className="text-gray-700 leading-relaxed">
          Our AI solution employs machine learning, natural language processing, and image recognition to
          detect potential trafficking networks. By analyzing online activities, financial transactions, and
          other data points, we can identify and help prevent trafficking incidents.
        </p>
      </section>

      {/* Impact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Impact Section</h2>
        <p className="text-gray-700 leading-relaxed">
          GuardianAI aims to make a real-world difference by empowering NGOs, law enforcement, and communities.
          Our tools and resources help them to:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Identify and rescue victims more effectively</li>
          <li>Disrupt trafficking networks</li>
          <li>Provide better support and resources to survivors</li>
        </ul>
      </section>

      {/* Real Stories / Survivor Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Real Stories / Survivor Testimonials</h2>
        <p className="text-gray-700 italic mb-6">
          Inspirational Journeys and Recovery Stories.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Project Artemis: Global</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Where:</strong> Global (Platforms like Xbox, Skype)
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Tool Used:</strong> Project Artemis by Microsoft
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Story:</strong> A man grooming minors through a popular game chat was flagged by Project Artemis,
            which uses AI to detect suspicious behavior and escalate for human review. The flagged chat was passed
            to moderators and law enforcement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Outcome:</strong> The man was arrested before he could meet any victims in person.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Traffic Jam: U.S.</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Where:</strong> U.S.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Tool Used:</strong> Traffic Jam by Marinus Analytics
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Story:</strong> A teenage girl went missing and was trafficked. After a year, law enforcement
            used AI facial recognition to scan escort ads and matched her face to a recently posted ad. The system
            flagged it, helping authorities locate and rescue her.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Outcome:</strong> She was safely reunited with her family, and arrests were made in the trafficking ring.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Brains Behind the Initiative</h2>
        <p className="text-gray-700 italic mb-6">Meet the Innovators.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                <CardDescription>{member.description}</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center mt-4 text-gray-500">
          This project is envisioned and built by Aditya Bhatia and Mahin Mirza, Computer Science students
          at KR Mangalam University, driven by a passion to make the world safer using AI.
        </p>
      </section>

      {/* Resources and Help Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Resources and Help</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          If you need help or want to learn more about human trafficking, here are some resources:
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Emergency Contacts</h3>
          <p className="text-gray-700 leading-relaxed">
            <Link href="https://humantraffickinghotline.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              National Human Trafficking Hotline
            </Link>: 1-888-373-7888
          </p>
          <p className="text-gray-700 leading-relaxed">Available 24/7 to report trafficking tips and connect victims with services.</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">What to do if you suspect trafficking</h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Call the National Human Trafficking Hotline at 1-888-373-7888.</li>
            <li>Contact local law enforcement.</li>
            <li>Be observant and take detailed notes, but do not put yourself in danger.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">How to stay safe</h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Be aware of your surroundings and trust your instincts.</li>
            <li>Avoid risky situations, such as going alone with someone you don't know well.</li>
            <li>Learn about the tactics traffickers use to lure victims.</li>
            <li>Report suspicious activity to the authorities.</li>
          </ul>
        </div>
      </section>

      {/* Join Us */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
        <p className="text-gray-700 leading-relaxed">
          🔗 Join the Fight Against Human Trafficking
        </p>
        <p className="text-gray-700 leading-relaxed">
          Learn more about our mission and how you can support us.
        </p>
        <p className="text-gray-700 leading-relaxed">
          📧 <Link href="mailto:support@stoptrafficking.in" className="text-blue-500 hover:underline">support@stoptrafficking.in</Link>
        </p>
        <p className="text-gray-700 leading-relaxed">
          📞 Helpline: +91-73040-11000 (24x7 National Human Trafficking Hotline)
        </p>
        <p className="text-gray-700 leading-relaxed">
          🌐 Partner With Us:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Volunteer with NGOs like Prajwala</li>
          <li>Join Missing Link Trust Initiatives</li>
          <li>Become a Cyber Crime Volunteer</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          🤝 Follow & Share Our Mission:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><Link href="https://instagram.com" className="text-blue-500 hover:underline">Instagram</Link></li>
          <li><Link href="https://twitter.com" className="text-blue-500 hover:underline">Twitter</Link></li>
          <li><Link href="https://facebook.com" className="text-blue-500 hover:underline">Facebook</Link></li>
        </ul>
      </section>
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">AI Support Chatbot</h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Get immediate support, information, and resources related to human
          trafficking.
        </p>
        <AIChatbot />
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Your Message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}


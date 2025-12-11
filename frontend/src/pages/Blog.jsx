import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BlogCard from '../components/common/BlogCard';
import { getBlogs } from '../api/blogs';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default content (used if API returns no data)
  const defaultBlogs = [
    {
      id: 'b1',
      title: 'How Education Changed a Village in Just One Year',
      excerpt: 'A story of how community-driven education transformed confidence, learning, and opportunity for children in a rural village.',
      content: `Education has the power to transform lives — and in the village of Karanpur, this transformation happened in less than a year.

When our team first visited, most children had never used a computer and many struggled with basic reading skills. Parents wanted their children to learn but lacked the resources.

Everything changed when we set up a Community Learning Center equipped with books, digital tablets, and volunteer teachers.

What happened next was extraordinary:
• Children began attending classes daily
• Parents became more involved in learning
• Reading and comprehension levels improved
• Girls who previously stayed home started studying confidently

One year later, the village achieved a 92% school attendance rate, and five students received scholarships for higher education.

Education didn’t just bring knowledge — it brought hope, confidence, and a brighter future.`,
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date('2024-03-01').toISOString(),
      author_details: { full_name: 'NGO Team' },
    },
    {
      id: 'b2',
      title: 'Women Empowerment — Stories of Strength & Success',
      excerpt: 'Real-life stories of women whose lives transformed through our skill development programs.',
      content: `Empowerment begins with opportunity.
Our Women Skill Development Program has trained over 300 women — but the true impact is seen in their stories.

Meet Asha, a mother of two, who joined our tailoring class. Within four months, she mastered stitching, started taking orders, and now earns enough to support her family independently.

Then there’s Rukmini, who had never used a computer before. After completing our digital literacy course, she now works at a local office managing data entry and communication.

These women didn’t just learn skills — they gained confidence, dignity, and financial independence.

Our mission is to continue building spaces where women rise, lead, and inspire others.`,
      thumbnail: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date('2024-04-18').toISOString(),
      author_details: { full_name: 'NGO Team' },
    },
    {
      id: 'b3',
      title: 'Why Clean Water Is the First Step to Community Development',
      excerpt: 'Understanding the hidden challenges of water scarcity and how access to clean water transforms health and education.',
      content: `For many communities, clean water is not just a necessity — it’s a daily struggle.
In several villages we work with, families walked miles to fetch water that was often contaminated.

Our Clean Water & Sanitation Project installed sustainable water filters and community wells. The impact was immediate:
• Children fell sick less often
• School attendance improved
• Women saved hours each day
• Hygiene awareness increased significantly

When clean water arrives, everything improves — health, education, dignity, and hope.`,
      thumbnail: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date('2024-05-09').toISOString(),
      author_details: { full_name: 'NGO Team' },
    },
    {
      id: 'b4',
      title: 'How Volunteers Are Bringing Big Change Through Small Actions',
      excerpt: 'A tribute to volunteers who prove that even small actions can create big change.',
      content: `Volunteers are the heart of our organization.
Every week, dozens of young people join us to teach children, clean public spaces, plant trees, and support elderly citizens.

One volunteer shared, “I came to help others, but I ended up finding purpose.”

Through weekend drives and community events, our volunteers have:
• Planted 5,000+ trees
• Supported 200+ students in learning
• Distributed 1,000+ hygiene kits
• Cleaned 12 public spaces

Small steps, taken with dedication, create big, lasting impact — and our volunteers prove it every day.`,
      thumbnail: 'https://images.unsplash.com/photo-1526255862804-8ecf80d1a93a?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date('2024-07-22').toISOString(),
      author_details: { full_name: 'NGO Team' },
    },
    {
      id: 'b5',
      title: 'The Future of Sustainable Communities — What We Learned in 2024',
      excerpt: 'Key insights from field work on building long-term, community-led development programs.',
      content: `Sustainability isn’t just a project — it’s a mindset.
In 2024, our NGO focused on programs that communities can sustain independently.

Here’s what we learned:
• Local leadership is essential — projects succeed when communities take ownership.
• Skill-building creates long-term impact — empowering people through skills lasts longer than providing resources.
• Youth involvement drives innovation — young leaders bring creativity to outreach and engagement.
• Collaboration accelerates development — working with schools, local NGOs, and government bodies increases effectiveness.

Our vision for the future is clear: communities that grow independently, sustainably, and confidently.`,
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=1200',
      created_at: new Date('2024-11-15').toISOString(),
      author_details: { full_name: 'NGO Team' },
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        if (data && data.length > 0) setBlogs(data);
        else setBlogs(defaultBlogs);
      } catch (e) {
        console.error('Blog fetch failed, showing defaults', e);
        setBlogs(defaultBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Top Section (Hero) */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Stories of hope, resilience, and transformation</h1>
            <p className="text-xl opacity-95">
              Our blog shares real experiences from the communities we serve and the change we create together.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">Loading blogs...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
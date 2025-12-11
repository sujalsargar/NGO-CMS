import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { getBlog } from '../api/blogs';

const defaultBlogs = {
  b1: {
    id: 'b1',
    title: 'How Education Changed a Village in Just One Year',
    excerpt:
      'A story of how community-driven education transformed confidence, learning, and opportunity for children in a rural village.',
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
    thumbnail:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    created_at: '2024-11-20T00:00:00Z',
    author_details: { full_name: 'Education Team' },
  },
  b2: {
    id: 'b2',
    title: 'Women Empowerment — Stories of Strength & Success',
    excerpt:
      'Real-life stories of women whose lives transformed through our skill development programs.',
    content: `Empowerment begins with opportunity.
Our Women Skill Development Program has trained over 300 women — but the true impact is seen in their stories.

Meet Asha, a mother of two, who joined our tailoring class. Within four months, she mastered stitching, started taking orders, and now earns enough to support her family independently.

Then there’s Rukmini, who had never used a computer before. After completing our digital literacy course, she now works at a local office managing data entry and communication.

These women didn’t just learn skills — they gained confidence, dignity, and financial independence.

Our mission is to continue building spaces where women rise, lead, and inspire others.`,
    thumbnail:
      'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200',
    created_at: '2024-11-15T00:00:00Z',
    author_details: { full_name: 'Aisha Khan' },
  },
  b3: {
    id: 'b3',
    title: 'Why Clean Water Is the First Step to Community Development',
    excerpt:
      'Understanding the hidden challenges of water scarcity and how access to clean water transforms health and education.',
    content: `For many communities, clean water is not just a necessity — it’s a daily struggle.
In several villages we work with, families walked miles to fetch water that was often contaminated.

Our Clean Water & Sanitation Project installed sustainable water filters and community wells. The impact was immediate:
• Children fell sick less often
• School attendance improved
• Women saved hours each day
• Hygiene awareness increased significantly

When clean water arrives, everything improves — health, education, dignity, and hope.`,
    thumbnail:
      'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=1200',
    created_at: '2024-11-10T00:00:00Z',
    author_details: { full_name: 'Health Unit' },
  },
  b4: {
    id: 'b4',
    title: 'How Volunteers Are Bringing Big Change Through Small Actions',
    excerpt:
      'A tribute to volunteers who prove that even small actions can create big change.',
    content: `Volunteers are the heart of our organization.
Every week, dozens of young people join us to teach children, clean public spaces, plant trees, and support elderly citizens.

One volunteer shared, “I came to help others, but I ended up finding purpose.”

Through weekend drives and community events, our volunteers have:
• Planted 5,000+ trees
• Supported 200+ students in learning
• Distributed 1,000+ hygiene kits
• Cleaned 12 public spaces

Small steps, taken with dedication, create big, lasting impact — and our volunteers prove it every day.`,
    thumbnail:
      'https://images.unsplash.com/photo-1526255862804-8ecf80d1a93a?auto=format&fit=crop&q=80&w=1200',
    created_at: '2024-11-05T00:00:00Z',
    author_details: { full_name: 'Volunteer Team' },
  },
  b5: {
    id: 'b5',
    title: 'The Future of Sustainable Communities — What We Learned in 2024',
    excerpt:
      'Key insights from field work on building long-term, community-led development programs.',
    content: `Sustainability isn’t just a project — it’s a mindset.
In 2024, our NGO focused on programs that communities can sustain independently.

Here’s what we learned:
• Local leadership is essential — projects succeed when communities take ownership.
• Skill-building creates long-term impact — empowering people through skills lasts longer than providing resources.
• Youth involvement drives innovation — young leaders bring creativity to outreach and engagement.
• Collaboration accelerates development — working with schools, local NGOs, and government bodies increases effectiveness.

Our vision for the future is clear: communities that grow independently, sustainably, and confidently.`,
    thumbnail:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=1200',
    created_at: '2024-11-01T00:00:00Z',
    author_details: { full_name: 'Strategy Team' },
  },
};

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (defaultBlogs[id]) {
        setBlog(defaultBlogs[id]);
        setLoading(false);
        return;
      }
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (e) {
        console.error('Failed to fetch blog:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/1200x500';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-blue-600 font-semibold">Loading...</main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl font-bold mb-3">Blog not found</h2>
          <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="h-72 md:h-96 relative">
          <img src={getImageUrl(blog.thumbnail)} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-4 py-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">{blog.title}</h1>
              <div className="opacity-90 mt-2">
                {new Date(blog.created_at).toLocaleDateString()} • {blog.author_details?.full_name || 'Admin'}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            <article className="md:col-span-2 prose max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-gray-800">{blog.content}</p>
            </article>
            <aside className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-bold mb-3">Enjoying the story?</h3>
                <Link to="/donate" className="block w-full text-center bg-yellow-500 text-blue-900 font-bold py-3 rounded hover:bg-yellow-400">
                  Donate Now
                </Link>
                <Link to="/get-involved" className="block w-full text-center mt-3 border-2 border-blue-600 text-blue-600 font-bold py-3 rounded hover:bg-blue-50">
                  Become a Volunteer
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetails;
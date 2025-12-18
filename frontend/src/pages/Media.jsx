import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { getMedia } from '../api/media';

/* ✅ SAFE DEFAULT NGO MEDIA */
const defaultMedia = [
  // PHOTOS
  {
    id: 1,
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format',
    caption: 'Education for Underprivileged Children'
  },
  {
    id: 2,
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format',
    caption: 'Skill Development Workshop for Women'
  },
  {
    id: 3,
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&auto=format',
    caption: 'Clean Water Initiative in Rural Areas'
  },
  {
    id: 4,
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format',
    caption: 'Community Food Distribution Program'
  },
  {
    id: 5,
    type: 'photo',
    url: 'https://greenstories.co.in/wp-content/uploads/2021/08/1-4-696x464.jpg',
    caption: 'Afforestation & Environmental Conservation'
  },
  {
    id: 6,
    type: 'photo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/A_free_health_checkup_camp_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Mannarkkad_in_Palakkad_district%2C_Kerala_on_January_30%2C_2013.jpg',
    caption: 'Free Medical Checkup Camp'
  },

  // VIDEOS (STABLE SOURCES)
  {
    id: 7,
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    caption: 'Annual NGO Fundraiser Event',
    poster: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format'
  },
  {
    id: 8,
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Volunteer Team Introduction',
    poster: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format'
  }
];

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await getMedia();
        setMediaItems(data && data.length > 0 ? data : defaultMedia);
      } catch (error) {
        console.error('Error fetching media:', error);
        setMediaItems(defaultMedia);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">

          <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
            Our Impact in Pictures & Videos 🎥
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                >
                  <div className="bg-gray-300 h-64 rounded-md mb-4" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {mediaItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
                >
                  {/* MEDIA */}
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    {item.type === 'photo' && (
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {item.type === 'video' && (
                      <video
                        src={item.url}
                        controls
                        poster={item.poster}
                        className="absolute inset-0 w-full h-full object-cover bg-black"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-center">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Media;

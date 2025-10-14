'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

function EventCard({ title, desc, date, imageUrl }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition duration-300" data-aos="fade-up">
      <img src={imageUrl || '/mlc-default.jpg'} alt={title} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-2 text-gray-300">{desc}</p>
        <p className="text-xs text-gray-500">{date ? new Date(date).toLocaleDateString() : ''}</p>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));

    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </Head>

      <div className="bg-black text-white min-h-screen font-sans">
        <section className="px-6 md:px-12 lg:px-20 pt-10 pb-14 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[64px] md:text-[88px] font-extrabold tracking-tight mb-8 font-black-future">
              EVENTS !
            </h1>
            <p className="text-gray-300 leading-relaxed max-w-xl mb-8">
              Explore our workshops, hackathons, seminars, and showcase nights. We create hands-on
              experiences where ideas turn into real projects and teams learn by building.
            </p>
          </div>
        </section>

        <section className="py-12 px-4" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Our Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((e, idx) => (
              <EventCard
                key={e._id?.toString() || idx}
                title={e.title || e.name || 'Untitled Event'}
                desc={e.description || 'No description provided.'}
                date={e.date}
                imageUrl={Array.isArray(e.imageUrls) && e.imageUrls.length > 0 ? e.imageUrls[0] : e.imageUrl || e.image || '/mlc-default.jpg'}
              />
            ))}
          </div>
        </section>

        <footer className="bg-black/40 backdrop-blur-md text-center py-6 mt-1">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

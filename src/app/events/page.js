import Head from 'next/head';
import Navbar from '@/components/Navbar';
import dbConnect from '@/lib/mongodb';
import cache from '@/lib/cache';
import Event from '@/models/Event';
import Project from '@/models/Project';
import AOSProvider from '@/components/AOSProvider';

function EventCard({ title, desc, date, imageUrl }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition duration-300" data-aos="fade-up">
      <img src={imageUrl || '/mlc-default.jpg'} alt={title} className="w-full h-52 object-cover" loading="lazy" decoding="async" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-2 text-gray-300">{desc}</p>
        <p className="text-xs text-gray-500">{date ? new Date(date).toLocaleDateString() : ''}</p>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, githubUrl, image }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition duration-300" data-aos="fade-up">
      <img src={image || '/mlc-default.jpg'} alt={title} className="w-full h-44 object-cover" loading="lazy" decoding="async" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm mb-3 text-gray-300">{desc}</p>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-block text-sm text-indigo-400 hover:underline">
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  // Server-side: try cache first to reduce DB latency for repeated requests.
  const cacheKey = 'events_page_v1';
  let cached = null;
  try {
    cached = await cache.getCache(cacheKey);
  } catch (e) {
    cached = null;
  }

  let events = [];
  let projects = [];
  let upcoming = null;

  if (cached && cached.events) {
    events = cached.events;
    projects = cached.projects || [];
    upcoming = cached.upcoming || null;
  } else {
    await dbConnect();

    const [rawEvents, rawProjects, rawUpcoming] = await Promise.all([
      // fetch a smaller initial page and only needed fields to reduce payload
      Event.find({}, 'title name description date imageUrl imageUrls').sort({ date: -1 }).limit(12).lean().exec().catch(() => []),
      Project.find({}, 'title description githubUrl image imageUrl').sort({ createdAt: -1 }).limit(6).lean().exec().catch(() => []),
      Event.findOne({ date: { $gte: new Date() } }, 'title name description date imageUrl imageUrls').sort({ date: 1 }).lean().exec().catch(() => null),
    ]);

    events = Array.isArray(rawEvents) ? rawEvents : [];
    projects = Array.isArray(rawProjects) ? rawProjects : [];
    upcoming = rawUpcoming || null;

    // stash into cache for 60s to help subsequent requests
    try {
      await cache.setCache(cacheKey, { events, projects, upcoming }, 60 * 1000);
    } catch (e) {
      // ignore cache errors
    }
  }

  // Fallback: if no upcoming found, try to find most recent future-like date by parsing strings
  if (!upcoming) {
    for (const e of events) {
      const possibleDate = e.date || e.Date || (e['Date'] ? new Date(e['Date']) : null);
      if (possibleDate && new Date(possibleDate) >= new Date()) {
        upcoming = e;
        break;
      }
    }
  }

  return (
    <AOSProvider>
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

          {/* Upcoming event section */}
          {upcoming && (
            <section className="py-10 px-4 max-w-4xl mx-auto" data-aos="fade-up">
              <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 border border-white/10">
                <img src={upcoming.imageUrl || upcoming.image || '/mlc-default.jpg'} alt={upcoming.title || upcoming.name || 'Upcoming event'} className="w-full md:w-48 h-40 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Upcoming: {upcoming.title || upcoming.name || upcoming['Event Name'] || 'Untitled Event'}</h3>
                  <p className="text-sm text-gray-300 mt-2">{upcoming.description || upcoming.Description || ''}</p>
                  <p className="text-xs text-gray-400 mt-2">{upcoming.date ? new Date(upcoming.date).toLocaleString() : (upcoming.Date ? new Date(upcoming.Date).toLocaleString() : '')}</p>
                </div>
                <div className="flex-shrink-0">
                  {upcoming.registerLink ? (
                    <a href={upcoming.registerLink} target="_blank" rel="noreferrer" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                      Register
                    </a>
                  ) : (
                    <button disabled className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md opacity-70">No registration</button>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="py-12 px-4" data-aos="fade-up">
            <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Our Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {events.map((e, idx) => {
                const key = e && e._id
                  ? (typeof e._id === 'string' ? e._id : (e._id?.toString ? e._id.toString() : idx))
                  : idx;
                const mappedTitle = e?.['Event Name'] || e?.title || e?.name || 'Untitled Event';
                const mappedDesc = e?.Description || e?.description || 'No description provided.';
                const mappedDate = e?.Date || e?.date || null;
                const mappedImageUrl = e?.['Image Url'] || (Array.isArray(e?.imageUrls) && e.imageUrls.length > 0 ? e.imageUrls[0] : e?.imageUrl || e?.image || '/mlc-default.jpg');

                return (
                  <EventCard
                    key={key}
                    title={mappedTitle}
                    desc={mappedDesc}
                    date={mappedDate}
                    imageUrl={mappedImageUrl}
                  />
                );
              })}
            </div>
          </section>

          <section className="py-12 px-4 bg-gradient-to-b from-black/20 to-transparent" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">Projects built by our members — click through to the GitHub repositories to see code and instructions.</p>
            <div className="max-w-4xl mx-auto px-4">
              <ul className="space-y-4">
                {projects.map((p, i) => (
                  <li key={p._id?.toString() || p.githubUrl || i} className="p-4 bg-white/5 rounded-md border border-white/6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{p.title || p.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">{p.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                            View on GitHub
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
                {projects.length === 0 && (
                  <li className="text-center text-gray-400">No projects found yet.</li>
                )}
              </ul>
            </div>
          </section>

          <footer className="bg-black/40 backdrop-blur-md text-center py-6 mt-1">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
            </p>
          </footer>
        </div>
      </>
    </AOSProvider>
  );
}

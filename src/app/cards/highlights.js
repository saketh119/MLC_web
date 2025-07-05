export default function Highlights() {
    return(
<section >
        <h3 className="text-2xl font-bold mb-6">Highlights</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((h, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <img src={`/highlight${h}.jpg`} alt={`Event ${h}`} className="rounded-md mb-4" />
              <p className="text-sm text-gray-300">Highlight {h} - A related description of this Highlight shown here.</p>
            </div>
          ))}
        </div>
      </section>
    )
}
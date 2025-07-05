export default function Experience() {
  return (
    <section >
        <h3 className="text-2xl font-bold mb-6">Our Experience</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4">
            <img src="/experience1.jpg" alt="Experience 1" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-lg font-semibold">Experience 1</h4>
              <p className="text-sm text-gray-300">Description of the first experience.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="/experience2.jpg" alt="Experience 2" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-lg font-semibold">Experience 2</h4>
              <p className="text-sm text-gray-300">Description of the second experience.</p>
            </div>
          </div>
        </div>

</section>
  );
}
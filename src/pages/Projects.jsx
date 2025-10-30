import Layout from '../components/Layout';

const Projects = () => {
  return (
    <Layout>
      <section className="mb-16 p-8 bg-gray-900/60 rounded-xl border border-[#00e38c]/20 shadow-2xl">
        <h2 className="text-4xl text-[#00e38c] mb-8 text-center tracking-wide" style={{ textShadow: '0 0 20px rgba(0, 227, 140, 0.4)' }}>
          Projects
        </h2>
        <div className="text-center py-16 px-5">
          <p className="text-3xl text-[#00e38c] font-bold mb-5" style={{ textShadow: '0 0 20px rgba(0, 227, 140, 0.5)' }}>
            Nerd stuff.
          </p>
          <p className="text-xl text-[#00e38c] opacity-70">
            More projects coming soon...
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;

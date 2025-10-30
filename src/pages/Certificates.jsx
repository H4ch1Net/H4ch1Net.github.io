import Layout from '../components/Layout';
import CertificateCard from '../components/CertificateCard';

const Certificates = () => {
  const certificates = [
    {
      image: '/certificates/6-2C6-M4997.png',
      title: 'PC Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-M4997',
    },
    {
      image: '/certificates/6-2C6-SP9QT.png',
      title: 'Network Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-SP9QT',
    },
    {
      image: '/certificates/6-2C6-V3A3KA.png',
      title: 'Security Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-V3A3KA',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/gold.svg',
      title: 'Fall 2022 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/3RXF0FUJXNAW',
      reportLink: 'https://cyberskyline.com/report/Y5ALL50FVXKT',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Fall 2022 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/MUXA657MJX6X',
      reportLink: 'https://cyberskyline.com/report/1PWWYTQ7JE21',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Spring 2023 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/UCQR3H95VD3V',
      reportLink: 'https://cyberskyline.com/report/YTHP86KXXKWN',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Spring 2023 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/CPCFW8GL10N4',
      reportLink: 'https://cyberskyline.com/report/CQWL1VV7EMYM',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/gold.svg',
      title: 'Fall 2023 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/MLBDDJNL01K0',
      reportLink: 'https://cyberskyline.com/report/AN8EDTRL46EF',
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/bronze.svg',
      title: 'Fall 2023 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/JNDQPQJLPJPC',
      reportLink: 'https://cyberskyline.com/report/5E790W4D4KPP',
    },
  ];

  return (
    <Layout>
      <section className="mb-16 p-8 bg-gray-900/60 rounded-xl border border-[#00e38c]/20 shadow-2xl">
        <h2 className="text-4xl text-[#00e38c] mb-8 text-center tracking-wide" style={{ textShadow: '0 0 20px rgba(0, 227, 140, 0.4)' }}>
          Certificates of Participation
        </h2>
        <p className="text-xl text-[#00e38c] text-center mb-10 leading-relaxed">
          Below are the certificates I received for participating in the National Cyber League (NCL)
          competitions, along with my professional certifications.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-10">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              image={cert.image}
              title={cert.title}
              verifyLink={cert.verifyLink}
              reportLink={cert.reportLink}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Certificates;

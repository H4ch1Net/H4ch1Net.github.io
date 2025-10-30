import Navigation from '../components/Navigation';
import CertificateCard from '../components/CertificateCard';
import { Award, Shield } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      image: '/certificates/6-2C6-M4997.png',
      title: 'PC Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-M4997',
      category: 'professional'
    },
    {
      image: '/certificates/6-2C6-SP9QT.png',
      title: 'Network Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-SP9QT',
      category: 'professional'
    },
    {
      image: '/certificates/6-2C6-V3A3KA.png',
      title: 'Security Pro Certification',
      verifyLink: 'https://certification.testout.com/verifycert/6-2C6-V3A3KA',
      category: 'professional'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/gold.svg',
      title: 'Fall 2022 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/3RXF0FUJXNAW',
      reportLink: 'https://cyberskyline.com/report/Y5ALL50FVXKT',
      category: 'ncl'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Fall 2022 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/MUXA657MJX6X',
      reportLink: 'https://cyberskyline.com/report/1PWWYTQ7JE21',
      category: 'ncl'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Spring 2023 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/UCQR3H95VD3V',
      reportLink: 'https://cyberskyline.com/report/YTHP86KXXKWN',
      category: 'ncl'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/platinum.svg',
      title: 'Spring 2023 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/CPCFW8GL10N4',
      reportLink: 'https://cyberskyline.com/report/CQWL1VV7EMYM',
      category: 'ncl'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/gold.svg',
      title: 'Fall 2023 Team Game',
      verifyLink: 'https://cyberskyline.com/verify/MLBDDJNL01K0',
      reportLink: 'https://cyberskyline.com/report/AN8EDTRL46EF',
      category: 'ncl'
    },
    {
      image: 'https://assets.cyberskyline.com/img/medals/bronze.svg',
      title: 'Fall 2023 Individual Game',
      verifyLink: 'https://cyberskyline.com/verify/JNDQPQJLPJPC',
      reportLink: 'https://cyberskyline.com/report/5E790W4D4KPP',
      category: 'ncl'
    },
  ];

  const professionalCerts = certificates.filter(cert => cert.category === 'professional');
  const nclCerts = certificates.filter(cert => cert.category === 'ncl');

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[#00e38c]/20 py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
            <span className="text-[#00e38c]">&lt;</span>
            Certificates
            <span className="text-[#00e38c]">/&gt;</span>
          </h1>
          <Navigation />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
          Below are the certificates I received for participating in the National Cyber League (NCL)
          competitions, along with my professional certifications.
        </p>

        {/* Professional Certifications */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#00e38c]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Professional Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {professionalCerts.map((cert, index) => (
              <CertificateCard
                key={index}
                image={cert.image}
                title={cert.title}
                verifyLink={cert.verifyLink}
                reportLink={cert.reportLink}
              />
            ))}
          </div>
        </div>

        {/* NCL Achievements */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#00e38c]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              National Cyber League (NCL)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {nclCerts.map((cert, index) => (
              <CertificateCard
                key={index}
                image={cert.image}
                title={cert.title}
                verifyLink={cert.verifyLink}
                reportLink={cert.reportLink}
              />
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-900/50 to-black/50 border border-[#00e38c]/20 rounded-xl p-6 sm:p-8 text-center">
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            These achievements represent my dedication to continuous learning and growth in cybersecurity and IT.
            Each certification and competition has helped me develop practical skills and deepen my understanding
            of security concepts, networking, and system administration.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#00e38c]/20 py-6 sm:py-8 px-4 text-center mt-12 sm:mt-20">
        <p className="text-sm sm:text-base text-gray-400">
          <span className="text-[#00e38c]">~$</span> H4ch1.Net © {new Date().getFullYear()}
          <span className="mx-2">|</span>
          Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Certificates;

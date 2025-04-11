import React, { useState, useEffect } from 'react';
import { Code, Package, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter'; // ✅ Correct import
import './GlassyUILandingPage.css';
import gsap from 'gsap';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Component from './ContributorsPage';

const GlassyUILandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const githubRepoUrl = 'https://github.com/Karan-010/crystal-coomponent';

  // ✅ Typewriter effect with multiple words
  const [text] = useTypewriter({
    words: ['Crystal Component', 'React Components', 'Smooth Library'],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 40,
    delaySpeed: 1000,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.homeGSap',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'sine.inOut' },
    );
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (AOS.init) {
      AOS.init({ duration: 1000, once: true });
    }
    AOS.refresh();
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center pt-10 font-mono relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950'>
      <div
        className='absolute inset-0 w-full h-full opacity-20'
        style={{ backgroundSize: '20px 20px' }}
      />
      <div className='homeGSap relative z-10 w-full max-w-4xl'>
        <header className='w-full flex justify-between items-center mb-4'></header>
        <main
          className='text-center p-12 rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-lg border border-white border-opacity-20 relative'
          style={{ marginTop: '20px' }}
          data-aos='flip-up'
          data-aos-duration='2500'
        >
          {/* ✨ Improved Typewriter Effect */}
          <h1 className='text-7xl font-bold mb-4 text-white min-h-[84px]'>
            <span className='bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent'>
              {text}
            </span>
            <Cursor cursorColor='#00ffff' cursorStyle='!' cursorBlinking={true} />
          </h1>

          <p className='text-2xl mb-8 text-white'>
            A sleek Crystal Component UI library for modern web applications.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
            <FeatureCard
              icon={<Code size={24} />}
              title='Easy to Use'
              description='Simple API for quick integration'
            />
            <FeatureCard
              icon={<Package size={24} />}
              title='Customizable'
              description='Tailor components to your needs'
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title='Performant'
              description='Optimized for smooth interactions'
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link to='/components'>
              <GlassmorphismButton>Explore Components</GlassmorphismButton>
            </Link>
            <Link to='/contributors'>
              <GlassmorphismButton variant='secondary'>
                Our Contributors
              </GlassmorphismButton>
            </Link>
            <GlassmorphismButton
              variant='secondary'
              as='a'
              href={githubRepoUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub Repository
            </GlassmorphismButton>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className='p-6 rounded-lg backdrop-filter backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-10 transition-all duration-300 hover:bg-opacity-10 hover:scale-105'>
    <div className='text-blue-400 mb-4'>{icon}</div>
    <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>
    <p className='text-gray-300'>{description}</p>
  </div>
);

// Glassmorphism Button Component
const GlassmorphismButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}> = ({ children, variant = 'primary', as = 'button', ...props }) => {
  const className = `
    px-6 py-3 rounded-full text-white font-semibold
    backdrop-filter backdrop-blur-sm bg-opacity-20 border border-white border-opacity-20
    transition-all duration-300 ease-in-out
    hover:bg-opacity-30 hover:shadow-lg hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
    ${variant === 'primary' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'}
  `;

  return React.createElement(as, { className, ...props }, children);
};

export default GlassyUILandingPage;


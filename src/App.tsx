import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, PiggyBank, GraduationCap, Sun, Moon, Monitor } from 'lucide-react';

const slides = [
  {
    title: "Master Personal Finance",
    description: "Learn essential skills to manage your money effectively",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Understand Market Dynamics",
    description: "Explore how global markets work and make informed decisions",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Investment Strategies",
    description: "Build wealth through smart investment choices",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200"
  }
];

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Interactive Courses",
    description: "Learn at your own pace with our comprehensive curriculum"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Market Analysis",
    description: "Real-time market data and expert analysis"
  },
  {
    icon: <PiggyBank className="w-6 h-6" />,
    title: "Personal Finance",
    description: "Master budgeting, saving, and investing"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Expert Guidance",
    description: "Learn from industry professionals"
  }
];

type Theme = 'light' | 'dark' | 'auto';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const ThemeIcon = {
    light: Sun,
    dark: Moon,
    auto: Monitor
  }[theme];

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm fixed w-full z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">EcoFinance</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</a>
              <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Courses</a>
              <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">About</a>
              <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact</a>
              
              {/* Theme Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ThemeIcon className="w-5 h-5" />
                </button>
                
                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                        className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                        className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </button>
                      <button
                        onClick={() => { setTheme('auto'); setShowThemeMenu(false); }}
                        className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        System
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <div className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative h-full transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="absolute inset-0 flex">
              {slides.map((slide, index) => (
                <div key={index} className="relative w-screen flex-shrink-0">
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center max-w-3xl mx-auto px-4">
                      <h1 className="text-5xl font-bold mb-4 text-white">{slide.title}</h1>
                      <p className="text-xl mb-8 text-white">{slide.description}</p>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EcoFinance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <div className="text-green-600 dark:text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Financial Journey?</h2>
          <p className="text-lg mb-8 text-white">Join thousands of students learning finance and economics the smart way.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;

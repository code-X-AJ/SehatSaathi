import React from 'react';
import { Home, Calendar, Award, User, Heart, Phone, Shield, HelpCircle } from 'lucide-react';

const SehatSaathiFooter = ({ 
  currentScreen = 'home', 
  onNavigate = () => {}, 
  language = 'en',
  showBottomNav = true,
  showInfoFooter = true 
}) => {
  
  const translations = {
    en: {
      home: "Home",
      appointments: "Appointments",
      coins: "Coins", 
      profile: "Profile",
      emergency: "Emergency",
      help: "Help",
      privacy: "Privacy",
      terms: "Terms",
      aboutUs: "About Us",
      version: "Version 1.0.2",
      madeWith: "Made with",
      forRuralHealth: "for rural health",
      copyright: "© 2024 SehatSaathi. All rights reserved."
    },
    hi: {
      home: "होम",
      appointments: "अपॉइंटमेंट",
      coins: "सिक्के",
      profile: "प्रोफ़ाइल", 
      emergency: "आपातकाल",
      help: "मदद",
      privacy: "गोपनीयता",
      terms: "नियम",
      aboutUs: "हमारे बारे में",
      version: "संस्करण 1.0.2",
      madeWith: "बनाया गया",
      forRuralHealth: "ग्रामीण स्वास्थ्य के लिए",
      copyright: "© 2024 सेहत साथी। सभी अधिकार सुरक्षित।"
    }
  };

  const t = translations[language];

  // Bottom Navigation Component
  const BottomNavigation = () => {
    const navItems = [
      { id: 'home', icon: Home, label: t.home },
      { id: 'appointment', icon: Calendar, label: t.appointments },
      { id: 'coins', icon: Award, label: t.coins },
      { id: 'profile', icon: User, label: t.profile }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center py-2 px-1 transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-500' 
                      : 'text-gray-500 hover:text-blue-400 active:scale-95'
                  }`}
                >
                  <div className={`p-1 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : ''}`} />
                  </div>
                  <span className={`text-xs font-medium mt-1 ${
                    isActive ? 'text-blue-500' : 'text-gray-600'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="w-4 h-0.5 bg-blue-500 rounded-full mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Information Footer Component
  const InfoFooter = () => (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200">
      <div className="max-w-md mx-auto px-6 py-6">
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <FooterLink icon={<Phone className="w-4 h-4" />} text={t.emergency} href="tel:108" />
            <FooterLink icon={<HelpCircle className="w-4 h-4" />} text={t.help} onClick={() => onNavigate('help')} />
          </div>
          <div className="space-y-3">
            <FooterLink icon={<Shield className="w-4 h-4" />} text={t.privacy} onClick={() => onNavigate('privacy')} />
            <FooterLink text={t.aboutUs} onClick={() => onNavigate('about')} />
          </div>
        </div>

        {/* Emergency Helpline */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-red-800 text-sm">24/7 Emergency Helpline</p>
              <a href="tel:108" className="text-red-600 font-bold text-lg hover:underline">
                108
              </a>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-sm">{t.madeWith}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span className="text-sm">{t.forRuralHealth}</span>
          </div>
          <p className="text-xs text-gray-500">{t.version}</p>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">{t.copyright}</p>
        </div>
      </div>
    </div>
  );

  // Footer Link Component
  const FooterLink = ({ icon, text, href, onClick }) => (
    <div>
      {href ? (
        <a 
          href={href}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          {icon}
          <span>{text}</span>
        </a>
      ) : (
        <button 
          onClick={onClick}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors text-left"
        >
          {icon}
          <span>{text}</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Bottom Navigation */}
      {showBottomNav && <BottomNavigation />}
      
      {/* Information Footer */}
      {showInfoFooter && <InfoFooter />}
      
      {/* Spacer for fixed bottom navigation */}
      {showBottomNav && <div className="h-20"></div>}
    </>
  );
};

// Demo Usage Component
const FooterDemo = () => {
  const [currentScreen, setCurrentScreen] = React.useState('home');
  const [language, setLanguage] = React.useState('en');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6 text-center">
        <h1 className="text-xl font-bold mb-2">SehatSaathi Dashboard</h1>
        <p className="text-blue-100">Current Screen: {currentScreen}</p>
        <div className="mt-4">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs text-white"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 min-h-96">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Footer Features:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bottom Navigation (4 main tabs)</li>
              <li>• Emergency Helpline (108)</li>
              <li>• Quick Links (Help, Privacy)</li>
              <li>• Multilingual Support</li>
              <li>• Mobile-Optimized Design</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Rural-Friendly Design:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Large touch targets (48px+)</li>
              <li>• Clear visual feedback</li>
              <li>• Emergency access prominence</li>
              <li>• Minimal text, clear icons</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <SehatSaathiFooter 
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        language={language}
        showBottomNav={true}
        showInfoFooter={true}
      />
    </div>
  );
};

export default FooterDemo;
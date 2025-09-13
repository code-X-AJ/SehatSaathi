import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Award,
  Bell,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Gift,
  User,
  Phone,
  Search,
  ShoppingBag,
  Coins,
  QrCode,
  Heart,
  Pill,
  Users,
  CheckCircle,
  XCircle,
  Phone as PhoneIcon,
  Video,
  History,
  Plus,
  Filter,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

// Main Dashboard Component
const SehatSaathiDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [language, setLanguage] = useState("en");

  // States for appointment booking flow
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [consultationType, setConsultationType] = useState("online");

  // Other states
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  // Translations and Patient Data (as provided)
  const translations = {
    en: {
      welcome: "Good Morning",
      patientName: "Ramesh Kumar",
      healthScore: "Health Score",
      bookAppointment: "Book Appointment",
      healthRecords: "Health Records",
      sehatSikka: "Sehat Sikka",
      reminders: "Reminders",
      emergency: "Emergency SOS",
      profile: "My Profile",
      pharmacy: "Pharmacy",
      upcoming: "Upcoming",
      medicines: "Medicine Time",
      nextReward: "Next Reward in 80 coins",
      progress: "Your Progress",
      viewProfile: "View Profile",
      searchMedicine: "Search Medicine",
      nearbyPharmacy: "Nearby Pharmacies",
      dashboard: "Dashboard",
    },
    hi: {
      welcome: "सुप्रभात",
      patientName: "रमेश कुमार",
      healthScore: "स्वास्थ्य स्कोर",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      healthRecords: "स्वास्थ्य रिकॉर्ड",
      sehatSikka: "सेहत सिक्का",
      reminders: "रिमाइंडर",
      emergency: "आपातकालीन SOS",
      profile: "मेरी प्रोफ़ाइल",
      pharmacy: "दवाखाना",
      upcoming: "आगामी",
      medicines: "दवा का समय",
      nextReward: "अगला इनाम 80 सिक्कों में",
      progress: "आपकी प्रगति",
      viewProfile: "प्रोफ़ाइल देखें",
      searchMedicine: "दवा खोजें",
      nearbyPharmacy: "नजदीकी दवाखाने",
      dashboard: "डैशबोर्ड",
    },
  };
  const t = translations[language];
  const patientData = {
    name: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    address: "Village Khanna, Punjab",
    sehatSikka: 340,
    healthScore: 85,
  };

  // --- RESPONSIVE LAYOUT COMPONENTS ---

  const Sidebar = () => {
    const navItems = [
      { id: "home", label: t.dashboard, icon: <LayoutDashboard /> },
      { id: "appointment", label: t.bookAppointment, icon: <Calendar /> },
      { id: "pharmacy", label: t.pharmacy, icon: <ShoppingBag /> },
      { id: "records", label: t.healthRecords, icon: <FileText /> },
      { id: "reminders", label: t.reminders, icon: <Bell /> },
      { id: "coins", label: t.sehatSikka, icon: <Award /> },
      { id: "profile", label: t.profile, icon: <User /> },
    ];

    return (
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">SehatSaathi</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentScreen === item.id
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto absolute bottom-0 w-64">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    );
  };

  const MainLayout = ({ children }) => (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );

  // --- SCREEN COMPONENTS (with responsive classes) ---

  const HomeScreen = () => (
    // On desktop, the main container is centered and wider. On mobile, it takes the full screen.
    <div className="max-w-7xl mx-auto">
      <div className="lg:min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 pt-12 pb-8 lg:rounded-b-3xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">{t.welcome}</p>
              <h1 className="text-2xl font-bold">{t.patientName}</h1>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs text-white"
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t.healthScore}</span>
                <span className="text-2xl font-bold text-green-300">
                  85/100
                </span>
              </div>
            </div>
            <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t.sehatSikka}</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-yellow-300" />
                  <span className="text-xl font-bold text-yellow-300">340</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Actions & Emergency */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <ActionCard
                  icon={<User className="w-8 h-8 text-blue-500" />}
                  title={t.profile}
                  onClick={() => setCurrentScreen("profile")}
                  className="bg-blue-50 border-blue-200"
                />
                <ActionCard
                  icon={<Calendar className="w-8 h-8 text-green-500" />}
                  title={t.bookAppointment}
                  onClick={() => setCurrentScreen("appointment")}
                  className="bg-green-50 border-green-200"
                />
                <ActionCard
                  icon={<ShoppingBag className="w-8 h-8 text-purple-500" />}
                  title={t.pharmacy}
                  onClick={() => setCurrentScreen("pharmacy")}
                  className="bg-purple-50 border-purple-200"
                />
                <ActionCard
                  icon={<Award className="w-8 h-8 text-yellow-500" />}
                  title={t.sehatSikka}
                  subtitle="340 Coins"
                  onClick={() => setCurrentScreen("coins")}
                  className="bg-yellow-50 border-yellow-200"
                />
                <ActionCard
                  icon={<FileText className="w-8 h-8 text-indigo-500" />}
                  title={t.healthRecords}
                  onClick={() => setCurrentScreen("records")}
                  className="bg-indigo-50 border-indigo-200"
                />
                <ActionCard
                  icon={<Bell className="w-8 h-8 text-pink-500" />}
                  title={t.reminders}
                  subtitle="3 Active"
                  onClick={() => setCurrentScreen("reminders")}
                  className="bg-pink-50 border-pink-200"
                />
              </div>
              <button
                onClick={() => setShowSOSConfirm(true)}
                className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-red-600 transition-colors"
              >
                <AlertTriangle className="w-6 h-6" /> {t.emergency}
              </button>
            </div>
            {/* Right Column: Upcoming */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full">
                <h2 className="text-lg font-semibold mb-4">{t.upcoming}</h2>
                <div className="space-y-3">
                  <ReminderCard
                    title="Dr. Sharma - General Checkup"
                    time="Today 5:00 PM"
                    type="appointment"
                    icon={<Calendar className="w-5 h-5 text-blue-500" />}
                  />
                  <ReminderCard
                    title="Blood pressure medicine"
                    time="8:00 AM & 8:00 PM"
                    type="medicine"
                    icon={<Pill className="w-5 h-5 text-green-500" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSOSConfirm && (
          <SOSModal onClose={() => setShowSOSConfirm(false)} />
        )}
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-white">
      <Header title="My Profile" onBack={() => setCurrentScreen("home")} />
      {/* On desktop, this is a 2-column layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {" "}
                <User className="w-8 h-8" />
              </div>
              <div>
                {" "}
                <h2 className="text-2xl font-bold">{patientData.name}</h2>{" "}
                <p className="text-blue-100">Patient ID: #RK2024</p>{" "}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
              {" "}
              <QrCode className="w-16 h-16 text-gray-400" />{" "}
            </div>
            <h3 className="font-semibold mb-2">Profile QR Code</h3>
            <p className="text-sm text-gray-600">
              Show this to providers for instant profile access
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-2xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileDetailCard
                icon="👤"
                label="Full Name"
                value={patientData.name}
              />
              <ProfileDetailCard
                icon="📅"
                label="Age"
                value={`${patientData.age} years`}
              />
              <ProfileDetailCard
                icon="⚥"
                label="Gender"
                value={patientData.gender}
              />
              <ProfileDetailCard
                icon="🩸"
                label="Blood Group"
                value={patientData.bloodGroup}
              />
              <ProfileDetailCard
                icon="📱"
                label="Phone"
                value={patientData.phone}
              />
              <ProfileDetailCard
                icon="📍"
                label="Address"
                value={patientData.address}
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold mt-6">
              {" "}
              Edit Profile{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentScreen = () => (
    <div className="min-h-screen bg-white">
      <Header
        title="Book Appointment"
        onBack={() => setCurrentScreen("home")}
      />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Type and Doctor Selection */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Consultation Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setConsultationType("online")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${
                    consultationType === "online"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Video className="w-8 h-8" />{" "}
                  <span className="font-medium">Online</span>{" "}
                  <span className="text-xs">Video Call</span>
                </button>
                <button
                  onClick={() => setConsultationType("offline")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${
                    consultationType === "offline"
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Users className="w-8 h-8" />{" "}
                  <span className="font-medium">In-Person</span>{" "}
                  <span className="text-xs">Clinic Visit</span>
                </button>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Select Doctor</h3>
              <div className="space-y-3">
                <DoctorCard
                  name="Dr. Priya Sharma"
                  specialty="General Physician"
                  rating="4.8"
                  experience="12 years"
                  availability={
                    consultationType === "online"
                      ? "Available now"
                      : "Next slot: 2 PM"
                  }
                  isSelected={selectedDoctor === "sharma"}
                  onClick={() => setSelectedDoctor("sharma")}
                  consultationType={consultationType}
                />
                <DoctorCard
                  name="Dr. Rajesh Kumar"
                  specialty="Cardiologist"
                  rating="4.9"
                  experience="15 years"
                  availability={
                    consultationType === "online"
                      ? "Available at 3 PM"
                      : "Next slot: Tomorrow"
                  }
                  isSelected={selectedDoctor === "kumar"}
                  onClick={() => setSelectedDoctor("kumar")}
                  consultationType={consultationType}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Date, Time and Booking */}
          <div>
            {(consultationType === "online" || selectedDoctor) && (
              <div className="bg-gray-50 p-6 rounded-2xl border">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["Today", "Tomorrow", "Sep 15"].map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`py-3 px-4 rounded-xl border ${
                          selectedDate === date
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Select Time</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["10:00 AM", "2:00 PM", "5:00 PM", "6:00 PM"].map(
                      (time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-xl border ${
                            selectedTime === time
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentScreen("confirmation")}
                  disabled={!selectedDoctor || !selectedDate || !selectedTime}
                  className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {" "}
                  Book Appointment{" "}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
            <button
              onClick={() => setCurrentScreen("appointment-history")}
              className="text-blue-500 text-sm font-medium"
            >
              {" "}
              View All{" "}
            </button>
          </div>
          <div className="space-y-3">
            <AppointmentHistoryCard
              doctor="Dr. Priya Sharma"
              date="Sep 10, 2025"
              time="5:00 PM"
              status="completed"
              type="offline"
            />
            <AppointmentHistoryCard
              doctor="Dr. Rajesh Kumar"
              date="Sep 5, 2025"
              time="3:00 PM"
              status="completed"
              type="online"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const PharmacyScreen = () => (
    <div className="min-h-screen bg-white">
      <Header title="Pharmacy" onBack={() => setCurrentScreen("home")} />
      <div className="p-6">
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Categories</h3>
          {/* Responsive grid for categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CategoryCard
              icon="💊"
              title="Common Medicines"
              count="50+ available"
            />
            <CategoryCard icon="🩹" title="First Aid" count="20+ items" />
            <CategoryCard icon="🌿" title="Ayurvedic" count="30+ products" />
            <CategoryCard icon="💉" title="Prescription" count="Upload Rx" />
          </div>
        </div>

        {/* Using a two-column layout for pharmacies and search results on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Nearby Partner Pharmacies
            </h3>
            <div className="space-y-3">
              <PharmacyCard
                name="Sharma Medical Store"
                distance="0.5 km away"
                rating="4.5"
                availability="Open • Closes at 10 PM"
                discount="10% off with Sehat Sikka"
                isSelected={selectedPharmacy === "sharma"}
                onClick={() => setSelectedPharmacy("sharma")}
              />
              <PharmacyCard
                name="Punjab Health Pharmacy"
                distance="1.2 km away"
                rating="4.3"
                availability="Open • 24/7"
                discount="15% off with Sehat Sikka"
                isSelected={selectedPharmacy === "punjab"}
                onClick={() => setSelectedPharmacy("punjab")}
              />
              <PharmacyCard
                name="Apollo Pharmacy"
                distance="2.0 km away"
                rating="4.7"
                availability="Open • Closes at 11 PM"
                discount="20% off with Sehat Sikka"
                isSelected={selectedPharmacy === "apollo"}
                onClick={() => setSelectedPharmacy("apollo")}
              />
            </div>
          </div>

          {searchQuery && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Search Results</h3>
              <div className="space-y-3">
                <MedicineCard
                  name="Paracetamol 500mg"
                  manufacturer="Cipla"
                  price="₹45"
                  availability="Available at 3 nearby stores"
                  discount="Save ₹5 with Sehat Sikka"
                />
                <MedicineCard
                  name="Crocin Advance"
                  manufacturer="GSK"
                  price="₹32"
                  availability="Available at 2 nearby stores"
                  discount="Save ₹3 with Sehat Sikka"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Other screens like Coins, Confirmation, Records, Reminders follow a similar pattern
  // For brevity, only key responsive changes are highlighted in the above components.
  // The rest of the components and screens are included below without modification as they adapt well.

  // --- UNMODIFIED SCREENS & HELPER COMPONENTS ---

  const CoinsScreen = () => (
    <div className="min-h-screen bg-white">
      <Header title="Sehat Sikka" onBack={() => setCurrentScreen("home")} />
      <div className="p-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 text-white mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {" "}
            <Coins className="w-8 h-8" />{" "}
            <h2 className="text-3xl font-bold">340</h2>{" "}
          </div>
          <p className="text-yellow-100">Total Sehat Sikka</p>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            {" "}
            <span className="font-semibold text-purple-800">
              Next Milestone
            </span>{" "}
            <Gift className="w-6 h-6 text-purple-600" />{" "}
          </div>
          <div className="w-full bg-white/50 rounded-full h-4 mb-2">
            {" "}
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full"
              style={{ width: "68%" }}
            ></div>{" "}
          </div>
          <div className="flex justify-between text-sm">
            {" "}
            <span className="text-purple-700">340/500 coins</span>{" "}
            <span className="text-purple-700">Free Health Checkup</span>{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Redeem Your Coins</h3>
            <div className="space-y-3">
              <RedemptionCard
                title="10% Off at Partner Pharmacies"
                coins="50 coins"
                description="Valid for 30 days"
                icon="💊"
              />
              <RedemptionCard
                title="Free Basic Health Checkup"
                coins="200 coins"
                description="Blood pressure, weight, temperature"
                icon="🏥"
              />
              <RedemptionCard
                title="20% Off Lab Tests"
                coins="100 coins"
                description="Valid at partner diagnostic centers"
                icon="🔬"
              />
              <RedemptionCard
                title="Free Consultation"
                coins="300 coins"
                description="30-minute online consultation"
                icon="👨‍⚕️"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <EarningCard
                title="Completed appointment with Dr. Sharma"
                coins="+30 coins"
                date="2 days ago"
                icon="✅"
              />
              <EarningCard
                title="Took medicines on time for 7 days"
                coins="+20 coins"
                date="1 week ago"
                icon="💊"
              />
              <EarningCard
                title="Health checkup completed"
                coins="+50 coins"
                date="2 weeks ago"
                icon="🏥"
              />
              <EarningCard
                title="Referred a friend to SehatSaathi"
                coins="+100 coins"
                date="3 weeks ago"
                icon="👥"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ConfirmationScreen = () => (
    <div className="min-h-screen bg-white">
      <Header
        title="Appointment Confirmed"
        onBack={() => setCurrentScreen("home")}
      />
      <div className="p-6 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
        <p className="text-gray-600 mb-8">
          Your {consultationType} consultation has been confirmed
        </p>
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-left">
          <div className="space-y-4">
            <div className="flex justify-between">
              {" "}
              <span className="text-gray-600">Doctor:</span>{" "}
              <span className="font-semibold">Dr. Priya Sharma</span>{" "}
            </div>
            <div className="flex justify-between">
              {" "}
              <span className="text-gray-600">Type:</span>{" "}
              <span className="font-semibold capitalize flex items-center gap-2">
                {" "}
                {consultationType === "online" ? (
                  <Video className="w-4 h-4" />
                ) : (
                  <Users className="w-4 h-4" />
                )}{" "}
                {consultationType}{" "}
              </span>{" "}
            </div>
            <div className="flex justify-between">
              {" "}
              <span className="text-gray-600">Date:</span>{" "}
              <span className="font-semibold">{selectedDate}</span>{" "}
            </div>
            <div className="flex justify-between">
              {" "}
              <span className="text-gray-600">Time:</span>{" "}
              <span className="font-semibold">{selectedTime}</span>{" "}
            </div>
            <div className="flex justify-between">
              {" "}
              <span className="text-gray-600">Appointment ID:</span>{" "}
              <span className="font-semibold">#APT2024001</span>{" "}
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-yellow-600" />
            <div className="text-left">
              <p className="font-semibold text-yellow-800">
                Earn 30 Sehat Sikka!
              </p>
              <p className="text-sm text-yellow-700">
                Complete this appointment to earn coins
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setCurrentScreen("home")}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold mb-4"
        >
          {" "}
          Back to Home{" "}
        </button>
        <button className="w-full border-2 border-blue-500 text-blue-500 py-4 rounded-2xl font-semibold">
          {" "}
          Add to Calendar{" "}
        </button>
      </div>
    </div>
  );

  const RecordsScreen = () => (
    <div className="min-h-screen bg-white">
      <Header title="Health Records" onBack={() => setCurrentScreen("home")} />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-blue-300">
                {" "}
                <QrCode className="w-16 h-16 text-blue-400" />{" "}
              </div>
              <h3 className="font-semibold mb-2">Medical Records QR</h3>
              <p className="text-sm text-gray-600">
                Show this QR for instant access to your medical history
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon="🏥" label="Visits" value="12" />
              <StatCard icon="💉" label="Tests" value="8" />
              <StatCard icon="💊" label="Prescriptions" value="15" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Recent Records</h3>
            <div className="space-y-3">
              <RecordCard
                title="Blood Pressure Check"
                date="Sep 10, 2025"
                doctor="Dr. Priya Sharma"
                result="Normal (120/80)"
                type="checkup"
              />
              <RecordCard
                title="Blood Sugar Test"
                date="Sep 5, 2025"
                doctor="Dr. Rajesh Kumar"
                result="95 mg/dL - Normal"
                type="test"
              />
              <RecordCard
                title="General Checkup"
                date="Aug 28, 2025"
                doctor="Dr. Priya Sharma"
                result="All parameters normal"
                type="checkup"
              />
              <RecordCard
                title="ECG Report"
                date="Aug 20, 2025"
                doctor="Dr. Rajesh Kumar"
                result="Normal sinus rhythm"
                type="test"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RemindersScreen = () => (
    <div className="min-h-screen bg-white">
      <Header title="Reminders" onBack={() => setCurrentScreen("home")} />
      <div className="p-6">
        <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 mb-6">
          <Plus className="w-5 h-5" /> Add New Reminder
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Active Reminders</h3>
            <div className="space-y-3">
              <ReminderDetailCard
                title="Blood Pressure Medicine"
                time="8:00 AM & 8:00 PM"
                frequency="Daily"
                icon={<Pill className="w-6 h-6 text-blue-500" />}
                status="active"
              />
              <ReminderDetailCard
                title="Diabetes Medicine"
                time="Before meals (3 times)"
                frequency="Daily"
                icon={<Pill className="w-6 h-6 text-green-500" />}
                status="active"
              />
              <ReminderDetailCard
                title="Dr. Sharma Appointment"
                time="Today at 5:00 PM"
                frequency="One-time"
                icon={<Calendar className="w-6 h-6 text-purple-500" />}
                status="active"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              <NotificationCard
                title="Medicine reminder"
                message="Time to take your blood pressure medicine"
                time="2 hours ago"
                type="medicine"
                status="missed"
              />
              <NotificationCard
                title="Appointment confirmed"
                message="Your appointment with Dr. Sharma is confirmed"
                time="1 day ago"
                type="appointment"
                status="read"
              />
              <NotificationCard
                title="Health tip"
                message="Drink at least 8 glasses of water daily"
                time="2 days ago"
                type="tip"
                status="read"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper Components
  const ActionCard = ({ icon, title, subtitle, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg active:scale-95 ${className}`}
    >
      {" "}
      <div className="mb-3">{icon}</div>{" "}
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>{" "}
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}{" "}
    </button>
  );
  const ReminderCard = ({ title, time, icon }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-medium text-gray-800">{title}</h4>{" "}
          <p className="text-sm text-gray-600">{time}</p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
  const ProfileDetailCard = ({ icon, label, value }) => (
    <div className="bg-white border rounded-2xl p-4 flex items-center gap-4">
      {" "}
      <span className="text-2xl">{icon}</span>{" "}
      <div className="flex-1">
        {" "}
        <p className="text-sm text-gray-600">{label}</p>{" "}
        <p className="font-semibold">{value}</p>{" "}
      </div>{" "}
    </div>
  );
  const DoctorCard = ({
    name,
    specialty,
    rating,
    experience,
    availability,
    consultationType,
    isSelected,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      {" "}
      <div className="flex items-center gap-4">
        {" "}
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {name.split(" ")[1]?.[0] || "D"}
          </span>
        </div>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-semibold">{name}</h4>{" "}
          <p className="text-sm text-gray-600">{specialty}</p>{" "}
          <div className="flex items-center gap-4 mt-1">
            {" "}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />{" "}
              <span className="text-sm">{rating}</span>
            </div>{" "}
            <span className="text-sm text-gray-500">{experience}</span>{" "}
          </div>{" "}
          <div className="flex items-center gap-2 mt-2">
            {" "}
            {consultationType === "online" ? (
              <Video className="w-4 h-4 text-green-500" />
            ) : (
              <MapPin className="w-4 h-4 text-blue-500" />
            )}{" "}
            <span className="text-sm text-green-600">{availability}</span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </button>
  );
  const AppointmentHistoryCard = ({ doctor, date, time, status, type }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex items-center justify-between mb-2">
        {" "}
        <h4 className="font-semibold">{doctor}</h4>{" "}
        <div className="flex items-center gap-2">
          {" "}
          {type === "online" ? (
            <Video className="w-4 h-4 text-blue-500" />
          ) : (
            <Users className="w-4 h-4 text-green-500" />
          )}{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <p className="text-sm text-gray-600">
        {date} at {time}
      </p>{" "}
    </div>
  );
  const CategoryCard = ({ icon, title, count }) => (
    <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-200 hover:shadow-md transition-shadow">
      {" "}
      <div className="text-3xl mb-2">{icon}</div>{" "}
      <h4 className="font-semibold text-sm mb-1">{title}</h4>{" "}
      <p className="text-xs text-gray-600">{count}</p>{" "}
    </div>
  );
  const PharmacyCard = ({
    name,
    distance,
    rating,
    availability,
    discount,
    isSelected,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
        isSelected
          ? "border-purple-500 bg-purple-50"
          : "border-gray-200 bg-white"
      }`}
    >
      {" "}
      <div className="flex items-start justify-between mb-2">
        {" "}
        <h4 className="font-semibold">{name}</h4>{" "}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />{" "}
          <span className="text-sm">{rating}</span>
        </div>{" "}
      </div>{" "}
      <div className="space-y-1">
        {" "}
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {distance}
        </p>{" "}
        <p className="text-sm text-green-600">{availability}</p>{" "}
        <p className="text-sm text-purple-600 font-medium">{discount}</p>{" "}
      </div>{" "}
    </button>
  );
  const MedicineCard = ({
    name,
    manufacturer,
    price,
    availability,
    discount,
  }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex items-start justify-between mb-2">
        {" "}
        <div>
          {" "}
          <h4 className="font-semibold">{name}</h4>{" "}
          <p className="text-sm text-gray-600">{manufacturer}</p>{" "}
        </div>{" "}
        <span className="text-lg font-bold text-green-600">{price}</span>{" "}
      </div>{" "}
      <p className="text-sm text-gray-600 mb-1">{availability}</p>{" "}
      <p className="text-sm text-purple-600 font-medium">{discount}</p>{" "}
    </div>
  );
  const RedemptionCard = ({ title, coins, description, icon }) => (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex items-center gap-4">
        {" "}
        <span className="text-3xl">{icon}</span>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-semibold mb-1">{title}</h4>{" "}
          <p className="text-sm text-gray-600 mb-2">{description}</p>{" "}
          <div className="flex items-center justify-between">
            {" "}
            <span className="text-yellow-600 font-bold">{coins}</span>{" "}
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              Redeem
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
  const EarningCard = ({ title, coins, date, icon }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        <span className="text-2xl">{icon}</span>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-medium">{title}</h4>{" "}
          <p className="text-sm text-gray-600">{date}</p>{" "}
        </div>{" "}
        <span className="text-green-600 font-semibold">{coins}</span>{" "}
      </div>{" "}
    </div>
  );
  const StatCard = ({ icon, label, value }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
      {" "}
      <div className="text-2xl mb-2">{icon}</div>{" "}
      <p className="text-2xl font-bold text-blue-600">{value}</p>{" "}
      <p className="text-sm text-gray-600">{label}</p>{" "}
    </div>
  );
  const RecordCard = ({ title, date, doctor, result, type }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex justify-between items-start mb-2">
        {" "}
        <h4 className="font-semibold">{title}</h4>{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            type === "test"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {type}
        </span>{" "}
      </div>{" "}
      <p className="text-sm text-gray-600 mb-1">by {doctor}</p>{" "}
      <p className="text-sm text-gray-500 mb-2">{date}</p>{" "}
      <p className="text-sm font-medium text-green-600">{result}</p>{" "}
    </div>
  );
  const ReminderDetailCard = ({ title, time, frequency, icon, status }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      {" "}
      <div className="flex items-center gap-4">
        {" "}
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-semibold">{title}</h4>{" "}
          <p className="text-sm text-gray-600">{time}</p>{" "}
          <p className="text-xs text-gray-500">{frequency}</p>{" "}
        </div>{" "}
        <div className="text-right">
          {" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
  const NotificationCard = ({ title, message, time, type, status }) => (
    <div
      className={`bg-white rounded-2xl p-4 border ${
        status === "missed" ? "border-red-200 bg-red-50" : "border-gray-200"
      }`}
    >
      {" "}
      <div className="flex items-start gap-3">
        {" "}
        <div
          className={`p-2 rounded-full ${
            type === "medicine"
              ? "bg-blue-100"
              : type === "appointment"
              ? "bg-green-100"
              : "bg-yellow-100"
          }`}
        >
          {" "}
          {type === "medicine" && (
            <Pill className="w-4 h-4 text-blue-600" />
          )}{" "}
          {type === "appointment" && (
            <Calendar className="w-4 h-4 text-green-600" />
          )}{" "}
          {type === "tip" && <Heart className="w-4 h-4 text-yellow-600" />}{" "}
        </div>{" "}
        <div className="flex-1">
          {" "}
          <h4 className="font-semibold text-sm">{title}</h4>{" "}
          <p className="text-sm text-gray-600 mb-1">{message}</p>{" "}
          <p className="text-xs text-gray-500">{time}</p>{" "}
        </div>{" "}
        {status === "missed" && <XCircle className="w-5 h-5 text-red-500" />}{" "}
      </div>{" "}
    </div>
  );
  const Header = ({ title, onBack }) => (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 pt-12 pb-6 lg:bg-none lg:text-gray-800 lg:pt-8 lg:pb-4 lg:px-6">
      {" "}
      <div className="flex items-center gap-4">
        {" "}
        {/* Back button is only for mobile */}{" "}
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors lg:hidden"
        >
          {" "}
          <ArrowLeft className="w-6 h-6" />{" "}
        </button>{" "}
        <h1 className="text-xl lg:text-3xl font-bold">{title}</h1>{" "}
      </div>{" "}
    </div>
  );
  const SOSModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      {" "}
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        {" "}
        <div className="text-center">
          {" "}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>{" "}
          <h3 className="text-lg font-bold mb-2">Emergency Alert</h3>{" "}
          <p className="text-gray-600 mb-6">
            This will immediately contact emergency services and your emergency
            contacts. Are you sure?
          </p>{" "}
          <div className="space-y-3">
            {" "}
            <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">
              Yes, Send Alert
            </button>{" "}
            <button
              onClick={onClose}
              className="w-full border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "profile":
        return <ProfileScreen />;
      case "appointment":
        return <AppointmentScreen />;
      case "confirmation":
        return <ConfirmationScreen />;
      case "pharmacy":
        return <PharmacyScreen />;
      case "coins":
        return <CoinsScreen />;
      case "records":
        return <RecordsScreen />;
      case "reminders":
        return <RemindersScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Final Render
  return (
    // For mobile, we use a simple div. For desktop, we wrap content in the MainLayout.
    <>
      {/* Mobile View */}
      <div className="lg:hidden max-w-md mx-auto bg-white shadow-xl min-h-screen">
        {renderScreen()}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <MainLayout>{renderScreen()}</MainLayout>
      </div>
    </>
  );
};

export default SehatSaathiDashboard;

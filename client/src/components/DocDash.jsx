import React, { useState, useEffect } from 'react';
import {
  Home, Calendar, Users, User, Bell, Phone, Video,
  Clock, MapPin, Pill, FileText, Settings, Menu,
  ChevronLeft, ChevronRight, Plus, Search, Filter,
  CheckCircle, AlertCircle, Circle, Stethoscope,
  Heart, Activity, Star, Shield, LogOut
} from 'lucide-react';

const DocDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [doctorStatus, setDoctorStatus] = useState('available');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterType, setFilterType] = useState('today');
  const [appointmentFilter, setAppointmentFilter] = useState('all');

  // Sample data (unchanged)
  const doctorInfo = {
    name: "Dr. Rajesh Kumar",
    specialization: "General Medicine",
    experience: "12 years",
    qualification: "MBBS, MD",
    registration: "PUN/MED/2011/12345",
    languages: ["Hindi", "Punjabi", "English"],
    hospital: "Nabha Civil Hospital"
  };

  const todayStats = {
    totalPatients: 24,
    completed: 18,
    pending: 6,
    online: 12,
    offline: 12
  };

  const appointments = [
    {
      id: 1,
      patientName: "Harpreet Singh",
      age: 45,
      time: "09:30 AM",
      type: "online",
      status: "scheduled",
      condition: "Diabetes Follow-up",
      priority: "normal"
    },
    {
      id: 2,
      patientName: "Manjeet Kaur",
      age: 32,
      time: "10:00 AM",
      type: "in-person",
      status: "waiting",
      condition: "Fever & Cough",
      priority: "urgent"
    },
    {
      id: 3,
      patientName: "Baldev Singh",
      age: 58,
      time: "10:30 AM",
      type: "online",
      status: "completed",
      condition: "Blood Pressure",
      priority: "normal"
    },
    {
      id: 4,
      patientName: "Gurpreet Kaur",
      age: 28,
      time: "11:00 AM",
      type: "in-person",
      status: "scheduled",
      condition: "Pregnancy Checkup",
      priority: "normal"
    }
  ];

  const timeSlots = {
    morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
    evening: ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"]
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const slideIn = "transform transition-all duration-300 ease-in-out";
  const statusColors = {
    available: "bg-green-500",
    busy: "bg-red-500",
    offline: "bg-gray-400"
  };

  const priorityColors = {
    urgent: "border-l-4 border-red-500 bg-red-50",
    normal: "border-l-4 border-blue-500 bg-blue-50"
  };

  // Home Screen Component
  const HomeScreen = () => (
    <div className={`${slideIn} p-4 lg:p-6 space-y-6`}>
      {/* --- Responsive Change: Added grid layout for desktop --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Doctor Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{doctorInfo.name}</h2>
                  <p className="text-blue-100">{doctorInfo.specialization}</p>
                  <div className="flex items-center mt-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[doctorStatus]} mr-2`}></div>
                    <span className="text-sm capitalize">{doctorStatus}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDoctorStatus(doctorStatus === 'available' ? 'busy' : 'available')}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
              >
                Toggle Status
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-4 shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Patients</p>
                <p className="text-2xl font-bold text-blue-600">{todayStats.totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{todayStats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Today's Appointments Preview */}
          <div className="bg-white rounded-xl shadow-md border h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Next Appointments</h3>
              <button
                onClick={() => setActiveScreen('appointments')}
                className="text-blue-600 text-sm hover:underline"
              >
                View All
              </button>
            </div>
            <div className="p-4 space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div key={apt.id} className={`p-3 rounded-lg ${priorityColors[apt.priority]} flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{apt.patientName}</span>
                      <span className="text-sm text-gray-600">{apt.time} • {apt.condition}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {apt.type === 'online' ?
                      <Video className="w-5 h-5 text-green-600" /> :
                      <MapPin className="w-5 h-5 text-blue-600" />
                    }
                    <span className={`w-3 h-3 rounded-full ${apt.status === 'completed' ? 'bg-green-500' : apt.status === 'waiting' ? 'bg-orange-500' : 'bg-gray-400'}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          {/* Quick Actions */}
          <button
            onClick={() => setActiveScreen('appointments')}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            <span>Appointments</span>
          </button>
          <button
            onClick={() => setActiveScreen('prescriptions')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
          >
            <Pill className="w-6 h-6" />
            <span>Prescriptions</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Screen Component
  const ProfileScreen = () => (
    <div className={`${slideIn} p-4 lg:p-6 space-y-6`}>
      {/* --- Responsive Change: Added grid layout for desktop --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{doctorInfo.name}</h2>
            <p className="text-gray-600">{doctorInfo.qualification}</p>
            <p className="text-blue-600 font-medium">{doctorInfo.specialization}</p>

            <div className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg mt-6">
              <span className="font-medium">Availability</span>
              <button
                onClick={() => setDoctorStatus(doctorStatus === 'available' ? 'busy' : 'available')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${doctorStatus === 'available' ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${doctorStatus === 'available' ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Professional Info & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Professional Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration:</span>
                <span className="font-medium">{doctorInfo.registration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{doctorInfo.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospital:</span>
                <span className="font-medium">{doctorInfo.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Languages:</span>
                <span className="font-medium">{doctorInfo.languages.join(", ")}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Today's Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{todayStats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{todayStats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Schedule Screen Component
  const ScheduleScreen = () => {
    const getWeekDates = (weekOffset = 0) => {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (weekOffset * 7)));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
      });
    };

    const weekDates = getWeekDates(selectedWeek);
    const isSlotBooked = (day, time) => Math.random() > 0.6;

    return (
      <div className={`${slideIn} p-4 lg:p-6 space-y-6`}>
        {/* Week Navigation */}
        <div className="bg-white rounded-xl shadow-md border p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedWeek(selectedWeek - 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="font-semibold">
                {weekDates[0].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - {' '}
                {weekDates[6].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </h3>
            </div>
            <button
              onClick={() => setSelectedWeek(selectedWeek + 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {weekDates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`p-2 md:p-3 rounded-lg text-center transition-all ${selectedDay === index ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="text-xs text-gray-500">{weekDays[index]}</div>
                <div className="font-medium text-sm md:text-base">{date.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* --- Responsive Change: Time slots now in a single card on desktop --- */}
        <div className="bg-white rounded-xl shadow-md border p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-orange-500" />
                Morning (9:00 AM - 12:00 PM)
              </h4>
              {/* --- Responsive Change: Wider grid for time slots --- */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2">
                {timeSlots.morning.map((time) => {
                  const booked = isSlotBooked(selectedDay, time);
                  return (
                    <button
                      key={time}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${booked ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-50 hover:bg-blue-50 text-gray-600 border'}`}
                    >
                      {time}
                      {booked && <CheckCircle className="w-4 h-4 inline ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                Evening (2:00 PM - 5:00 PM)
              </h4>
              {/* --- Responsive Change: Wider grid for time slots --- */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2">
                {timeSlots.evening.map((time) => {
                  const booked = isSlotBooked(selectedDay, time);
                  return (
                    <button
                      key={time}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${booked ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-50 hover:bg-blue-50 text-gray-600 border'}`}
                    >
                      {time}
                      {booked && <CheckCircle className="w-4 h-4 inline ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-all">
            <Plus className="w-5 h-5" />
            <span>Block Time</span>
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-all">
            <AlertCircle className="w-5 h-5" />
            <span>Emergency Slot</span>
          </button>
        </div>
      </div>
    );
  };

  // Appointments Screen Component
  const AppointmentsScreen = () => {
    const filteredAppointments = appointments.filter(apt => {
      if (filterType === 'today') return true;
      if (filterType === 'upcoming') return apt.status === 'scheduled';
      if (filterType === 'past') return apt.status === 'completed';
      return true;
    }).filter(apt => {
      if (appointmentFilter === 'all') return true;
      if (appointmentFilter === 'online') return apt.type === 'online';
      if (appointmentFilter === 'offline') return apt.type === 'in-person';
      if (appointmentFilter === 'pending') return apt.status === 'waiting';
      return true;
    });

    return (
      <div className={`${slideIn} p-4 lg:p-6 space-y-6`}>
        <div className="bg-white rounded-xl shadow-md border p-4">
          {/* --- Responsive Change: Filters are now on a single line on desktop --- */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex space-x-2">
              {['today', 'upcoming', 'past'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${filterType === filter ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All', icon: Users },
                { key: 'online', label: 'Online', icon: Video },
                { key: 'offline', label: 'In-person', icon: MapPin },
                { key: 'pending', label: 'Waiting', icon: Clock }
              ].map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setAppointmentFilter(filter.key)}
                    className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1 ${appointmentFilter === filter.key ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className={`bg-white rounded-xl shadow-md border p-4 ${priorityColors[apt.priority]} hover:shadow-lg transition-all`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{apt.patientName}</h4>
                    <p className="text-sm text-gray-600">Age: {apt.age} • {apt.condition}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{apt.time}</span>
                      {apt.type === 'online' ?
                        <Video className="w-4 h-4 text-green-600" /> :
                        <MapPin className="w-4 h-4 text-blue-600" />
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {apt.status === 'scheduled' && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                      {apt.type === 'online' ? 'Start Call' : 'Check In'}
                    </button>
                  )}
                  {apt.status === 'waiting' && (
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                      Patient Waiting
                    </button>
                  )}
                  {apt.status === 'completed' && (
                    <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Prescriptions Screen Component
  const PrescriptionsScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
    const [instructions, setInstructions] = useState('');
    const [nextVisit, setNextVisit] = useState('');

    const addMedicine = () => {
      setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
    };

    const updateMedicine = (index, field, value) => {
      const updated = medicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      );
      setMedicines(updated);
    };

    return (
      <div className={`${slideIn} p-4 lg:p-6 space-y-6`}>
        {/* --- Responsive Change: Added two-column layout for desktop --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-purple-600" />
                New Prescription
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Enter diagnosis..."
                />
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Medicines</label>
                  <button
                    onClick={addMedicine}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {medicines.map((medicine, index) => (
                    // --- Responsive Change: Grid for medicine inputs ---
                    <div key={index} className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                      <input type="text" placeholder="Medicine name" value={medicine.name} onChange={(e) => updateMedicine(index, 'name', e.target.value)} className="lg:col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      <input type="text" placeholder="Dosage" value={medicine.dosage} onChange={(e) => updateMedicine(index, 'dosage', e.target.value)} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      <input type="text" placeholder="Frequency" value={medicine.frequency} onChange={(e) => updateMedicine(index, 'frequency', e.target.value)} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      <input type="text" placeholder="Duration" value={medicine.duration} onChange={(e) => updateMedicine(index, 'duration', e.target.value)} className="col-span-2 lg:col-span-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="2" placeholder="Additional instructions..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Visit</label>
                <input type="date" value={nextVisit} onChange={(e) => setNextVisit(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg">Save Draft</button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">Save & Send</button>
            </div>
          </div>

          {/* Right Column: Patient Info & Recent Prescriptions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md border p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search patient..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            {selectedPatient && (
              <div className="bg-white rounded-xl shadow-md border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedPatient.patientName}</h4>
                      <p className="text-sm text-gray-600">Age: {selectedPatient.age}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded-lg"><p className="text-blue-600 font-medium">BP</p><p>140/90</p></div>
                  <div className="bg-green-50 p-2 rounded-lg"><p className="text-green-600 font-medium">Sugar</p><p>180</p></div>
                </div>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-md border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" /> Recent
              </h3>
              <div className="space-y-3">
                {[
                  { patient: "Harpreet Singh", date: "Mar 15", condition: "Diabetes" },
                  { patient: "Manjeet Kaur", date: "Mar 14", condition: "Fever" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{p.patient}</p>
                      <p className="text-sm text-gray-600">{p.condition}</p>
                    </div>
                    <p className="text-sm text-gray-600">{p.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component (for Desktop)
  const Sidebar = () => {
    const navItems = [
      { key: 'home', icon: Home, label: 'Home' },
      { key: 'schedule', icon: Calendar, label: 'Schedule' },
      { key: 'appointments', icon: Users, label: 'Patients' },
      { key: 'prescriptions', icon: Pill, label: 'Prescriptions' },
      { key: 'profile', icon: User, label: 'Profile' }
    ];

    return (
      <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 flex-col justify-between hidden lg:flex">
        <div>
          <div className="flex items-center space-x-3 mb-10 px-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-lg">SehatSaathi</h1>
              <p className="text-xs text-gray-500">Rural Healthcare</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveScreen(item.key)}
                  className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div>
          <button className="w-full flex items-center space-x-3 py-3 px-4 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    );
  };

  // Bottom Navigation Component (for Mobile)
  const BottomNavigation = () => {
    const navItems = [
      { key: 'home', icon: Home, label: 'Home' },
      { key: 'schedule', icon: Calendar, label: 'Schedule' },
      { key: 'appointments', icon: Users, label: 'Patients' },
      { key: 'profile', icon: User, label: 'Profile' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 lg:hidden z-30">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveScreen(item.key)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all ${isActive ? 'text-blue-600 bg-blue-50 transform scale-110' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Header Component
  const Header = () => {
    const getScreenTitle = () => {
      switch (activeScreen) {
        case 'home': return 'Dashboard';
        case 'profile': return 'Doctor Profile';
        case 'schedule': return 'My Schedule';
        case 'appointments': return 'Patient Appointments';
        case 'prescriptions': return 'Prescriptions';
        default: return 'SehatSaathi';
      }
    };

    return (
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4 z-20 lg:left-64">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-gray-800 text-xl">{getScreenTitle()}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border">
              <div className={`w-2 h-2 rounded-full ${statusColors[doctorStatus]} animate-pulse`}></div>
              <span className="text-xs text-gray-600 capitalize">{doctorStatus}</span>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen />;
      case 'profile': return <ProfileScreen />;
      case 'schedule': return <ScheduleScreen />;
      case 'appointments': return <AppointmentsScreen />;
      case 'prescriptions': return <PrescriptionsScreen />;
      default: return <HomeScreen />;
    }
  };

  useEffect(() => {
    if (activeScreen === 'prescriptions' && !selectedPatient) {
      setSelectedPatient(appointments[0]);
    }
  }, [activeScreen, selectedPatient]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        {/* --- Responsive Change: Padding adjusted for header and nav --- */}
        <main className="pt-20 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            {renderScreen()}
          </div>
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default DocDashboard;
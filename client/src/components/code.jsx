import React, { useState, useEffect } from 'react';
import { User, Package, QrCode, Search, Plus, Edit, Calendar, Phone, MapPin, Mail, Camera, CheckCircle, AlertCircle, Clock, Menu, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';


const PharmacyDashboard = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddMedicine, setShowAddMedicine] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);

    // Add this style tag to your component or in a CSS file:
    const scannerStyles = `
    #qr-reader video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
    }
    #qr-reader {
        width: 100% !important;
        height: 100% !important;
    }
`;

    // Add this inside your component:
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = scannerStyles;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        if (cameraActive) {
            // Request camera permissions explicitly
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user" // Use back camera if available
                }
            }).then(() => {
                const scanner = new Html5QrcodeScanner("qr-reader", {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    disableFlip: false,
                    verbose: false
                });

                scanner.render(
                    () => {
                        setScannedData(samplePrescription);
                        setCameraActive(false);
                        scanner.clear();
                    },
                    () => {
                        // Handle errors silently
                    }
                );

                return () => scanner.clear();
            }).catch((err) => {
                console.error("Camera permission denied:", err);
                alert("Camera permission is required to scan QR codes. Please allow camera access and try again.");
                setCameraActive(false);
            });
        }
    }, [cameraActive]);

    // Sample inventory data
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Paracetamol 500mg', stock: 150, category: 'Pain Relief', expiry: '2025-12-15', price: 25 },
        { id: 2, name: 'Amoxicillin 250mg', stock: 80, category: 'Antibiotic', expiry: '2025-06-20', price: 120 },
        { id: 3, name: 'Cetirizine 10mg', stock: 200, category: 'Allergy', expiry: '2026-01-10', price: 15 },
        { id: 4, name: 'Omeprazole 20mg', stock: 45, category: 'Gastric', expiry: '2025-08-30', price: 85 },
        { id: 5, name: 'Metformin 500mg', stock: 120, category: 'Diabetes', expiry: '2025-11-25', price: 45 }
    ]);

    const [newMedicine, setNewMedicine] = useState({
        name: '', stock: '', category: '', expiry: '', price: ''
    });

    // Sample pharmacy profile
    const pharmacyProfile = {
        name: 'HealthCare Pharmacy',
        licenseNo: 'PH2024001',
        phone: '+91 98765 43210',
        email: 'healthcare@pharmacy.com',
        address: 'Main Market, Nabha, Punjab',
        owner: 'Dr. Rajesh Sharma'
    };

    // Sample prescription data
    const samplePrescription = {
        patientName: 'Ramesh Kumar',
        doctorName: 'Dr. Priya Sharma',
        date: '2025-01-15',
        medicines: [
            { name: 'Paracetamol 500mg', dosage: '1-1-1 after meals', duration: '5 days' },
            { name: 'Cetirizine 10mg', dosage: '0-0-1 before sleep', duration: '3 days' }
        ]
    };

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addMedicine = () => {
        if (!newMedicine.name || !newMedicine.stock || !newMedicine.category || !newMedicine.expiry || !newMedicine.price) {
            return;
        }
        const medicine = {
            id: inventory.length + 1,
            name: newMedicine.name,
            stock: parseInt(newMedicine.stock),
            category: newMedicine.category,
            expiry: newMedicine.expiry,
            price: parseFloat(newMedicine.price)
        };
        setInventory([...inventory, medicine]);
        setNewMedicine({ name: '', stock: '', category: '', expiry: '', price: '' });
        setShowAddMedicine(false);
    };


    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false); // Close mobile sidebar when tab changes
    };

    // Mobile Header Component
    const MobileHeader = () => (
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <h1 className="ml-3 text-xl font-bold text-blue-600">SehatSaathi</h1>
            </div>
            <div className="text-sm text-gray-500">
                {activeTab === 'inventory' && 'Inventory'}
                {activeTab === 'profile' && 'Profile'}
                {activeTab === 'scanner' && 'Scanner'}
            </div>
        </div>
    );

    // Sidebar Component with mobile responsiveness
    const Sidebar = () => (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">SehatSaathi</h1>
                    <p className="text-sm text-gray-500 mt-1">Pharmacy Portal</p>
                </div>

                <nav className="mt-8 px-6 space-y-2">
                    <button
                        onClick={() => handleTabChange('inventory')}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === 'inventory' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Package className="w-5 h-5 mr-3" />
                        Inventory
                    </button>

                    <button
                        onClick={() => handleTabChange('profile')}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <User className="w-5 h-5 mr-3" />
                        My Profile
                    </button>

                    <button
                        onClick={() => handleTabChange('scanner')}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === 'scanner' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <QrCode className="w-5 h-5 mr-3" />
                        QR Scanner
                    </button>
                </nav>
            </div>
        </>
    );

    // Scanner Tab Component
    const ScannerTab = () => {
        const handleQRScan = () => {
            setCameraActive(true);
            const scanner = new Html5QrcodeScanner('qr-reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            });

            scanner.render(success, error);

            function success(result) {
                setCameraActive(false);
                setScannedData(result);
                scanner.clear();
            }

            function error(err) {
                console.warn(err);
            }
        };

        const stopCamera = () => {
            const scanner = document.getElementById('qr-reader');
            if (scanner) {
                scanner.innerHTML = '';
                setCameraActive(false);
            }
        };

        return (
            <div className="p-6">
                <style>{scannerStyles}</style>
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between mb-4">
                        {!cameraActive && (
                            <button
                                onClick={handleQRScan}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Start Camera
                            </button>
                        )}
                        {cameraActive && (
                            <button
                                onClick={stopCamera}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                            >
                                Stop Camera
                            </button>
                        )}
                    </div>
                    <div id="qr-reader" className="mt-4 rounded-lg overflow-hidden"></div>
                    {scannedData && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <h3 className="font-bold text-green-800">Scanned Result:</h3>
                            <p className="text-green-700">{scannedData}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <MobileHeader />

                <div className="flex-1 overflow-auto">
                    {activeTab === 'inventory' && (
                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Header - Mobile Responsive */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Medicine Inventory</h2>
                                    <p className="text-gray-600 mt-1">Manage your pharmacy stock</p>
                                </div>
                                <button
                                    onClick={() => setShowAddMedicine(true)}
                                    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Medicine
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search medicines..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Stats Cards - Mobile Responsive Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 rounded-lg text-white">
                                    <h3 className="text-sm sm:text-lg font-medium">Total</h3>
                                    <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{inventory.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 sm:p-6 rounded-lg text-white">
                                    <h3 className="text-sm sm:text-lg font-medium">In Stock</h3>
                                    <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{inventory.filter(item => item.stock > 50).length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 sm:p-6 rounded-lg text-white">
                                    <h3 className="text-sm sm:text-lg font-medium">Low Stock</h3>
                                    <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{inventory.filter(item => item.stock <= 50 && item.stock > 10).length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 rounded-lg text-white">
                                    <h3 className="text-sm sm:text-lg font-medium">Critical</h3>
                                    <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{inventory.filter(item => item.stock <= 10).length}</p>
                                </div>
                            </div>

                            {/* Inventory - Mobile Cards / Desktop Table */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                {/* Desktop Table View */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Medicine</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Category</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Price</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Expiry</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredInventory.map((medicine) => (
                                                <tr key={medicine.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{medicine.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                            {medicine.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medicine.stock} units</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{medicine.price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(medicine.expiry).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {medicine.stock > 50 ? (
                                                            <span className="flex items-center text-green-600">
                                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                                In Stock
                                                            </span>
                                                        ) : medicine.stock > 10 ? (
                                                            <span className="flex items-center text-yellow-600">
                                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                                Low Stock
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center text-red-600">
                                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                                Critical
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Card View */}
                                <div className="lg:hidden divide-y divide-gray-200">
                                    {filteredInventory.map((medicine) => (
                                        <div key={medicine.id} className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-gray-900 text-sm">{medicine.name}</h3>
                                                {medicine.stock > 50 ? (
                                                    <span className="flex items-center text-green-600 text-xs">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        In Stock
                                                    </span>
                                                ) : medicine.stock > 10 ? (
                                                    <span className="flex items-center text-yellow-600 text-xs">
                                                        <AlertCircle className="w-3 h-3 mr-1" />
                                                        Low
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-red-600 text-xs">
                                                        <AlertCircle className="w-3 h-3 mr-1" />
                                                        Critical
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-4 text-xs text-gray-500">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                        {medicine.category}
                                                    </span>
                                                    <span>{medicine.stock} units</span>
                                                    <span>₹{medicine.price}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Exp: {new Date(medicine.expiry).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add Medicine Modal - Mobile Responsive */}
                            {showAddMedicine && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                                        <h3 className="text-xl font-bold mb-6">Add New Medicine</h3>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Medicine Name"
                                                value={newMedicine.name}
                                                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Stock Quantity"
                                                value={newMedicine.stock}
                                                onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Category"
                                                value={newMedicine.category}
                                                onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="date"
                                                value={newMedicine.expiry}
                                                onChange={(e) => setNewMedicine({ ...newMedicine, expiry: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Price per unit"
                                                value={newMedicine.price}
                                                onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                                <button
                                                    onClick={addMedicine}
                                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    Add Medicine
                                                </button>
                                                <button
                                                    onClick={() => setShowAddMedicine(false)}
                                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Pharmacy Profile</h2>

                            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
                                {/* Profile Card - Full width on mobile */}
                                <div className="lg:col-span-1 order-1">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold">{pharmacyProfile.name}</h3>
                                        <p className="text-blue-100">License: {pharmacyProfile.licenseNo}</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-6 mt-6 text-center">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                                        </div>
                                        <h4 className="font-semibold text-gray-800">Pharmacy QR Code</h4>
                                        <p className="text-sm text-gray-600 mt-1">Show this to patients for quick access</p>
                                    </div>
                                </div>

                                {/* Basic Information - Full width on mobile */}
                                <div className="lg:col-span-2 order-2">
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="text-xl font-semibold mb-6">Basic Information</h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <User className="w-5 h-5 text-purple-500 mr-2" />
                                                    <span className="text-sm text-gray-500">Pharmacy Name</span>
                                                </div>
                                                <p className="font-medium break-words">{pharmacyProfile.name}</p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                                                    <span className="text-sm text-gray-500">License No</span>
                                                </div>
                                                <p className="font-medium">{pharmacyProfile.licenseNo}</p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <User className="w-5 h-5 text-gray-500 mr-2" />
                                                    <span className="text-sm text-gray-500">Owner</span>
                                                </div>
                                                <p className="font-medium">{pharmacyProfile.owner}</p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <Phone className="w-5 h-5 text-blue-500 mr-2" />
                                                    <span className="text-sm text-gray-500">Phone</span>
                                                </div>
                                                <p className="font-medium break-all">{pharmacyProfile.phone}</p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2">
                                                <div className="flex items-center mb-2">
                                                    <Mail className="w-5 h-5 text-red-500 mr-2" />
                                                    <span className="text-sm text-gray-500">Email</span>
                                                </div>
                                                <p className="font-medium break-all">{pharmacyProfile.email}</p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2">
                                                <div className="flex items-center mb-2">
                                                    <MapPin className="w-5 h-5 text-red-500 mr-2" />
                                                    <span className="text-sm text-gray-500">Address</span>
                                                </div>
                                                <p className="font-medium">{pharmacyProfile.address}</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'scanner' && (
                        <div className="p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">QR Code Scanner</h2>

                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
                                {/* Scanner Section */}
                                <div className="bg-white rounded-lg shadow p-6 order-1">
                                    <h3 className="text-xl font-semibold mb-6">Scan Patient QR Code</h3>

                                    <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center mb-6">
                                        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden relative">
                                            {cameraActive ? (
                                                <div id="qr-reader" style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}></div>
                                            ) : (
                                                <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                                            )}

                                            {cameraActive && (
                                                <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse">
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-red-500 bg-transparent"></div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                                            {cameraActive ? 'Hold QR code in front of camera' : 'Position the QR code within the frame'}
                                        </p>
                                        <button
                                            onClick={cameraActive ? () => setCameraActive(false) : () => setCameraActive(true)}
                                            className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-colors ${cameraActive
                                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                }`}
                                        >
                                            {cameraActive ? 'Stop Camera' : 'Start Camera'}
                                        </button>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Instructions:</strong> Ask the patient to show their prescription QR code from the SehatSaathi app.
                                            The scanner will automatically detect and display the prescribed medicines.
                                        </p>
                                    </div>
                                </div>

                                {/* Prescription Details */}
                                <div className="bg-white rounded-lg shadow p-6 order-2">
                                    <h3 className="text-xl font-semibold mb-6">Prescription Details</h3>

                                    {scannedData ? (
                                        <div>
                                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                                <h4 className="font-semibold text-gray-800 mb-2">Patient Information</h4>
                                                <p className="text-sm"><strong>Name:</strong> {scannedData.patientName}</p>
                                                <p className="text-sm"><strong>Doctor:</strong> {scannedData.doctorName}</p>
                                                <p className="text-sm"><strong>Date:</strong> {new Date(scannedData.date).toLocaleDateString()}</p>
                                            </div>

                                            <h4 className="font-semibold text-gray-800 mb-4">Prescribed Medicines</h4>
                                            <div className="space-y-4">
                                                {scannedData.medicines.map((medicine, index) => (
                                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                                            <h5 className="font-medium text-gray-800 text-sm mb-2 sm:mb-0">{medicine.name}</h5>
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full w-fit">
                                                                Available
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            <strong>Dosage:</strong> {medicine.dosage}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            <strong>Duration:</strong> {medicine.duration}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors">
                                                Confirm Medicine Availability
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 py-12">
                                            <QrCode className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
                                            <p className="text-sm sm:text-base">No QR code scanned yet</p>
                                            <p className="text-xs sm:text-sm">Scan a patient's prescription QR code to view details</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PharmacyDashboard;
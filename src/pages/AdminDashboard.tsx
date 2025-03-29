import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData, Counselor, Appointment, Invoice } from '../context/DataContext';
import { ChartBar, Calendar, Check, Clock, DollarSign, Pencil, Mail, Trash, Users, CircleX } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { counselors, appointments, invoices, addInvoice, updateInvoice } = useData();
  const [activeTab, setActiveTab] = useState('counselors');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<number>(90);
  const [newInvoiceDescription, setNewInvoiceDescription] = useState<string>('Monthly platform subscription');
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);

  // Redirect if not logged in or not an admin
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Generate statistics
  const totalCounselors = counselors.length;
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(
    app => app.status === 'scheduled' && new Date(app.date) > new Date()
  ).length;
  const completedAppointments = appointments.filter(
    app => app.status === 'completed'
  ).length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;

  const handleCreateInvoice = () => {
    if (!selectedCounselor) return;
    
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 15); // Set due date to 15 days from now
    
    addInvoice({
      counselorId: selectedCounselor,
      amount: newInvoiceAmount,
      date: today.toISOString(),
      dueDate: dueDate.toISOString(),
      status: 'pending',
      description: newInvoiceDescription
    });
    
    setSelectedCounselor(null);
    setNewInvoiceAmount(90);
    setNewInvoiceDescription('Monthly platform subscription');
  };

  const handleMarkInvoiceAsPaid = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      updateInvoice({
        ...invoice,
        status: 'paid'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card flex items-center p-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Counselors</p>
            <p className="text-2xl font-semibold text-gray-900">{totalCounselors}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Appointments</p>
            <p className="text-2xl font-semibold text-gray-900">{totalAppointments}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
            <Check size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed Sessions</p>
            <p className="text-2xl font-semibold text-gray-900">{completedAppointments}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pending Invoices</p>
            <p className="text-2xl font-semibold text-gray-900">{pendingInvoices}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('counselors')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'counselors'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center">
            <Users size={18} className="mr-2" />
            Counselors
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('appointments')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'appointments'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            Appointments
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('invoices')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'invoices'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center">
            <DollarSign size={18} className="mr-2" />
            Invoices
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'analytics'
              ? 'border-primary text-primary font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center">
            <ChartBar size={18} className="mr-2" />
            Analytics
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'counselors' && (
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Counselor Directory</h2>
            <button className="btn-primary text-sm py-1 px-3">Add New Counselor</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Counselor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {counselors.map((counselor) => (
                  <tr key={counselor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={counselor.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{counselor.name}</div>
                          <div className="text-sm text-gray-500">{counselor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {counselor.specialties.slice(0, 2).join(', ')}
                        {counselor.specialties.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{counselor.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${counselor.hourlyRate}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="card overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Appointments</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Counselor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => {
                  const counselor = counselors.find(c => c.id === appointment.counselorId);
                  return (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {counselor?.name || 'Unknown Counselor'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(appointment.date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(appointment.date), 'h:mm a')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.status === 'completed' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : appointment.status === 'cancelled' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        ) : new Date(appointment.date) > new Date() ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Scheduled
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Missed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div>
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Invoice</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="counselor" className="block text-sm font-medium text-gray-700 mb-1">
                  Counselor
                </label>
                <select
                  id="counselor"
                  className="input"
                  value={selectedCounselor || ''}
                  onChange={(e) => setSelectedCounselor(e.target.value)}
                >
                  <option value="">Select a counselor</option>
                  {counselors.map(counselor => (
                    <option key={counselor.id} value={counselor.id}>
                      {counselor.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  className="input"
                  value={newInvoiceAmount}
                  onChange={(e) => setNewInvoiceAmount(Number(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="input"
                value={newInvoiceDescription}
                onChange={(e) => setNewInvoiceDescription(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleCreateInvoice}
              disabled={!selectedCounselor}
              className={`btn-primary ${!selectedCounselor ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Create Invoice
            </button>
          </div>
          
          <div className="card overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Invoices</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Counselor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => {
                    const counselor = counselors.find(c => c.id === invoice.counselorId);
                    return (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {counselor?.name || 'Unknown'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${invoice.amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(new Date(invoice.date), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {invoice.status === 'paid' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Paid
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {invoice.status === 'pending' ? (
                            <button 
                              onClick={() => handleMarkInvoiceAsPaid(invoice.id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Mark as Paid
                            </button>
                          ) : (
                            <span className="text-gray-400">Completed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Analytics</h2>
          
          <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">Analytics visualization coming soon</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Top Counselors</h3>
              <div className="space-y-3">
                {counselors.slice(0, 3).map((counselor, index) => (
                  <div key={counselor.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-900">{counselor.name}</span>
                    </div>
                    <span className="text-gray-600">
                      {appointments.filter(a => a.counselorId === counselor.id).length} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Appointment Trends</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="text-gray-900 font-medium">{upcomingAppointments} appointments</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed (Last 30 days)</span>
                  <span className="text-gray-900 font-medium">{completedAppointments} sessions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Session Duration</span>
                  <span className="text-gray-900 font-medium">60 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

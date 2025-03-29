import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData, Appointment, Message } from '../context/DataContext';
import { Calendar, CircleCheck, Clock, ExternalLink, FileText, MessageSquare, Settings, Users, Video, CircleX } from 'lucide-react';
import { format } from 'date-fns';

const CounselorDashboard = () => {
  const { user } = useAuth();
  const { appointments, messages } = useData();
  const [activeTab, setActiveTab] = useState('appointments');

  // Redirect if not logged in or not a counselor
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'counselor') {
    return <Navigate to="/" />;
  }

  // Filter appointments and messages for the current counselor
  const counselorAppointments = appointments.filter(
    app => app.counselorId === user.id
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const counselorMessages = messages.filter(
    msg => msg.receiverId === user.id || msg.senderId === user.id
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const upcomingAppointments = counselorAppointments.filter(
    app => app.status === 'scheduled' && new Date(app.date) > new Date()
  );

  const pastAppointments = counselorAppointments.filter(
    app => app.status === 'completed' || new Date(app.date) < new Date()
  );

  const unreadMessages = counselorMessages.filter(
    msg => msg.receiverId === user.id && !msg.read
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">Counselor Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <div className="bg-primary/5 p-4 flex items-center space-x-3 border-b border-gray-200">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">Biblical Counselor</p>
              </div>
            </div>

            <nav className="p-2">
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === 'appointments' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar size={20} />
                <span>Appointments</span>
              </button>

              <button 
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === 'clients' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                <span>Clients</span>
              </button>

              <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === 'messages' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <MessageSquare size={20} />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </div>
                <span>Messages</span>
              </button>

              <button 
                onClick={() => setActiveTab('notes')}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === 'notes' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                <span>Session Notes</span>
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === 'settings' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div>
              <div className="card mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
                
                {upcomingAppointments.length === 0 ? (
                  <p className="text-gray-600">No upcoming appointments scheduled.</p>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Appointments</h2>
                
                {pastAppointments.length === 0 ? (
                  <p className="text-gray-600">No past appointments found.</p>
                ) : (
                  <div className="space-y-4">
                    {pastAppointments.slice(0, 5).map(appointment => (
                      <AppointmentCard key={appointment.id} appointment={appointment} isPast />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Clients</h2>
              
              {/* Get unique clients from appointments */}
              {Array.from(new Set(counselorAppointments.map(app => app.clientId))).length === 0 ? (
                <p className="text-gray-600">No clients yet.</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {Array.from(
                    new Set(counselorAppointments.map(app => app.clientId))
                  ).map(clientId => {
                    const clientAppointment = counselorAppointments.find(app => app.clientId === clientId);
                    if (!clientAppointment) return null;
                    
                    return (
                      <div key={clientId} className="py-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{clientAppointment.clientName}</h3>
                          <p className="text-sm text-gray-600">
                            Last session: {new Date(clientAppointment.date) < new Date() 
                              ? format(new Date(clientAppointment.date), 'MMM d, yyyy')
                              : 'Upcoming'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-sm py-1 px-3">View Notes</button>
                          <button className="btn-primary text-sm py-1 px-3">Message</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
              
              {counselorMessages.length === 0 ? (
                <p className="text-gray-600">No messages yet.</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {counselorMessages.map(message => (
                    <div key={message.id} className={`py-4 ${message.receiverId === user.id && !message.read ? 'bg-primary/5' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">
                            {message.senderId === user.id ? 'You' : message.senderName}
                          </span>
                          <span className="mx-1 text-gray-500">→</span>
                          <span className="text-gray-700">
                            {message.receiverId === user.id ? 'You' : 'Client'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Notes</h2>
              
              <div className="space-y-4">
                {pastAppointments.length === 0 ? (
                  <p className="text-gray-600">No past sessions found.</p>
                ) : (
                  pastAppointments.slice(0, 10).map(appointment => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                      <div>
                        <h3 className="font-medium text-gray-900">Session with {appointment.clientName}</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(appointment.date), 'MMMM d, yyyy')} at {format(new Date(appointment.date), 'h:mm a')}
                        </p>
                      </div>
                      <a
                        href="https://docs.google.com/document/create"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-1 px-3 flex items-center"
                      >
                        <FileText size={16} className="mr-1" />
                        {appointment.notes ? 'View Notes' : 'Create Notes'}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Settings</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    defaultValue={user.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    defaultValue={user.email}
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="input"
                    defaultValue="Dr. Sarah Johnson has been providing biblical counseling for over 15 years, specializing in marriage and family therapy. She holds a doctorate in counseling psychology and is certified in biblical counseling by the Association of Certified Biblical Counselors."
                  />
                </div>
                
                <div>
                  <label htmlFor="paypal" className="block text-sm font-medium text-gray-700 mb-1">
                    PayPal Link
                  </label>
                  <input
                    type="text"
                    id="paypal"
                    className="input"
                    defaultValue="https://paypal.me/sarahjohnson"
                  />
                </div>
                
                <div>
                  <button type="button" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for appointment cards
const AppointmentCard = ({ appointment, isPast = false }: { appointment: Appointment, isPast?: boolean }) => {
  const appointmentDate = new Date(appointment.date);
  const isUpcoming = appointmentDate > new Date();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-md">
      <div className="mb-4 sm:mb-0">
        <h3 className="font-medium text-gray-900">
          Session with {appointment.clientName}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Clock size={16} className="mr-1 text-gray-400" />
          {format(appointmentDate, 'EEEE, MMMM d, yyyy')} at {format(appointmentDate, 'h:mm a')}
        </div>
        <div className="flex items-center mt-2">
          {appointment.status === 'completed' ? (
            <span className="flex items-center text-sm text-green-700">
              <CircleCheck size={16} className="mr-1" />
              Completed
            </span>
          ) : appointment.status === 'cancelled' ? (
            <span className="flex items-center text-sm text-red-700">
              <CircleX size={16} className="mr-1" />
              Cancelled
            </span>
          ) : isUpcoming ? (
            <span className="flex items-center text-sm text-blue-700">
              <Calendar size={16} className="mr-1" />
              Upcoming
            </span>
          ) : (
            <span className="flex items-center text-sm text-orange-700">
              <Clock size={16} className="mr-1" />
              Missed
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        {!isPast && appointment.meetingLink && (
          <a
            href={appointment.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-1 px-3 flex items-center justify-center"
          >
            <Video size={16} className="mr-1" />
            Join Session
          </a>
        )}
        
        <button className="btn-secondary text-sm py-1 px-3 flex items-center justify-center">
          <FileText size={16} className="mr-1" />
          {isPast ? 'View Notes' : 'Add Notes'}
        </button>
      </div>
    </div>
  );
};

export default CounselorDashboard;

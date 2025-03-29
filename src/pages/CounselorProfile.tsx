import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  LogIn,
  Mail,
  MapPin,
  Tag,
  UserPlus,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MessageForm from "../components/MessageForm";

const CounselorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { counselors, addAppointment } = useData();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  const counselor = counselors.find((c) => c.id === id);

  if (!counselor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Counselor not found
        </h2>
        <p className="mt-2 text-gray-600">
          The counselor you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/counselors" className="mt-4 btn-primary inline-block">
          Browse Counselors
        </Link>
      </div>
    );
  }

  // Available time slots for the selected date
  const availableTimeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Filter out weekends and past dates
  const filterDate = (date: Date) => {
    const day = date.getDay();
    const isWeekday = day !== 0 && day !== 6;
    const isToday = date.getDate() === new Date().getDate();
    const isFuture = date > new Date();

    return isWeekday && (isToday || isFuture);
  };

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !user) return;

    // Create appointment date by combining selected date and time
    const appointmentDate = new Date(selectedDate);
    const [hour, minute] = selectedTime.split(":");
    const isPM = selectedTime.includes("PM");
    appointmentDate.setHours(
      isPM ? parseInt(hour) + 12 : parseInt(hour),
      parseInt(minute) || 0
    );

    // Add the appointment
    addAppointment({
      counselorId: counselor.id,
      clientId: user.id,
      clientName: user.name,
      date: appointmentDate.toISOString(),
      status: "scheduled",
      meetingLink: `https://meet.google.com/${Math.random()
        .toString(36)
        .substring(2, 10)}`,
    });

    setBookingSuccess(true);
    setSelectedDate(null);
    setSelectedTime("");
  };

  // Authentication call-to-action component
  const AuthCTA = () => (
    <div className="bg-primary/5 border border-primary/20 rounded-md p-5 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Authentication Required
      </h3>
      <p className="text-gray-600 mb-4">
        You need to be logged in to contact or schedule with counselors.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/login"
          className="btn-primary flex justify-center items-center"
        >
          <LogIn size={16} className="mr-2" />
          Log In
        </Link>
        <Link
          to="/register"
          className="btn-secondary flex justify-center items-center"
        >
          <UserPlus size={16} className="mr-2" />
          Create Account
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/counselors" className="text-primary hover:text-primary/80">
          ← Back to all counselors
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Counselor Info */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={counselor.imageUrl}
                  alt={counselor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif text-gray-900">
                  {counselor.name}
                </h1>
                <p className="text-lg text-gray-600">{counselor.title}</p>
                <p className="text-sm text-gray-600">{counselor.credentials}</p>

                <div className="mt-3 flex items-center text-gray-700">
                  <MapPin size={18} className="mr-2 text-gray-500" />
                  {counselor.location}
                </div>
                <div className="mt-3 flex items-center text-gray-700 text-sm">
                  {counselor.education}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    {counselor.denomination}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {counselor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                    >
                      <Tag size={14} className="mr-1" />
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 whitespace-pre-line">{counselor.bio}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Individual Counseling
                  </h3>
                  <p className="mt-1 text-gray-600">
                    One-on-one biblical guidance through personal challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Marriage Counseling
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Scripture-based guidance for couples seeking to strengthen
                    their relationship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking and Contact */}
        <div className="lg:col-span-1">
          <div className="card mb-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Book a Session
            </h2>

            <div className="mb-4 flex items-center text-gray-700">
              <DollarSign size={18} className="mr-2 text-gray-500" />
              <span>${counselor.hourlyRate} per hour</span>
            </div>

            <div className="mb-4 flex items-center text-gray-700">
              <Clock size={18} className="mr-2 text-gray-500" />
              <span>Available on: {counselor.availability.join(", ")}</span>
            </div>

            {user ? (
              bookingSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                  <p className="text-green-700">
                    Your session has been booked successfully!
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Check your email for confirmation details.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="mt-3 text-sm text-primary font-medium"
                  >
                    Book another session
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      filterDate={filterDate}
                      minDate={new Date()}
                      className="input"
                      placeholderText="Select a date"
                      dateFormat="MMMM d, yyyy"
                    />
                  </div>

                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`py-2 px-3 text-sm rounded-md border ${
                              selectedTime === time
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <a
                      href={counselor.paypalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex justify-center items-center"
                    >
                      Pay via PayPal
                      <ExternalLink size={16} className="ml-2" />
                    </a>

                    <button
                      onClick={handleBookSession}
                      disabled={!selectedDate || !selectedTime}
                      className={`btn-accent w-full ${
                        !selectedDate || !selectedTime
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Book Session
                    </button>
                  </div>
                </>
              )
            ) : (
              <AuthCTA />
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              {user ? (
                <>
                  <button
                    onClick={() => setShowMessageForm(!showMessageForm)}
                    className="btn-secondary w-full flex justify-center items-center"
                  >
                    <Mail size={16} className="mr-2" />
                    {showMessageForm ? "Cancel Message" : "Send Message"}
                  </button>

                  {showMessageForm && (
                    <div className="mt-4">
                      <MessageForm
                        receiverId={counselor.id}
                        receiverName={counselor.name}
                        onMessageSent={() => setShowMessageForm(false)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-600 text-sm py-2">
                  You must be logged in to contact this counselor
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfile;

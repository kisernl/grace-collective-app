import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";

// Types
export interface Counselor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  denomination: string;
  imageUrl: string;
  specialties: string[];
  location: string;
  bio: string;
  email: string;
  paypalLink: string;
  availability: string[];
  hourlyRate: number;
  education: string;
  accreditation: string[];
  gender: string;
  yearsExperience: number;
  acceptingClients: boolean;
}

export interface Appointment {
  id: string;
  counselorId: string;
  clientId: string;
  clientName: string;
  date: string; // ISO string
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  meetingLink?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string; // ISO string
  read: boolean;
}

export interface Invoice {
  id: string;
  counselorId: string;
  amount: number;
  date: string; // ISO string
  dueDate: string; // ISO string
  status: "pending" | "paid";
  description: string;
}

interface DataContextType {
  counselors: Counselor[];
  appointments: Appointment[];
  messages: Message[];
  invoices: Invoice[];
  addAppointment: (appointment: Omit<Appointment, "id">) => string;
  updateAppointment: (appointment: Appointment) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp" | "read">) => void;
  markMessageAsRead: (messageId: string) => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  updateInvoice: (invoice: Invoice) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Sample data
const sampleCounselors: Counselor[] = [
  {
    id: "c1",
    name: "Dr. Sarah Johnson",
    title: "Licensed Biblical Counselor",
    credentials: "Ph.D., LPC, ACBC",
    denomination: "Non-denominational",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Marriage", "Anxiety", "Depression"],
    location: "Nashville, TN",
    bio: "Dr. Sarah Johnson has been providing biblical counseling for over 15 years, specializing in marriage and family therapy. She holds a doctorate in counseling psychology and is certified in biblical counseling by the Association of Certified Biblical Counselors.",
    email: "sarah.johnson@example.com",
    paypalLink: "https://paypal.me/sarahjohnson",
    availability: ["Monday", "Wednesday", "Friday"],
    hourlyRate: 90,
    education: "Dallas Theological Seminary",
    accreditation: ["ACBC", "LPC"],
    gender: "Female",
    yearsExperience: 15,
    acceptingClients: true,
  },
  {
    id: "c2",
    name: "Pastor Michael Thompson",
    title: "Pastoral Counselor",
    credentials: "M.Div., CCBC",
    denomination: "Southern Baptist Convention (SBC)",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Grief", "Spiritual Direction", "Life Transitions"],
    location: "Atlanta, GA",
    bio: "Pastor Michael Thompson has served in ministry for 20 years and provides compassionate biblical guidance through life's most challenging moments. He specializes in grief counseling and spiritual direction.",
    email: "michael.thompson@example.com",
    paypalLink: "https://paypal.me/michaelthompson",
    availability: ["Tuesday", "Thursday", "Saturday"],
    hourlyRate: 75,
    education: "Southern Baptist Theological Seminary",
    accreditation: ["CCBC"],
    gender: "Male",
    yearsExperience: 20,
    acceptingClients: false,
  },
  {
    id: "c3",
    name: "Rebecca Wilson, LMFT",
    title: "Licensed Marriage & Family Therapist",
    credentials: "M.A., LMFT, NBC-HWC",
    denomination: "Evangelical Presbyterian Church (EPC)",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Marriage", "Parenting", "Trauma"],
    location: "Dallas, TX",
    bio: "Rebecca Wilson is a licensed marriage and family therapist who integrates biblical principles with evidence-based therapeutic approaches. She has helped hundreds of couples strengthen their marriages and navigate parenting challenges.",
    email: "rebecca.wilson@example.com",
    paypalLink: "https://paypal.me/rebeccawilson",
    availability: ["Monday", "Tuesday", "Thursday"],
    hourlyRate: 85,
    education: "Trinity Evangelical Divinity School",
    accreditation: ["LMFT", "AACC"],
    gender: "Female",
    yearsExperience: 8,
    acceptingClients: true,
  },
  {
    id: "c4",
    name: "David Rodriguez, MA",
    title: "Biblical Counselor",
    credentials: "M.A., CCEF",
    denomination: "Presbyterian Church in America (PCA)",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Addiction Recovery", "Men's Issues", "Anger Management"],
    location: "Phoenix, AZ",
    bio: "David Rodriguez specializes in helping men overcome addiction and manage anger through biblical principles. With 10 years of experience in recovery ministry, he provides compassionate yet direct counsel.",
    email: "david.rodriguez@example.com",
    paypalLink: "https://paypal.me/davidrodriguez",
    availability: ["Wednesday", "Friday", "Saturday"],
    hourlyRate: 80,
    education: "Westminster Theological Seminary",
    accreditation: ["CCEF"],
    gender: "Male",
    yearsExperience: 10,
    acceptingClients: true,
  },
  {
    id: "c5",
    name: "Jennifer Liu, LPC",
    title: "Christian Counselor",
    credentials: "M.S., LPC, BCPCC",
    denomination: "Anglican Church in North America (ACNA)",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Depression", "Anxiety", "Cultural Adjustment"],
    location: "Seattle, WA",
    bio: "Jennifer Liu is a licensed professional counselor who specializes in helping clients navigate depression, anxiety, and cultural adjustment issues. She integrates evidence-based counseling methods with biblical principles.",
    email: "jennifer.liu@example.com",
    paypalLink: "https://paypal.me/jenniferliu",
    availability: ["Monday", "Wednesday", "Friday"],
    hourlyRate: 95,
    education: "Fuller Theological Seminary",
    accreditation: ["LPC", "BCPCC"],
    gender: "Female",
    yearsExperience: 7,
    acceptingClients: true,
  },
  {
    id: "c6",
    name: "Dr. James Williams",
    title: "Pastoral Counselor",
    credentials: "Ph.D., D.Min., AAPC",
    denomination: "Global Methodist Church (GMC)",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    specialties: ["Pastoral Care", "Spiritual Formation", "Grief"],
    location: "Chicago, IL",
    bio: "Dr. James Williams has served in ministry and counseling for over 25 years. With doctoral degrees in ministry and psychology, he provides integrative care that addresses both spiritual and psychological needs.",
    email: "james.williams@example.com",
    paypalLink: "https://paypal.me/jameswilliams",
    availability: ["Tuesday", "Thursday"],
    hourlyRate: 100,
    education: "Gordon-Conwell Theological Seminary",
    accreditation: ["AAPC", "APA"],
    gender: "Male",
    yearsExperience: 25,
    acceptingClients: false,
  },
];

const sampleAppointments: Appointment[] = [
  {
    id: "a1",
    counselorId: "c1",
    clientId: "cl1",
    clientName: "John Smith",
    date: "2023-06-15T14:00:00.000Z",
    status: "completed",
    notes: "Initial consultation - discussed primary concerns",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "a2",
    counselorId: "c1",
    clientId: "cl1",
    clientName: "John Smith",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    status: "scheduled",
    meetingLink: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: "a3",
    counselorId: "c2",
    clientId: "cl2",
    clientName: "Mary Johnson",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    status: "scheduled",
    meetingLink: "https://meet.google.com/uvw-xyz-123",
  },
];

const sampleMessages: Message[] = [
  {
    id: "m1",
    senderId: "cl1",
    senderName: "John Smith",
    receiverId: "c1",
    content:
      "Hello Dr. Johnson, I was wondering if we could move our appointment to an hour later?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: true,
  },
  {
    id: "m2",
    senderId: "c1",
    senderName: "Dr. Sarah Johnson",
    receiverId: "cl1",
    content:
      "Hi John, that should be fine. I'll update our calendar invitation.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    read: false,
  },
];

const sampleInvoices: Invoice[] = [
  {
    id: "i1",
    counselorId: "c1",
    amount: 90.0,
    date: "2023-05-01T00:00:00.000Z",
    dueDate: "2023-05-15T00:00:00.000Z",
    status: "paid",
    description: "Monthly platform subscription - May 2023",
  },
  {
    id: "i2",
    counselorId: "c2",
    amount: 90.0,
    date: "2023-05-01T00:00:00.000Z",
    dueDate: "2023-05-15T00:00:00.000Z",
    status: "pending",
    description: "Monthly platform subscription - May 2023",
  },
];

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [counselors, setCounselors] = useState<Counselor[]>(sampleCounselors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Load data from localStorage or use sample data
    const storedCounselors = localStorage.getItem("counselors");
    const storedAppointments = localStorage.getItem("appointments");
    const storedMessages = localStorage.getItem("messages");
    const storedInvoices = localStorage.getItem("invoices");

    setCounselors(
      storedCounselors ? JSON.parse(storedCounselors) : sampleCounselors
    );
    setAppointments(
      storedAppointments ? JSON.parse(storedAppointments) : sampleAppointments
    );
    setMessages(storedMessages ? JSON.parse(storedMessages) : sampleMessages);
    setInvoices(storedInvoices ? JSON.parse(storedInvoices) : sampleInvoices);
  }, []);

  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem("counselors", JSON.stringify(counselors));
  }, [counselors]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const id = uuidv4();
    const newAppointment = { ...appointment, id };
    setAppointments((prev) => [...prev, newAppointment]);
    return id;
  };

  const updateAppointment = (appointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((ap) => (ap.id === appointment.id ? appointment : ap))
    );
  };

  const addMessage = (message: Omit<Message, "id" | "timestamp" | "read">) => {
    const newMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    );
  };

  const addInvoice = (invoice: Omit<Invoice, "id">) => {
    const newInvoice = {
      ...invoice,
      id: uuidv4(),
    };
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const updateInvoice = (invoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoice.id ? invoice : inv))
    );
  };

  return (
    <DataContext.Provider
      value={{
        counselors,
        appointments,
        messages,
        invoices,
        addAppointment,
        updateAppointment,
        addMessage,
        markMessageAsRead,
        addInvoice,
        updateInvoice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { ArrowRight, Calendar, Heart, MessageCircle } from "lucide-react";
import CounselorCard from "../components/CounselorCard";

const Home = () => {
  const { counselors } = useData();
  const featuredCounselors = counselors.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold font-serif text-gray-900 sm:text-5xl md:text-6xl">
                Biblical Guidance for Life's Journey
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Connect with experienced biblical counselors dedicated to
                providing guidance through Scripture and compassionate support
                for life's challenges.
              </p>
              <div className="mt-10 flex">
                <Link
                  to="/counselors"
                  className="btn-primary flex items-center"
                >
                  Find a Counselor
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  src="./images/hero-image.png"
                  alt="Biblical counseling session"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-serif text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting the spiritual guidance you need is simple
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Find a Counselor
              </h3>
              <p className="mt-2 text-gray-600">
                Browse our directory of qualified biblical counselors and find
                someone who meets your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Schedule a Session
              </h3>
              <p className="mt-2 text-gray-600">
                Choose a time that works for you and book your appointment
                directly through our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Meet Online
              </h3>
              <p className="mt-2 text-gray-600">
                Connect with your counselor through our secure video platform
                for guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Counselors */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-serif text-gray-900">
              Featured Counselors
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet some of our experienced biblical counselors
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredCounselors.length > 0 ? (
              featuredCounselors.map((counselor) => (
                <CounselorCard key={counselor.id} counselor={counselor} />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">
                  No counselors available at the moment.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/counselors"
              className="btn-primary inline-flex items-center"
            >
              View All Counselors
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-serif text-gray-900">
              Why Choose Biblical Counseling
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Scripture-based guidance for navigating life's challenges
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Heart size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                Scripture-Centered
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Our counselors are committed to providing guidance anchored in
                biblical principles and God's wisdom.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                Convenient Scheduling
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Meet with your counselor from the comfort of your home with our
                flexible online scheduling.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageCircle size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                Ongoing Support
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Maintain connection with your counselor through secure messaging
                between sessions.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/join" className="btn-secondary inline-flex items-center">
              Join as a Counselor
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

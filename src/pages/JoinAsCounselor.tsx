import { useState } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  CircleHelp,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const JoinAsCounselor = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    credentials: "",
    experience: "",
    specialties: "",
    website: "",
    message: "",
    agreeToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormState((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    setSubmitted(true);

    // Reset form after submission
    setFormState({
      name: "",
      email: "",
      phone: "",
      location: "",
      education: "",
      credentials: "",
      experience: "",
      specialties: "",
      website: "",
      message: "",
      agreeToTerms: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-4">
          Join Our Counseling Collective
        </h1>
        <p className="text-lg text-gray-600">
          We're looking for qualified biblical counselors to join our platform
          and help provide Scripture-based guidance to those in need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application Process & Requirements */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Application Process
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Submit Application
                  </h3>
                  <p className="text-sm text-gray-600">
                    Complete the form with your qualifications and background.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Initial Review</h3>
                  <p className="text-sm text-gray-600">
                    Our team will review your application (typically within 7
                    business days).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Interview & Assessment
                  </h3>
                  <p className="text-sm text-gray-600">
                    Qualified applicants will be invited for a video interview
                    and theological assessment.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Onboarding</h3>
                  <p className="text-sm text-gray-600">
                    Approved counselors will complete platform training and
                    setup their profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <Check
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700">
                  Master's degree or higher in counseling, psychology, or
                  theology
                </p>
              </div>

              <div className="flex items-start">
                <Check
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700">
                  Biblical counseling certification (ACBC, CCEF, etc.)
                </p>
              </div>

              <div className="flex items-start">
                <Check
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700">
                  Minimum 2 years of counseling experience
                </p>
              </div>

              <div className="flex items-start">
                <Check
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700">
                  Active church membership and pastoral reference
                </p>
              </div>

              <div className="flex items-start">
                <Check
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700">
                  Agreement with our statement of faith and counseling approach
                </p>
              </div>

              {/* <div className="flex items-start">
                <Check size={18} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">Professional liability insurance</p>
              </div>*/}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-md">
              <div className="flex items-start">
                <CircleHelp
                  size={18}
                  className="text-primary mr-2 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-medium text-gray-900">Have questions?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Contact us at{" "}
                    <a
                      href="mailto:counselors@gracecollective.co"
                      className="text-primary hover:underline"
                    >
                      counselors@gracecollective.co
                    </a>{" "}
                    for more information about joining our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {submitted ? (
            <div className="card p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-4">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Application Submitted
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in joining our counseling
                collective. We've received your application and will review it
                shortly. You can expect to hear back from us within 7 business
                days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Counselor Application
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address*
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input pl-10"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="input pl-10"
                        placeholder="City, State"
                        value={formState.location}
                        onChange={handleChange}
                        required
                      />
                      <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Education & Degrees*
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    className="input"
                    placeholder="e.g., M.A. in Counseling, Dallas Theological Seminary"
                    value={formState.education}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="credentials"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Certifications & Credentials*
                  </label>
                  <input
                    type="text"
                    id="credentials"
                    name="credentials"
                    className="input"
                    placeholder="e.g., ACBC, LPC, CCEF"
                    value={formState.credentials}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Years of Counseling Experience*
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      className="input"
                      value={formState.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select years of experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="specialties"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Counseling Specialties*
                    </label>
                    <input
                      type="text"
                      id="specialties"
                      name="specialties"
                      className="input"
                      placeholder="e.g., Marriage, Anxiety, Depression"
                      value={formState.specialties}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Personal Website or LinkedIn (optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="input"
                    placeholder="https://"
                    value={formState.website}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Why do you want to join our counseling collective?*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input"
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={formState.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        terms and conditions
                      </a>{" "}
                      and certify that all information provided is accurate and
                      complete.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    Submit Application
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              What are the benefits of joining the platform?
            </h3>
            <p className="text-gray-700">
              As a member of our counseling collective, you'll receive client
              referrals, scheduling tools, secure messaging, linking to payment
              portal of your choice, and marketing support—all while maintaining
              your independent practice and theological approach.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              What does it cost to join?
            </h3>
            <p className="text-gray-700">
              We operate on a simple subscription model. Counselors pay
              $50/month to be listed on the platform, with no additional fees or
              commission on your sessions. This covers all platform features,
              technical support, and marketing.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How are counselors matched with clients?
            </h3>
            <p className="text-gray-700">
              Clients can browse and select counselors based on specialties,
              location, and availability.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How long does the application process take?
            </h3>
            <p className="text-gray-700">
              The full application process typically takes 2-3 weeks from
              initial submission to approval, depending on scheduling
              availability for interviews and the completeness of your
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsCounselor;

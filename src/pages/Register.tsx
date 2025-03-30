import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Check, CircleAlert, Lock, Mail, User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return setError("You must agree to the terms and conditions");
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/counselors");
      } else {
        setError("Failed to create account. Email may already be in use.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="card shadow-lg">
        <h1 className="text-2xl font-bold font-serif text-center text-gray-900 mb-6">
          Create an Account
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-3 flex items-start">
            <CircleAlert size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-10"
                placeholder="John Smith"
                required
              />
              <User
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="youremail@example.com"
                required
              />
              <Mail
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <Lock
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
              <Lock
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              Terms and Conditions
            </h3>
            <div className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-100 rounded bg-white mb-4">
              <p>
                Please read and agree to the following terms before creating an
                account:
              </p>
              <p className="font-medium mt-4">
                Independent Practitioner Acknowledgment
              </p>
              <p>
                I understand and acknowledge that all counselors listed on the
                Grace Collective platform are independent practitioners who
                operate their own private counseling practices. Each counselor
                is solely responsible for the counseling services they provide.
              </p>
              <p className="font-medium mt-4">
                Organizational Relationship Disclaimer
              </p>
              <p>
                I acknowledge that Grace Collective is not a counseling practice
                or provider. Grace Collective is a platform that facilitates
                administrative connections between clients and independent
                counselors. The counselors on this platform are not employees of
                Grace Collective.
              </p>
              <p className="font-medium mt-4">Liability Waiver</p>
              <p>
                I agree not to hold Grace Collective liable for any acts,
                omissions, or content related to the counseling services
                provided by the independent counselors on this platform. This
                includes, but is not limited to, the quality of counseling
                services, counseling outcomes, scheduling issues, or any
                disputes that may arise between myself and a counselor.
              </p>
              <p className="font-medium mt-4">Professional Relationship</p>
              <p>
                I understand that any professional counseling relationship
                formed will be directly between myself and the individual
                counselor I choose to work with. Grace Collective is not a party
                to this professional relationship and does not supervise or
                control the counseling services provided.
              </p>
              <p className="font-medium mt-4">Platform Purpose</p>
              <p>
                I understand that Grace Collective's role is limited to
                providing a platform for discovery, scheduling, and
                communication between clients and independent counselors. Grace
                Collective does not endorse any specific counseling
                methodologies or guarantee outcomes.
              </p>
            </div>
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                required
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                I have read and agree to the terms and conditions above
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !agreeToTerms}
            className={`btn-primary w-full flex justify-center items-center ${
              loading || !agreeToTerms ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center">
                <Check size={18} className="mr-2" />
                Create Account
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:text-primary/80"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

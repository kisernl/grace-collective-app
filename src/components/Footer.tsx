const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold font-serif text-primary mb-4">
              Grace Collective
            </h3>
            <p className="text-sm text-gray-600">
              Connecting those in need with experienced biblical counselors
              dedicated to providing guidance through life's challenges.
            </p>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/counselors"
                  className="text-gray-600 hover:text-primary"
                >
                  Find a Counselor
                </a>
              </li>
              <li>
                <a href="/join" className="text-gray-600 hover:text-primary">
                  Join as a Counselor
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-600 hover:text-primary">
                  Counselor Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">Info</h4>
            {/* <p className="text-sm text-gray-600 mb-2">
              For support:{" "}
              <a
                href="mailto:support@biblicalcounseling.com"
                className="text-primary hover:underline"
              >
                support@gracecollective.co
              </a>
            </p> */}
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/statement"
                  className="text-gray-600 hover:text-primary"
                >
                  Statement of Faith
                </a>
              </li>
              <li>
                <a href="/Contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Grace Collective. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

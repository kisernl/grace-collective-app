import { Link } from 'react-router-dom';
import { FolderX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <FolderX size={48} />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">Page Not Found</h1>
      
      <p className="text-lg text-gray-600 mb-8">
        We're sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/" className="btn-primary inline-flex items-center">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;

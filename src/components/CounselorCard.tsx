import { Link } from "react-router-dom";
import { Check, Clock, MapPin, Tag } from "lucide-react";
import { Counselor } from "../context/DataContext";

interface CounselorCardProps {
  counselor: Counselor;
}

const CounselorCard = ({ counselor }: CounselorCardProps) => {
  return (
    <Link to={`/counselors/${counselor.id}`}>
      <div className="card hover:shadow-lg transition-shadow h-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={counselor.imageUrl}
              alt={counselor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-gray-900">
              {counselor.name}
            </h3>
            <p className="text-sm text-gray-600">{counselor.credentials}</p>

            <div className="mt-2 flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1 text-gray-400" />
              {counselor.location}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {counselor.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  <Tag size={12} className="mr-1" />
                  {specialty}
                </span>
              ))}
              {counselor.specialties.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{counselor.specialties.length - 3} more
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-600 mt-2 italic">
                {counselor.denomination}
              </p>
            </div>
            <div className="mt-3">
              {counselor.acceptingClients ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Check size={12} className="mr-1" />
                  Accepting New Clients
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  <Clock size={12} className="mr-1" />
                  Waitlist Only
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CounselorCard;

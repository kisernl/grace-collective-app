import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Filter, MapPin, Search, Tag, Users } from "lucide-react";
import CounselorCard from "../components/CounselorCard";

const BrowseCounselors = () => {
  const { counselors } = useData();
  console.log(counselors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedEducation, setSelectedEducation] = useState<string>("");
  const [selectedAccreditation, setSelectedAccreditation] =
    useState<string>("");
  const [selectedDenomination, setSelectedDenomination] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Lists for filter dropdowns
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [allEducations, setAllEducations] = useState<string[]>([]);
  const [allAccreditations, setAllAccreditations] = useState<string[]>([]);
  const [allDenominations, setAllDenominations] = useState<string[]>([]);
  const [allGenders, setAllGenders] = useState<string[]>([]);
  const [experienceRanges] = useState<string[]>([
    "Any",
    "0-5 years",
    "5-10 years",
    "10-15 years",
    "15+ years",
  ]);

  // Extract all unique values for filters
  useEffect(() => {
    const specialties = new Set<string>();
    const locations = new Set<string>();
    const educations = new Set<string>();
    const accreditations = new Set<string>();
    const denominations = new Set<string>();
    const genders = new Set<string>();

    counselors.forEach((counselor) => {
      counselor.specialties.forEach((specialty) => specialties.add(specialty));
      locations.add(counselor.location);
      educations.add(counselor.education);
      counselor.accreditation.forEach((acc) => accreditations.add(acc));
      denominations.add(counselor.denomination);
      genders.add(counselor.gender);
    });

    setAllSpecialties(Array.from(specialties).sort());
    setAllLocations(Array.from(locations).sort());
    setAllEducations(Array.from(educations).sort());
    setAllAccreditations(Array.from(accreditations).sort());
    setAllDenominations(Array.from(denominations).sort());
    setAllGenders(Array.from(genders).sort());
  }, [counselors]);

  // Filter counselors based on all criteria
  const filteredCounselors = counselors.filter((counselor) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      counselor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.credentials.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.denomination.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by selected specialties
    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.some((s) => counselor.specialties.includes(s));

    // Filter by location
    const matchesLocation =
      selectedLocation === "" || counselor.location === selectedLocation;

    // Filter by education
    const matchesEducation =
      selectedEducation === "" || counselor.education === selectedEducation;

    // Filter by accreditation
    const matchesAccreditation =
      selectedAccreditation === "" ||
      counselor.accreditation.includes(selectedAccreditation);

    // Filter by denominations
    const matchesDenomination =
      selectedDenomination === "" ||
      counselor.denomination.includes(selectedDenomination);

    // Filter by gender
    const matchesGender =
      selectedGender === "" || counselor.gender === selectedGender;

    // Filter by years of experience
    let matchesExperience = true;
    if (selectedExperience !== "" && selectedExperience !== "Any") {
      const years = counselor.yearsExperience;
      if (selectedExperience === "0-5 years") {
        matchesExperience = years >= 0 && years <= 5;
      } else if (selectedExperience === "5-10 years") {
        matchesExperience = years > 5 && years <= 10;
      } else if (selectedExperience === "10-15 years") {
        matchesExperience = years > 10 && years <= 15;
      } else if (selectedExperience === "15+ years") {
        matchesExperience = years > 15;
      }
    }

    return (
      matchesSearch &&
      matchesSpecialties &&
      matchesLocation &&
      matchesEducation &&
      matchesAccreditation &&
      matchesDenomination &&
      matchesGender &&
      matchesExperience
    );
  });

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const clearFilters = () => {
    setSelectedSpecialties([]);
    setSelectedLocation("");
    setSelectedEducation("");
    setSelectedAccreditation("");
    setSelectedDenomination("");
    setSelectedGender("");
    setSelectedExperience("");
  };

  const hasActiveFilters = () => {
    return (
      selectedSpecialties.length > 0 ||
      selectedLocation !== "" ||
      selectedEducation !== "" ||
      selectedAccreditation !== "" ||
      selectedDenomination !== "" ||
      selectedGender !== "" ||
      (selectedExperience !== "" && selectedExperience !== "Any")
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-4">
          Find a Biblical Counselor
        </h1>
        <p className="text-lg text-gray-600">
          Browse our directory of experienced counselors to find the right match
          for your needs.
        </p>
      </div>

      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search counselors by name, credentials, specialties..."
            className="input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center btn-secondary"
        >
          <Filter size={18} className="mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filter Counselors</h3>
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Education Filter */}
            <div>
              <label
                htmlFor="education"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Education
              </label>
              <select
                id="education"
                className="input"
                value={selectedEducation}
                onChange={(e) => setSelectedEducation(e.target.value)}
              >
                <option value="">Any Institution</option>
                {allEducations.map((education) => (
                  <option key={education} value={education}>
                    {education}
                  </option>
                ))}
              </select>
            </div>

            {/* Accreditation Filter */}
            <div>
              <label
                htmlFor="accreditation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Accreditation
              </label>
              <select
                id="accreditation"
                className="input"
                value={selectedAccreditation}
                onChange={(e) => setSelectedAccreditation(e.target.value)}
              >
                <option value="">Any Accreditation</option>
                {allAccreditations.map((accreditation) => (
                  <option key={accreditation} value={accreditation}>
                    {accreditation}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                className="input"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Any Gender</option>
                {allGenders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Years of Experience
              </label>
              <select
                id="experience"
                className="input"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experienceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Filter */}
            {/* <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <select
                id="location"
                className="input"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {allLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Specialties Multiselect */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 bg-white min-h-[42px]">
                {selectedSpecialties.length === 0 ? (
                  <span className="text-sm text-gray-500">
                    Select specialties...
                  </span>
                ) : (
                  selectedSpecialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-xs"
                    >
                      {specialty}
                      <button
                        type="button"
                        className="ml-1 hover:text-primary/70"
                        onClick={() => toggleSpecialty(specialty)}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {allSpecialties.slice(0, 10).map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => toggleSpecialty(specialty)}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      selectedSpecialties.includes(specialty)
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "border-gray-300 hover:border-primary/30 hover:bg-gray-50"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
                {allSpecialties.length > 10 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    + {allSpecialties.length - 10} more
                  </span>
                )}
              </div>
            </div>

            {/* Denomination Filter */}
            <div>
              <label
                htmlFor="denomination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Denomination
              </label>
              <select
                id="accreditation"
                className="input"
                value={selectedDenomination}
                onChange={(e) => setSelectedDenomination(e.target.value)}
              >
                <option value="">Any Denomination</option>
                {allDenominations.map((denomination) => (
                  <option key={denomination} value={denomination}>
                    {denomination}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <Users size={18} className="mr-2" />
          <span>{filteredCounselors.length} counselors found</span>
        </div>

        {hasActiveFilters() && (
          <div className="text-sm text-gray-600">
            Filtering by:
            <span className="font-medium ml-1">
              {[
                selectedSpecialties.length > 0 &&
                  `${selectedSpecialties.length} specialties`,
                selectedLocation && `location`,
                selectedEducation && `education`,
                selectedAccreditation && `accreditation`,
                selectedDenomination && `denomination`,
                selectedGender && `gender`,
                selectedExperience &&
                  selectedExperience !== "Any" &&
                  `experience`,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}
      </div>

      {/* Counselor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {counselors.length === 0 ? (
          <div className="col-span-2 card text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              No counselors available at this time
            </h3>
            <p className="mt-2 text-gray-600">
              Please check back later or contact us for assistance
            </p>
          </div>
        ) : filteredCounselors.length === 0 ? (
          <div className="col-span-2 card text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              No counselors found matching your criteria
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your filters or search term
            </p>
            <button onClick={clearFilters} className="mt-4 btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredCounselors.map((counselor) => (
            <CounselorCard key={counselor.id} counselor={counselor} />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseCounselors;

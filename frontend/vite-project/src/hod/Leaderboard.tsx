// import React, { useState, useEffect } from 'react';
// import { Trophy, Filter, TrendingUp, Code, Database, Heart } from 'lucide-react';
// import {getAllStudents} from '../../api/hod';

// // Hardcoded scores for 100 students (as requested)
// const dsa_scores = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 100) + 1);
// const dev_scores = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 100) + 1);

// const Leaderboard = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [filterType, setFilterType] = useState('weightage');
//   const [selectedInterest, setSelectedInterest] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [availableInterests, setAvailableInterests] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Call the actual API
//       const response = await getAllStudents();
      
//       // Extract the data array from the response
//       // The actual data is likely in response.data
//       const studentsData = response.data || response;
      
//       // Verify we have an array
//       if (!Array.isArray(studentsData)) {
//         console.error('API response is not an array:', studentsData);
//         throw new Error('Invalid data format received from API');
//       }
      
//       // Map API response to include DSA and Dev scores
//       const studentsWithScores = studentsData.map(student => {
//         // Use student ID to map to the hardcoded scores arrays
//         const scoreIndex = (student.id - 1) % 100; // Ensure index is within bounds
//         const dsa_score = dsa_scores[scoreIndex] || 0;
//         const dev_score = dev_scores[scoreIndex] || 0;
        
//         return {
//           ...student,
//           dsa_score,
//           dev_score,
//           weightage: (dsa_score + dev_score) / 2
//         };
//       });

//       setStudents(studentsWithScores);
//       setFilteredStudents(studentsWithScores);
      
//       // Extract unique interests from the API response
//       const interests = new Set();
//       studentsWithScores.forEach(student => {
//         student.interests?.forEach(interest => {
//           interests.add(interest.category);
//         });
//       });
//       setAvailableInterests(Array.from(interests));
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       setError(`Failed to fetch student data: ${error.message}`);
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (type) => {
//     setFilterType(type);
//     let sorted = [...students];

//     switch (type) {
//       case 'dsa':
//         sorted.sort((a, b) => b.dsa_score - a.dsa_score);
//         break;
//       case 'dev':
//         sorted.sort((a, b) => b.dev_score - a.dev_score);
//         break;
//       case 'weightage':
//         sorted.sort((a, b) => b.weightage - a.weightage);
//         break;
//       default:
//         break;
//     }

//     setFilteredStudents(sorted);
//   };

//   const handleInterestFilter = (interest) => {
//     setSelectedInterest(interest);
    
//     if (interest === 'all') {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(student => 
//         student.interests?.some(int => int.category === interest)
//       );
//       setFilteredStudents(filtered);
//     }
    
//     // Reapply sorting
//     handleFilterChange(filterType);
//   };

//   const calculateAverageWeightage = () => {
//     if (filteredStudents.length === 0) return 0;
//     const sum = filteredStudents.reduce((acc, student) => acc + student.weightage, 0);
//     return (sum / filteredStudents.length).toFixed(2);
//   };

//   const getRankColor = (rank) => {
//     if (rank === 1) return 'bg-yellow-400 text-yellow-900';
//     if (rank === 2) return 'bg-gray-300 text-gray-900';
//     if (rank === 3) return 'bg-amber-600 text-white';
//     return 'bg-blue-100 text-blue-900';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <div className="text-2xl font-semibold text-indigo-600">Loading Students...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
//           <button 
//             onClick={fetchStudents}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
//             <h1 className="text-4xl font-bold text-gray-800">Student Leaderboard</h1>
//           </div>
//           <p className="text-gray-600">Track and compare student performance across different metrics</p>
//         </div>

//         {/* Weightage Display */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                 <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
//                 Average Weightage
//               </h2>
//               <p className="text-gray-600 text-sm">Average of DSA and Dev Scores</p>
//             </div>
//             <div className="text-right">
//               <div className="text-5xl font-bold text-indigo-600">{calculateAverageWeightage()}</div>
//               <div className="text-sm text-gray-500 mt-2">out of 100</div>
//             </div>
//           </div>
//           <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
//             <div 
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
//               style={{ width: `${calculateAverageWeightage()}%` }}
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center mb-4">
//             <Filter className="w-5 h-5 mr-2 text-gray-600" />
//             <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//           </div>
          
//           {/* Score Type Filter */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sort By Score</label>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => handleFilterChange('weightage')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                   filterType === 'weightage'
//                     ? 'bg-indigo-600 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <TrendingUp className="w-4 h-4 mr-2" />
//                 Weightage
//               </button>
//               <button
//                 onClick={() => handleFilterChange('dsa')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                   filterType === 'dsa'
//                     ? 'bg-indigo-600 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <Database className="w-4 h-4 mr-2" />
//                 DSA Score
//               </button>
//               <button
//                 onClick={() => handleFilterChange('dev')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                   filterType === 'dev'
//                     ? 'bg-indigo-600 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <Code className="w-4 h-4 mr-2" />
//                 Dev Score
//               </button>
//             </div>
//           </div>

//           {/* Interest Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter By Interest</label>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => handleInterestFilter('all')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
//                   selectedInterest === 'all'
//                     ? 'bg-purple-600 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <Heart className="w-4 h-4 mr-2" />
//                 All
//               </button>
//               {availableInterests.map(interest => (
//                 <button
//                   key={interest}
//                   onClick={() => handleInterestFilter(interest)}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                     selectedInterest === interest
//                       ? 'bg-purple-600 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {interest}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Leaderboard Table */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold">USN</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold">DSA Score</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold">Dev Score</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold">Weightage</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold">Interests</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredStudents.map((student, index) => (
//                   <tr key={student.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankColor(index + 1)}`}>
//                         {index + 1}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{student.name}</div>
//                       <div className="text-sm text-gray-500">{student.email}</div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 font-mono">{student.usn}</td>
//                     <td className="px-6 py-4 text-center">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
//                         {student.dsa_score}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
//                         {student.dev_score}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
//                         {student.weightage.toFixed(2)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {student.interests?.slice(0, 2).map((interest, idx) => (
//                           <span 
//                             key={idx}
//                             className="inline-block px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded"
//                           >
//                             {interest.category}
//                           </span>
//                         ))}
//                         {student.interests?.length > 2 && (
//                           <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
//                             +{student.interests.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm text-gray-600 mb-1">Total Students</div>
//             <div className="text-2xl font-bold text-indigo-600">{filteredStudents.length}</div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm text-gray-600 mb-1">Avg DSA Score</div>
//             <div className="text-2xl font-bold text-blue-600">
//               {filteredStudents.length > 0 
//                 ? (filteredStudents.reduce((sum, s) => sum + s.dsa_score, 0) / filteredStudents.length).toFixed(2)
//                 : '0.00'
//               }
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-sm text-gray-600 mb-1">Avg Dev Score</div>
//             <div className="text-2xl font-bold text-green-600">
//               {filteredStudents.length > 0 
//                 ? (filteredStudents.reduce((sum, s) => sum + s.dev_score, 0) / filteredStudents.length).toFixed(2)
//                 : '0.00'
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useState, useEffect } from 'react';
import { Trophy, Filter, TrendingUp, Code, Database, Heart, Settings } from 'lucide-react';
import {getAllStudents} from '../../api/hod';

// Hardcoded scores for demonstration (you mentioned not to hardcode students, so keeping only scores)
const dsa_scores = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 100) + 1);
const dev_scores = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 100) + 1);

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterType, setFilterType] = useState('weightage');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [loading, setLoading] = useState(true);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [error, setError] = useState(null);
  
  // Weightage configuration
  const [dsaWeightage, setDsaWeightage] = useState(50);
  const [devWeightage, setDevWeightage] = useState(50);
  const [showWeightageConfig, setShowWeightageConfig] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Recalculate weightage when weights change
  useEffect(() => {
    if (students.length > 0) {
      const updatedStudents = students.map(student => ({
        ...student,
        weightage: ((student.dsa_score * dsaWeightage) + (student.dev_score * devWeightage)) / 100
      }));
      setStudents(updatedStudents);
      
      // Reapply current filters
      applyFilters(updatedStudents);
    }
  }, [dsaWeightage, devWeightage]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllStudents();
      const studentsData = response.data || response;
      
      if (!Array.isArray(studentsData)) {
        console.error('API response is not an array:', studentsData);
        throw new Error('Invalid data format received from API');
      }
      
      const studentsWithScores = studentsData.map(student => {
        const scoreIndex = (student.id - 1) % 100;
        const dsa_score = dsa_scores[scoreIndex] || 0;
        const dev_score = dev_scores[scoreIndex] || 0;
        
        return {
          ...student,
          dsa_score,
          dev_score,
          weightage: ((dsa_score * dsaWeightage) + (dev_score * devWeightage)) / 100
        };
      });

      setStudents(studentsWithScores);
      
      // Extract unique interests from the API response
      const interests = new Set();
      studentsWithScores.forEach(student => {
        if (student.interests && Array.isArray(student.interests)) {
          student.interests.forEach(interest => {
            if (interest && interest.category) {
              interests.add(interest.category);
            }
          });
        }
      });
      setAvailableInterests(Array.from(interests));
      
      // Apply initial filters
      applyFilters(studentsWithScores);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(`Failed to fetch student data: ${error.message}`);
      setLoading(false);
    }
  };

  const applyFilters = (studentsData = students) => {
    let filtered = [...studentsData];
    
    // Apply interest filter first
    if (selectedInterest !== 'all') {
      filtered = filtered.filter(student => 
        student.interests && Array.isArray(student.interests) && 
        student.interests.some(interest => 
          interest && interest.category && interest.category.toLowerCase() === selectedInterest.toLowerCase()
        )
      );
    }
    
    // Apply sorting
    switch (filterType) {
      case 'dsa':
        filtered.sort((a, b) => b.dsa_score - a.dsa_score);
        break;
      case 'dev':
        filtered.sort((a, b) => b.dev_score - a.dev_score);
        break;
      case 'weightage':
        filtered.sort((a, b) => b.weightage - a.weightage);
        break;
      default:
        break;
    }

    setFilteredStudents(filtered);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    applyFilters();
  };

  const handleInterestFilter = (interest) => {
    setSelectedInterest(interest);
    applyFilters();
  };

  const handleWeightageChange = (type, value) => {
    const numValue = parseInt(value);
    if (type === 'dsa') {
      setDsaWeightage(numValue);
      setDevWeightage(100 - numValue);
    } else {
      setDevWeightage(numValue);
      setDsaWeightage(100 - numValue);
    }
  };

  const calculateAverageWeightage = () => {
    if (filteredStudents.length === 0) return 0;
    const sum = filteredStudents.reduce((acc, student) => acc + student.weightage, 0);
    return (sum / filteredStudents.length).toFixed(2);
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-gray-300 text-gray-900';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-blue-100 text-blue-900';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-indigo-600">Loading Students...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
          <button 
            onClick={fetchStudents}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Student Leaderboard</h1>
          </div>
          <p className="text-gray-600">Track and compare student performance across different metrics</p>
        </div>

        {/* Weightage Configuration */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Settings className="w-6 h-6 mr-2 text-indigo-500" />
              <h2 className="text-xl font-semibold text-gray-800">Weightage Configuration</h2>
            </div>
            <button
              onClick={() => setShowWeightageConfig(!showWeightageConfig)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showWeightageConfig ? 'Hide' : 'Configure'}
            </button>
          </div>
          
          {showWeightageConfig && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DSA Score Weightage: {dsaWeightage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dsaWeightage}
                  onChange={(e) => handleWeightageChange('dsa', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dev Score Weightage: {devWeightage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={devWeightage}
                  onChange={(e) => handleWeightageChange('dev', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Average Weighted Score
              </h3>
              <p className="text-gray-600 text-sm">
                Based on {dsaWeightage}% DSA + {devWeightage}% Dev
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-indigo-600">{calculateAverageWeightage()}</div>
              <div className="text-sm text-gray-500 mt-2">out of 100</div>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${calculateAverageWeightage()}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          
          {/* Score Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By Score</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('weightage')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  filterType === 'weightage'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Weighted Score
              </button>
              <button
                onClick={() => handleFilterChange('dsa')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  filterType === 'dsa'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Database className="w-4 h-4 mr-2" />
                DSA Score
              </button>
              <button
                onClick={() => handleFilterChange('dev')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  filterType === 'dev'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Code className="w-4 h-4 mr-2" />
                Dev Score
              </button>
            </div>
          </div>

          {/* Interest Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter By Interest ({availableInterests.length} categories available)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleInterestFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  selectedInterest === 'all'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className="w-4 h-4 mr-2" />
                All ({students.length})
              </button>
              {availableInterests.map(interest => {
                const count = students.filter(student => 
                  student.interests && Array.isArray(student.interests) && 
                  student.interests.some(int => 
                    int && int.category && int.category.toLowerCase() === interest.toLowerCase()
                  )
                ).length;
                
                return (
                  <button
                    key={interest}
                    onClick={() => handleInterestFilter(interest)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedInterest === interest
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest} ({count})
                  </button>
                );
              })}
            </div>
            {availableInterests.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">No interest categories found in student data</p>
            )}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">USN</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">DSA Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Dev Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Weighted Score ({dsaWeightage}%+{devWeightage}%)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Interests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankColor(index + 1)}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-mono">{student.usn}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        {student.dsa_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        {student.dev_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                        {student.weightage.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.interests && Array.isArray(student.interests) && student.interests.slice(0, 2).map((interest, idx) => (
                          interest && interest.category && (
                            <span 
                              key={idx}
                              className="inline-block px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded"
                            >
                              {interest.category}
                            </span>
                          )
                        ))}
                        {student.interests && Array.isArray(student.interests) && student.interests.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                            +{student.interests.length - 2}
                          </span>
                        )}
                        {(!student.interests || !Array.isArray(student.interests) || student.interests.length === 0) && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                            No interests
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching the current filters.</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Filtered Students</div>
            <div className="text-2xl font-bold text-indigo-600">{filteredStudents.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Total Students</div>
            <div className="text-2xl font-bold text-gray-600">{students.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Avg DSA Score</div>
            <div className="text-2xl font-bold text-blue-600">
              {filteredStudents.length > 0 
                ? (filteredStudents.reduce((sum, s) => sum + s.dsa_score, 0) / filteredStudents.length).toFixed(2)
                : '0.00'
              }
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Avg Dev Score</div>
            <div className="text-2xl font-bold text-green-600">
              {filteredStudents.length > 0 
                ? (filteredStudents.reduce((sum, s) => sum + s.dev_score, 0) / filteredStudents.length).toFixed(2)
                : '0.00'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
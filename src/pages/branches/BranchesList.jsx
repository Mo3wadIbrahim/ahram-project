import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store, Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import { deleteBranch } from '../../redux/slices/branchesSlice';

export default function BranchesList() {
  const branches = useSelector(state => state.branches.data);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      dispatch(deleteBranch(id));
    }
  };

  const filteredBranches = branches.filter(branch => 
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Store className="w-6 h-6 text-emerald-600" /> Branches & Stores
        </h1>
        <Link to="/stores/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" /> Add Branch
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6 max-w-lg relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Search branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{branch.branchName}</h3>
                    <p className="text-sm text-gray-500">{branch.branchCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/stores/${branch.id}`} className="text-gray-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link to={`/stores/edit/${branch.id}`} className="text-gray-400 hover:text-emerald-600">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(branch.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    <strong>Address:</strong> {branch.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Hours:</strong> {branch.workTime}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {branch.coverageLocations?.slice(0, 3).map((loc, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        {loc}
                      </span>
                    ))}
                    {branch.coverageLocations?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{branch.coverageLocations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredBranches.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No branches found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

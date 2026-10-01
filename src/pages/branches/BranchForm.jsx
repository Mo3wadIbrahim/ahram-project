import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addBranch, updateBranch } from '../../redux/slices/branchesSlice';
import { ArrowLeft, Save } from 'lucide-react';

export default function BranchForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = Boolean(id);
  
  const existingBranch = useSelector(state => 
    isEdit ? state.branches.data.find(b => b.id === id) : null
  );

  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    address: '',
    coverageLocations: '',
    minimumOrder: '',
    workTime: '',
    deliveryFees: '',
    comments: '',
    lat: '',
    lng: ''
  });

  useEffect(() => {
    if (isEdit && existingBranch) {
      setFormData({
        ...existingBranch,
        coverageLocations: existingBranch.coverageLocations?.join(', ') || ''
      });
    }
  }, [isEdit, existingBranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'minimumOrder' || name === 'deliveryFees' || name === 'lat' || name === 'lng'
        ? (value === '' ? '' : Number(value)) 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      coverageLocations: formData.coverageLocations.split(',').map(s => s.trim()).filter(Boolean)
    };
    
    if (isEdit) {
      dispatch(updateBranch({ ...payload, id }));
    } else {
      dispatch(addBranch({ ...payload, id: Date.now().toString() }));
    }
    navigate('/stores');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/stores" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Branch' : 'Create New Branch'}
          </h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Branch Name</label>
              <input type="text" name="branchName" required value={formData.branchName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Branch Code</label>
              <input type="text" name="branchCode" required value={formData.branchCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Coverage Locations (Comma separated)</label>
              <input type="text" name="coverageLocations" placeholder="e.g. Downtown, West End, North Side" value={formData.coverageLocations} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Order ($)</label>
              <input type="number" step="0.01" min="0" name="minimumOrder" required value={formData.minimumOrder} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Fees ($)</label>
              <input type="number" step="0.01" min="0" name="deliveryFees" required value={formData.deliveryFees} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Work Time</label>
              <input type="text" name="workTime" placeholder="e.g. 10:00 AM - 12:00 AM" required value={formData.workTime} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude (for Map)</label>
              <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude (for Map)</label>
              <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Comments</label>
              <textarea name="comments" rows={3} value={formData.comments} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Link to="/stores" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" /> Save Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

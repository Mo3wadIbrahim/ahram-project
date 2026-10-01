import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addItem, updateItem } from '../../redux/slices/itemsSlice';
import { ArrowLeft, Save } from 'lucide-react';

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = Boolean(id);
  
  const existingItem = useSelector(state => 
    isEdit ? state.items.data.find(item => item.id === id) : null
  );

  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemPrice: '',
    alcoholPercentage: '',
    units: 'Bottle',
    stock: '',
    comments: ''
  });

  useEffect(() => {
    if (isEdit && existingItem) {
      setFormData(existingItem);
    }
  }, [isEdit, existingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'itemPrice' || name === 'alcoholPercentage' || name === 'stock' 
        ? (value === '' ? '' : Number(value)) 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateItem({ ...formData, id }));
    } else {
      dispatch(addItem({ ...formData, id: Date.now().toString() }));
    }
    navigate('/items');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/items" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Item' : 'Create New Item'}
          </h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Code</label>
              <input type="text" name="itemCode" required value={formData.itemCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name</label>
              <input type="text" name="itemName" required value={formData.itemName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input type="number" step="0.01" min="0" name="itemPrice" required value={formData.itemPrice} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alcohol %</label>
              <input type="number" step="0.1" min="0" max="100" name="alcoholPercentage" required value={formData.alcoholPercentage} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Units</label>
              <select name="units" value={formData.units} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="Bottle">Bottle</option>
                <option value="Can">Can</option>
                <option value="Carton">Carton</option>
                <option value="Keg">Keg</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" min="0" name="stock" required value={formData.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Comments</label>
              <textarea name="comments" rows={3} value={formData.comments} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Link to="/items" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

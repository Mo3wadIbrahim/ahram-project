import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, Store, AlertTriangle, Plus, MapPin } from 'lucide-react';

export default function Dashboard() {
  const items = useSelector(state => state.items.data);
  const branches = useSelector(state => state.branches.data);

  const outOfStock = items.filter(item => item.stock === 0).length;
  const coverageAreasCount = new Set(branches.flatMap(b => b.coverageLocations)).size;

  const stats = [
    { name: 'Total Items', value: items.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Out of Stock', value: outOfStock, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Total Branches', value: branches.length, icon: Store, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Coverage Areas', value: coverageAreasCount, icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-4">
          <Link to="/items/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Link>
          <Link to="/stores/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" /> Add Branch
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Items</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {items.slice(-5).reverse().map((item) => (
                <li key={item.id} className="py-4 flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.itemName}</p>
                    <p className="text-sm text-gray-500 truncate">{item.itemCode}</p>
                  </div>
                  <div>
                    <Link to={`/items/${item.id}`} className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Branches</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {branches.slice(-5).reverse().map((branch) => (
                <li key={branch.id} className="py-4 flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{branch.branchName}</p>
                    <p className="text-sm text-gray-500 truncate">{branch.address}</p>
                  </div>
                  <div>
                    <Link to={`/stores/${branch.id}`} className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

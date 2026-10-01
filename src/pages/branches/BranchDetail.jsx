import { useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Store } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function BranchDetail() {
  const { id } = useParams();
  const branch = useSelector(state => state.branches.data.find(b => b.id === id));

  if (!branch) {
    return <Navigate to="/stores" replace />;
  }

  const hasLocation = branch.lat && branch.lng;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/stores" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-600" /> Branch Details
          </h1>
        </div>
        <Link to={`/stores/edit/${branch.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Edit2 className="w-4 h-4 mr-2" /> Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {branch.branchName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Code: {branch.branchCode}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{branch.address}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Work Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{branch.workTime}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Minimum Order</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${Number(branch.minimumOrder).toFixed(2)}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Delivery Fees</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${Number(branch.deliveryFees).toFixed(2)}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Coverage Locations</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {branch.coverageLocations?.map((loc, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {loc}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Comments</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{branch.comments || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden h-[400px] md:h-auto md:min-h-[400px]">
          {hasLocation ? (
            <MapContainer center={[branch.lat, branch.lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[branch.lat, branch.lng]}>
                <Popup>
                  {branch.branchName}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400 p-6 text-center">
              No coordinates provided for this branch to display on the map.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Store } from 'lucide-react';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPage() {
  const branches = useSelector(state => state.branches.data);
  const defaultCenter = [30.0444, 31.2357]; // Default to Cairo

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Store className="w-6 h-6 text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-900">Branch Locations</h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow h-[600px] w-full">
        <MapContainer center={defaultCenter} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branches.map(branch => (
            branch.lat && branch.lng ? (
              <Marker key={branch.id} position={[branch.lat, branch.lng]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-lg">{branch.branchName}</h3>
                    <p className="text-sm text-gray-600">{branch.address}</p>
                    <p className="text-xs mt-1">Coverage: {branch.coverageLocations?.join(', ')}</p>
                  </div>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

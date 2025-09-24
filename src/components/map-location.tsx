export default function MapLocation({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <div>
      <h2>Map</h2>
      <ul>
        <li>Lat: {latitude}</li>
        <li>Lon: {longitude}</li>
      </ul>
    </div>
  );
}

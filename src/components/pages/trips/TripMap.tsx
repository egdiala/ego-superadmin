import React, { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import type { FetchedSingleTrip } from "@/types/trips";
import { errorToast } from "@/utils/createToast";
import { useReverseGeocode } from "@/services/hooks/queries";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface TripMapProps {
    data?: FetchedSingleTrip
}

export const TripMap: React.FC<TripMapProps> = ({ data }) => {

    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    const pickupLocation = useMemo(() => { return data?.location?.origin?.coordinates }, [data?.location?.origin?.coordinates]); // Example coordinates for pickup
    const destinationLocation: any = useMemo(() => {
        if ((data?.ride_data?.drop_off_data?.longitude === undefined) && (data?.ride_data?.drop_off_data?.latitude === undefined)) {
            return data?.location?.destination?.coordinates
        }
        return [data?.ride_data?.drop_off_data?.longitude, data?.ride_data?.drop_off_data?.latitude]
    }, [data?.location?.destination?.coordinates, data?.ride_data?.drop_off_data?.latitude, data?.ride_data?.drop_off_data?.longitude]); // Example coordinates for destination

    const { data: fetchedAddress } = useReverseGeocode({ latlng: `${destinationLocation[1]},${destinationLocation[0]}` })

    useEffect(() => {
        if (map.current) { return; } // initialize map only once
        
        // Create Map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: pickupLocation,
            zoom: 13
        });

        const getRoute = async () => {
            if (!pickupLocation || !destinationLocation) {return;}

            const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocation[0]},${pickupLocation[1]};${destinationLocation[0]},${destinationLocation[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

            try {
                const response = await axios.get(directionsUrl);
                const routeData = response.data.routes[0].geometry.coordinates;

                // Add route source and layer to the map
                map.current.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: routeData
                        }
                    }
                });

                map.current.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    paint: {
                        "line-color": "#55B648",
                        "line-width": 3
                    }
                });

                // Fit the map bounds to include both pickup and destination
                const bounds = new mapboxgl.LngLatBounds();
                bounds.extend(pickupLocation);
                bounds.extend(destinationLocation as [number, number]);
                map.current.fitBounds(bounds, { padding: 50 }); // Adjust the padding as needed

                // Add custom green marker for pickup location
                const pickupMarker = document.createElement("div");
                pickupMarker.style.backgroundColor = "#55B648";
                pickupMarker.style.width = "13px";
                pickupMarker.style.height = "13px";
                pickupMarker.style.border = "2px solid";
                pickupMarker.style.borderColor = "white";
                pickupMarker.style.borderRadius = "50%";

                const pickupPopup = new mapboxgl.Popup({ offset: 25 }).setText(data?.ride_data?.start_address ?? "");

                new mapboxgl.Marker(pickupMarker)
                    .setLngLat(pickupLocation)
                    .setPopup(pickupPopup) // Attach popup to the marker
                    .addTo(map.current);

                // Add custom red marker for destination location
                const destinationMarker = document.createElement("div");
                destinationMarker.style.backgroundColor = "#DD2418";
                destinationMarker.style.width = "13px";
                destinationMarker.style.height = "13px";
                destinationMarker.style.border = "2px solid";
                destinationMarker.style.borderColor = "white";
                destinationMarker.style.borderRadius = "50%";

                const destinationPopup = new mapboxgl.Popup({ offset: 25 }).setText(fetchedAddress?.results[0]?.formatted_address ?? "");

                new mapboxgl.Marker(destinationMarker)
                    .setLngLat(destinationLocation as [number, number])
                    .setPopup(destinationPopup) // Attach popup to the marker
                    .addTo(map.current);
            } catch (error) {
                errorToast({ message: "Error fetching route from Directions API" });
            }
        };

        map.current.on("load", getRoute);
    },[data?.ride_data.end_address, data?.ride_data?.start_address, destinationLocation, fetchedAddress?.results, pickupLocation]);

    return (
        <div className="flex relative justify-center items-center overflow-hidden rounded-lg h-52 w-full">
            <div ref={mapContainer} id="tripMapBox" className="flex h-52 w-full">
            </div>
            <div className="group bg-white absolute grid gap-2 top-2 left-2 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="size-1.5 bg-[#55B648] rounded-full" />
                    <span className="text-xs text-grey-dark-2 group-hover:w-full transform transition-transform duration-200 ease-out w-60 line-clamp-1">{data?.ride_data?.start_address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-1.5 bg-semantics-error rounded-full" />
                    <span className="text-xs text-grey-dark-2 group-hover:w-full transform transition-transform duration-200 ease-out w-60 line-clamp-1">{fetchedAddress?.results[0]?.formatted_address}</span>
                </div>
            </div>
        </div>
    );
};
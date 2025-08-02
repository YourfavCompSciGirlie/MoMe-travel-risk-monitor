import { supabase } from '../config/db';
import { GeoJSONPoint } from '../types/shared';
import { SavedRoute, Trip} from '../types/route';

export const createSavedRoute = async (routeData: {
  userId: string;
  name: string;
  startLocation: GeoJSONPoint;
  endLocation: GeoJSONPoint;
  routePath?: any; // e.g., polyline data
}): Promise<SavedRoute> => {
  const { data, error } = await supabase
    .from('saved_routes')
    .insert({
      user_id: routeData.userId,
      name: routeData.name,
      start_location: routeData.startLocation,
      end_location: routeData.endLocation,
      route_path: routeData.routePath,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating saved route:', error);
    throw new Error('Could not create saved route.');
  }

  return data;
};

export const getUserSavedRoutes = async (userId: string): Promise<SavedRoute[]> => {
  const { data, error } = await supabase
    .from('saved_routes')
    .select('*')
    .eq('user_id', userId)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching user saved routes:', error);
    throw new Error('Could not fetch saved routes.');
  }

  return data;
};

export const createTrip = async (tripData: {
    userId: string;
    vehicleId: number;
    savedRouteId?: number;
    plannedRoutePath?: any;
}): Promise<Trip> => {
    const { data, error } = await supabase
        .from('trips')
        .insert({
            user_id: tripData.userId,
            vehicle_id: tripData.vehicleId,
            saved_route_id: tripData.savedRouteId,
            planned_route_path: tripData.plannedRoutePath,
            start_time: new Date().toISOString(), // Set start time to now
        })
        .select()
        .single();
    
    if (error) {
        console.error('Error creating trip:', error);
        throw new Error('Could not log new trip.');
    }

    return data;
};

export const getUserTrips = async (userId: string): Promise<Trip[]> => {
    const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', userId)
        .order('start_time', { ascending: false });

    if (error) {
        console.error('Error fetching user trips:', error);
        throw new Error('Could not fetch user trips.');
    }

    return data;
};

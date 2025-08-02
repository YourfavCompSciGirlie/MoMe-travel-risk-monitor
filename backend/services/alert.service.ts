import { supabase } from '../config/db';
import { AlertStatus, AlertType, GeoJSONPoint } from '../types/shared';
import { Alert }  from '../types/alert';
import { AlertContent } from '../types/jsonb';

export const createAlert = async (alertData: {
  userId: number;
  tripId?: number;
  type: AlertType;
  status?: AlertStatus;
  content: AlertContent;
  location: GeoJSONPoint;
}): Promise<void> => {
  const { error } = await supabase.rpc('create_alert_with_location', {
    p_user_id: alertData.userId,
    p_trip_id: alertData.tripId,
    p_type: alertData.type,
    p_status: alertData.status || 'sent', // Default to 'sent' if not provided
    p_content: alertData.content,
    p_location: alertData.location,
  });

  if (error) {
    console.error('Error creating alert:', error);
    throw new Error('Could not create alert in the database.');
  }
};

export const createWeatherAlertForTrip = async (
  userId: number,
  tripId: number,
  content: AlertContent,
  location: GeoJSONPoint
): Promise<void> => {
  return createAlert({
    userId,
    tripId,
    type: 'weather',
    content,
    location,
  });
};

export const getUserAlerts = async (userId: number): Promise<Alert[]> => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user alerts:', error);
    throw new Error('Could not fetch user alerts.');
  }

  return data;
};

export const updateAlertStatus = async (
  alertId: number,
  status: 'acknowledged' | 'dismissed'
): Promise<Alert> => {
  const { data, error } = await supabase
    .from('alerts')
    .update({ status })
    .eq('id', alertId)
    .select()
    .single(); // Use .single() to get a single object back, not an array

  if (error) {
    console.error('Error updating alert status:', error);
    throw new Error('Could not update alert status.');
  }

  return data;
};

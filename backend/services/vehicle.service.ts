// services/vehicle.service.ts

import pool from '../config/db'; 

export interface Vehicle {
  id: string;
  user_id: string;
  type: string;
  nickname?: string;
  hail_sensitive: boolean;
  wind_sensitive: boolean;
  created_at: Date;
}

/**
 * Create a new vehicle for a user
 */
export const createVehicle = async (
  userId: string,
  make: string,
  model: string,
  number_plate: string,
  year: number,
  type: string,
  nickname: string,
  hailSensitive: boolean,
  windSensitive: boolean
): Promise<Vehicle> => {
  const result = await pool.query(
    `INSERT INTO vehicles (
       user_id, make, model, number_plate, year,
       type, nickname, hail_sensitive, wind_sensitive
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      userId, make, model, number_plate, year,
      type, nickname, hailSensitive, windSensitive
    ]
  );

  return result.rows[0];
};

/**
 * Get all vehicles for a user
 */
export const getVehiclesByUser = async (userId: string): Promise<Vehicle[]> => {
  const result = await pool.query(
    `SELECT * FROM vehicles WHERE user_id = $1`,
    [userId]
  );

  return result.rows;
};

/**
 * Update an existing vehicle
 */
export const updateVehicle = async (
  vehicleId: string,
  updates: {
    make?: string;
    model?: string;
    number_plate?: string;
    year?: number;
    type?: string;
    nickname?: string;
    hail_sensitive?: boolean;
    wind_sensitive?: boolean;
  }
): Promise<Vehicle | null> => {
  const {
    make, model, number_plate, year,
    type, nickname, hail_sensitive, wind_sensitive
  } = updates;

  const result = await pool.query(
    `UPDATE vehicles SET
       make = COALESCE($1, make),
       model = COALESCE($2, model),
       number_plate = COALESCE($3, number_plate),
       year = COALESCE($4, year),
       type = COALESCE($5, type),
       nickname = COALESCE($6, nickname),
       hail_sensitive = COALESCE($7, hail_sensitive),
       wind_sensitive = COALESCE($8, wind_sensitive)
     WHERE id = $9
     RETURNING *`,
    [
      make, model, number_plate, year,
      type, nickname, hail_sensitive, wind_sensitive,
      vehicleId
    ]
  );

  return result.rows[0] || null;
};

/**
 * Delete a vehicle
 */
export const deleteVehicle = async (vehicleId: string): Promise<boolean> => {
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id = $1`,
    [vehicleId]
  );

  return (result.rowCount ?? 0) > 0;
};

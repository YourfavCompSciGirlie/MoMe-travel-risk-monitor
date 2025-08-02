import { Request, Response } from "express";
import { getUserDashboardStats } from "../services/dashboard.service";

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    // Assumes an authentication middleware has run and attached the user's ID to the request.
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    // Call the service function to get the stats.
    const stats = await getUserDashboardStats(userId);

    return res.status(200).json(stats);
  } catch (err) {
    console.error("Dashboard summary error:", err);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

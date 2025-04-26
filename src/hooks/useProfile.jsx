import { useState, useEffect } from "react";
import { fetchProfile } from "../api";

/**
 * Custom hook to manage the user's profile data.
 * Fetches the user's profile from the API and provides state for loading, error, and the profile itself.
 *
 * @returns {Object} An object containing:
 * - `profile` {Object|null} - The user's profile data or `null` if not loaded.
 * - `loading` {boolean} - Indicates whether the profile is currently being loaded.
 * - `error` {string|null} - An error message if the profile failed to load, or `null` if no error occurred.
 * - `getProfile` {Function} - A function to manually fetch the user's profile.
 *
 * @example
 * const { profile, loading, error, getProfile } = useProfile();
 *
 * useEffect(() => {
 *   if (!profile) {
 *     getProfile();
 *   }
 * }, [profile]);
 */
export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const profileData = await fetchProfile();
      setProfile(profileData);
    } catch (error) {
      setError(
        `Failed to load your account. Please try again later. ${error.message}`,
      );
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { profile, loading, error, getProfile };
}

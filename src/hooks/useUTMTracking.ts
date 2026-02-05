 /**
  * UTM Parameter Tracking Hook
  * Captures and persists UTM parameters via cookies
  * Auto-populated on all form submissions
  */
 
 import { useEffect, useState } from "react";
 
 export interface UTMParams {
   utm_source: string | null;
   utm_medium: string | null;
   utm_campaign: string | null;
   utm_term: string | null;
   utm_content: string | null;
 }
 
 const UTM_COOKIE_NAME = "utm_params";
 const UTM_COOKIE_EXPIRY_DAYS = 30;
 
 /**
  * Parse UTM parameters from URL
  */
 function getUTMFromURL(): UTMParams {
   if (typeof window === "undefined") {
     return {
       utm_source: null,
       utm_medium: null,
       utm_campaign: null,
       utm_term: null,
       utm_content: null,
     };
   }
 
   const params = new URLSearchParams(window.location.search);
   return {
     utm_source: params.get("utm_source"),
     utm_medium: params.get("utm_medium"),
     utm_campaign: params.get("utm_campaign"),
     utm_term: params.get("utm_term"),
     utm_content: params.get("utm_content"),
   };
 }
 
 /**
  * Get UTM params from cookie
  */
 function getUTMFromCookie(): UTMParams | null {
   if (typeof document === "undefined") return null;
 
   const cookies = document.cookie.split(";");
   for (const cookie of cookies) {
     const [name, value] = cookie.trim().split("=");
     if (name === UTM_COOKIE_NAME && value) {
       try {
         return JSON.parse(decodeURIComponent(value));
       } catch {
         return null;
       }
     }
   }
   return null;
 }
 
 /**
  * Save UTM params to cookie
  */
 function saveUTMToCookie(params: UTMParams): void {
   if (typeof document === "undefined") return;
 
   // Only save if there's at least one UTM param
   const hasUTM = Object.values(params).some((v) => v !== null);
   if (!hasUTM) return;
 
   const expires = new Date();
   expires.setDate(expires.getDate() + UTM_COOKIE_EXPIRY_DAYS);
 
   document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(
     JSON.stringify(params)
   )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
 }
 
 /**
  * Hook to track and retrieve UTM parameters
  * - Captures UTMs from URL on first visit
  * - Persists in cookie for 30 days
  * - Returns params for form submissions
  */
 export function useUTMTracking(): UTMParams {
   const [utmParams, setUtmParams] = useState<UTMParams>({
     utm_source: null,
     utm_medium: null,
     utm_campaign: null,
     utm_term: null,
     utm_content: null,
   });
 
   useEffect(() => {
     // First, check URL for new UTM params
     const urlParams = getUTMFromURL();
     const hasUrlParams = Object.values(urlParams).some((v) => v !== null);
 
     if (hasUrlParams) {
       // New UTM params in URL - save and use these
       saveUTMToCookie(urlParams);
       setUtmParams(urlParams);
     } else {
       // No URL params - check cookie for existing ones
       const cookieParams = getUTMFromCookie();
       if (cookieParams) {
         setUtmParams(cookieParams);
       }
     }
   }, []);
 
   return utmParams;
 }
 
 /**
  * Get UTM params synchronously (for non-React contexts)
  */
 export function getUTMParams(): UTMParams {
   const urlParams = getUTMFromURL();
   const hasUrlParams = Object.values(urlParams).some((v) => v !== null);
 
   if (hasUrlParams) {
     return urlParams;
   }
 
   return (
     getUTMFromCookie() || {
       utm_source: null,
       utm_medium: null,
       utm_campaign: null,
       utm_term: null,
       utm_content: null,
     }
   );
 }
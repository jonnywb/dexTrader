import type { Session } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import supabase from "./supabase";

export const createSessionFromUrl = async (url: string): Promise<Session | null> => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    //ADD ERROR HANDLING
    console.log(errorCode);
    throw errorCode;
  }

  const { access_token, refresh_token } = params;

  if (!access_token) return null;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    console.log(error);
    throw error; //ADD ERROR HANDLING
  }

  return data.session;
};

import { supabase } from "@/integrations/supabase/client";

// Le suivi ne doit jamais bloquer la navigation ni casser la page :
// toutes les erreurs sont silencieusement ignorées.

export function trackCtaClick(location: string) {
  try {
    void supabase
      .from("cta_clicks")
      .insert({
        location: location.slice(0, 100),
        path: window.location.pathname.slice(0, 255),
        referrer: document.referrer ? document.referrer.slice(0, 500) : null,
        user_agent: navigator.userAgent.slice(0, 500),
      })
      .then(() => undefined);
  } catch {
    // ignore
  }
}

export type AuditRequestPayload = {
  name: string;
  email: string;
  agency: string;
  website?: string | null;
  phone?: string | null;
  process: string;
  message: string;
};

export async function saveAuditRequest(payload: AuditRequestPayload) {
  try {
    await supabase.from("audit_requests").insert({
      name: payload.name.slice(0, 100),
      email: payload.email.slice(0, 255),
      agency: payload.agency.slice(0, 100),
      website: payload.website ? payload.website.slice(0, 255) : null,
      phone: payload.phone ? payload.phone.slice(0, 50) : null,
      process: payload.process.slice(0, 100),
      message: payload.message.slice(0, 1000),
    });
  } catch {
    // ignore
  }
}

import { useEffect, useState } from "react";
import { getInvitation } from "../services/invitation.service.js";

// Loads a published invitation by slug.
// `state.slug` records which slug the result belongs to, so a new slug
// shows "loading" without resetting state synchronously inside the effect.
export function useInvitation(slug) {
  const [state, setState] = useState({ slug: null, invitation: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    getInvitation(slug, { signal: controller.signal })
      .then((invitation) => setState({ slug, invitation, error: null }))
      .catch((error) => {
        if (!controller.signal.aborted) setState({ slug, invitation: null, error });
      });

    return () => controller.abort();
  }, [slug]);

  const loading = state.slug !== slug;
  return {
    loading,
    invitation: loading ? null : state.invitation,
    error: loading ? null : state.error,
  };
}

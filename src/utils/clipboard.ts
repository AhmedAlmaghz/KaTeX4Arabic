/**
 * ════════════════════════════════════════════════════════════════
 *  clipboard.ts
 *  Cross-browser clipboard helper.
 *
 *  Uses the modern async Clipboard API when available and falls
 *  back to a hidden-textarea + execCommand path for older
 *  browsers / non-secure contexts.
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Copy text to the clipboard.
 * Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Modern path: async Clipboard API (requires secure context).
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path — some browsers reject the
      // async API when the document is not focused.
    }
  }

  // Legacy path: hidden textarea + execCommand.
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    // Keep the textarea off-screen and invisible.
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    ta.style.opacity = '0';
    ta.setAttribute('readonly', '');
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

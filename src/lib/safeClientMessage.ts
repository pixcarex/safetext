/** Remove secrets from strings before sending to the browser. */
export function sanitizeForClient(s: string, maxLen = 500): string {
  let out = s.replace(/\bsk-[a-zA-Z0-9]{20,}\b/g, "[API key redacted]");
  out = out.replace(/Bearer\s+[^\s'"]+/gi, "Bearer [redacted]");
  out = out.replace(/"api_key"\s*:\s*"[^"]+"/gi, '"api_key":"[redacted]"');
  return out.slice(0, maxLen);
}

export function friendlyHintFromLlmError(message: string): string {
  const m = message;
  if (/401|403|invalid_api_key|Incorrect API key|invalid x-api-key|Authentication/i.test(m)) {
    return "Your API key was rejected. Check OPENAI_API_KEY in .env.local or Vercel env vars, then restart or redeploy.";
  }
  if (/429|rate limit|Rate limit|too many requests/i.test(m)) {
    return "The AI service rate-limited this request. Wait a minute and try again.";
  }
  if (/insufficient_quota|billing|payment|exceeded your current quota/i.test(m)) {
    return "OpenAI billing or quota issue. Add credits or check your plan at platform.openai.com.";
  }
  if (/404|not found/i.test(m) && /LLM request failed/i.test(m)) {
    return "Wrong API URL (HTTP 404). Use OPENAI_BASE_URL=https://api.openai.com/v1 or leave it unset.";
  }
  if (/fetch failed|ENOTFOUND|ECONNREFUSED|getaddrinfo|network/i.test(m)) {
    return "Network error talking to the AI service. Check internet, firewall, and OPENAI_BASE_URL.";
  }
  if (/model.*not found|does not exist|invalid_model|is not supported|The model/i.test(m)) {
    return "Model name not accepted. Set OPENAI_MODEL=gpt-4o-mini (or a model your provider lists).";
  }
  if (/response_format|json_object|JSON mode/i.test(m)) {
    return "This gateway may not support JSON mode. Set OPENAI_JSON_OBJECT_MODE=false in env and redeploy.";
  }
  if (/Could not parse model JSON/i.test(m)) {
    return "The model did not return valid JSON. Try again, or switch OPENAI_MODEL to gpt-4o-mini.";
  }
  return "See technical detail below. If you use a proxy, confirm OPENAI_BASE_URL and that it supports OpenAI-style /v1/chat/completions.";
}

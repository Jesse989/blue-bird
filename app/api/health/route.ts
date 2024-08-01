import { HealthApi, HealthApiApiKeys } from '@nft-portal/portal-ts';

export async function GET() {
  // Instantiate the API
  const api = new HealthApi();

  // Set the API key. You can get your API key from the Portal settings page.
  api.setApiKey(
    HealthApiApiKeys.apiKey,
    'psk_iPhnssDHKCLFONeCHqaDrDMtj9MCun1y',
  );

  // Call the API
  const res = await api.ping();

  if (res.response.statusCode !== 200) {
    throw new Error('Failed to get HealthApi');
  }

  console.log(res.body);
  return Response.json(res.body);
}

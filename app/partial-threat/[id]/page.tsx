import { FormApi, FormApiApiKeys } from '@nft-portal/portal-ts';

export default async function PartialThreat({
  params: { id },
}: {
  params: { id: string };
}) {
  // Instantiate the API
  const api = new FormApi();

  // Set the API key. You can get your API key from the Portal settings page.
  api.setApiKey(FormApiApiKeys.apiKey, process.env.PORTAL_API_KEY!);

  // Call the API
  const res = await api.getForm(id);

  if (res.response.statusCode !== 200) {
    throw new Error('Failed to get FormApi');
  }

  console.log(res.body);
  return (
    <>
      <p>Partial Threat {res.body.title}</p>
      <pre>{JSON.stringify(res.body.data, null, 2)}</pre>
    </>
  );
}

import {GitHub} from '@actions/github/lib/utils';

import {Meta} from '@/lib/meta';

export async function getLabels(
  octokit: InstanceType<typeof GitHub>,
  meta: Meta
): Promise<string[]> {
  const labels = await octokit.rest.issues.listLabelsOnIssue({
    ...meta,
  });

  if (labels.status !== 200) {
    throw new Error('Failed to get labels');
  }

  return labels.data.map(label => label.name);
}

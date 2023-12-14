import * as core from '@actions/core';
import * as github from '@actions/github';

import {getAssignedLabels as getIssueLabels} from '@/lib/github';
import {
  filterMappingByLabels,
  getMessage,
  getMeta,
  getRecords,
} from '@/lib/helpers';

export async function run(): Promise<void> {
  try {
    const token = core.getInput('token');
    const mapping = core.getInput('mapping');
    const message = core.getInput('message');

    const octokit = github.getOctokit(token);
    const payload = github.context.payload;

    const meta = getMeta(payload);
    const records = getRecords(mapping);
    const labels = Object.keys(records);

    const issueLabels = await getIssueLabels(octokit, meta);
    const mappedLabels = labels.filter(label => issueLabels.includes(label));
    const receipients = filterMappingByLabels(records, mappedLabels);

    if (!issueLabels.some(label => labels.includes(label))) {
      core.info(`No mapped labels found for issue ${meta.issue_number}`);
      return;
    }

    await octokit.rest.issues.createComment({
      ...meta,
      body: getMessage(message, {
        receipients,
        labels: mappedLabels,
      }),
    });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

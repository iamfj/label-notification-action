import * as core from '@actions/core';
import * as github from '@actions/github';

import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from '@/lib/comment';
import {getLabels} from '@/lib/label';
import {getMeta} from '@/lib/meta';
import {parseMappingInput} from '@/lib/parser';
import {useTemplate} from '@/lib/template';

export async function run(): Promise<void> {
  try {
    const token = core.getInput('token');
    const mappingInput = core.getInput('mapping');
    const mapping = parseMappingInput(mappingInput);

    const octokit = github.getOctokit(token);
    const payload = github.context.payload;
    const meta = getMeta(payload);

    const issueLabels = await getLabels(octokit, meta);
    const filteredLabels = mapping.filter(issueLabels);

    // Check if there are any labels to notify
    if (filteredLabels.length === 0) {
      const comment = await getComment(octokit, meta);
      if (comment) {
        await deleteComment(octokit, meta, comment);
      }

      core.info('No labels to notify');
      return;
    }

    // Join messages
    const message = filteredLabels
      .map(({label, recipients, message}) => {
        return useTemplate(
          {
            label,
            recipients: recipients.join(', '),
          },
          message
        );
      })
      .join('\n\n---\n\n');

    // Create comment
    const comment = await getComment(octokit, meta);
    if (comment) {
      await updateComment(octokit, meta, comment, message);
    } else {
      await createComment(octokit, meta, message);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

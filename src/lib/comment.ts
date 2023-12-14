import {GitHub} from '@actions/github/lib/utils';

import {Meta} from '@/lib/meta';

const identifier = '<!-- GitHub Label Notifier -->';

export async function getComment(
  octokit: InstanceType<typeof GitHub>,
  meta: Meta
) {
  const comments = await octokit.rest.issues.listComments(meta);
  return comments.data.find(comment => comment?.body?.includes(identifier));
}

export async function createComment(
  octokit: InstanceType<typeof GitHub>,
  meta: Meta,
  message: string
) {
  await octokit.rest.issues.createComment({
    ...meta,
    body: `${message}\n\n${identifier}`,
  });
}

export async function updateComment(
  octokit: InstanceType<typeof GitHub>,
  meta: Meta,
  comment: {id: number},
  message: string
) {
  await octokit.rest.issues.updateComment({
    ...meta,
    comment_id: comment.id,
    body: `${message}\n\n${identifier}`,
  });
}

export async function deleteComment(
  octokit: InstanceType<typeof GitHub>,
  meta: Meta,
  comment: {id: number}
) {
  await octokit.rest.issues.deleteComment({
    ...meta,
    comment_id: comment.id,
  });
}

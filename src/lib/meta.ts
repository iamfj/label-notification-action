import * as github from '@actions/github';
import {WebhookPayload} from '@actions/github/lib/interfaces';

export type Meta = {
  owner: string;
  repo: string;
  issue_number: number;
};

type Payload = Partial<
  Pick<WebhookPayload, 'issue' | 'pull_request' | 'number'>
>;

export function getMeta(payload: Payload): Meta {
  const {owner, repo} = github.context.repo;
  const {issue, pull_request} = payload;
  const issue_number = (issue || pull_request || payload).number;

  return {
    owner,
    repo,
    issue_number,
  };
}

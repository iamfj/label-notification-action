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
  const {repo} = github.context.repo;
  const {issue, pull_request} = payload;
  const issue_number = (issue || pull_request || payload).number;

  return {
    owner: 'GitHub Notifier',
    repo,
    issue_number,
  };
}

export function getRecords(content: string): Record<string, string[]> {
  const mapping: Record<string, string[]> = {};
  const regex = /^(.*?)=@((?:@\w+[\s]*)+)$/gm;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const label = match[1].trim();
    const users = match[2].trim().split(/\s+/);
    mapping[label] = users;
  }

  return mapping;
}

export function getMessage(
  template: string,
  variables: Record<string, string[]>
): string {
  return template.replace(/{(\w+)}/g, (match, key) => {
    if (typeof variables[key] !== 'undefined') {
      return variables[key].join(', ');
    }
    return match;
  });
}

export function filterMappingByLabels(
  map: Record<string, string[]>,
  labels: string[]
): string[] {
  const filteredValues = labels.reduce((accumulator, label) => {
    if (map[label]) {
      accumulator.push(...map[label]);
    }
    return accumulator;
  }, [] as string[]);

  return Array.from(new Set(filteredValues));
}

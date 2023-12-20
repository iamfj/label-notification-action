import {useTemplate} from '@/lib/template';

describe('useTemplate()', () => {
  it.each([
    [
      'with one replaced variable',
      {name: 'world'},
      'Hello !{{ name }}!',
      'Hello world!',
    ],
    [
      'with two replaced variables',
      {user: 'Alice', action: 'created'},
      '!{{ user }} has !{{ action }} a post.',
      'Alice has created a post.',
    ],
    ['with no variables', {}, 'No variables here.', 'No variables here.'],
    [
      'with variables but no replacements',
      {missing: 'value'},
      'This !{{ notfound }} variable is missing.',
      'This !{{ notfound }} variable is missing.',
    ],
    [
      'with explination mark before variable',
      {greeting: 'Hi', name: 'Bob'},
      'Hey!!{{ greeting }}, !{{ name }}!',
      'Hey!Hi, Bob!',
    ],
    [
      'with default template and no replacements',
      {name: 'world'},
      undefined,
      'Heads up !{{ recipients }} - the "!{{ label }}" label was applied to this issue.',
    ],
    [
      'with default template and no variables',
      {},
      undefined,
      'Heads up !{{ recipients }} - the "!{{ label }}" label was applied to this issue.',
    ],
    [
      'with default template',
      {recipients: 'Alice', label: 'bug'},
      undefined,
      'Heads up Alice - the "bug" label was applied to this issue.',
    ],
  ])(
    'should replace variables correctly %s',
    (
      _: string,
      variables: Record<string, string>,
      template: string | undefined,
      expectedOutput: string
    ) => {
      expect(useTemplate(variables, template)).toBe(expectedOutput);
    }
  );
});

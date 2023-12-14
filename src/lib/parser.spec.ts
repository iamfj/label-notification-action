import {parseMappingInput} from '@/lib/parser';

describe('parseMappingInput()', () => {
  it('should throw invalid yaml error', () => {
    const exp = expect(() => parseMappingInput('foo: bar: foo'));
    exp.toThrow(/Given mapping is not valid yaml/);
  });

  it.each([
    [
      'with object',
      'foo: bar',
      [
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          message: 'Expected array, received object',
        },
      ],
    ],
    [
      'with string',
      'foo',
      [
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'string',
          message: 'Expected array, received string',
        },
      ],
    ],
    [
      'with empty array',
      '[]',
      [
        {
          code: 'too_small',
          minimum: 1,
          type: 'array',
          inclusive: true,
          exact: false,
          message: 'Mapping must have at least one entry',
        },
      ],
    ],
    [
      'with empty object',
      '{}',
      [
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          message: 'Expected array, received object',
        },
      ],
    ],
    [
      'with invalid username',
      `
      - label: foo
        recipients:
          - invalid_username
      `,
      [
        {
          code: 'invalid_string',
          validation: 'regex',
          message: 'Recipient must be a valid GitHub username or team',
        },
      ],
    ],
    [
      'with invalid team',
      `
      - label: foo
        recipients:
          - '@validUser'
          - '@invalid/@team'
      `,
      [
        {
          code: 'invalid_string',
          validation: 'regex',
          message: 'Recipient must be a valid GitHub username or team',
        },
      ],
    ],
    [
      'with no recipient',
      `
      - label: foo
        recipients: []
      `,
      [
        {
          code: 'too_small',
          minimum: 1,
          type: 'array',
          inclusive: true,
          exact: false,
          message: 'Mapping must have at least one recipient',
        },
      ],
    ],
    [
      'with missing label',
      `
      - receipients:
          - '@validUser'
      `,
      [
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          message: 'Label is required',
        },
      ],
    ],
  ])(
    'should throw an unexpected schema error %s',
    (
      _: string,
      input: string,
      expectedIssues: Record<string, string | number | boolean>[]
    ) => {
      const exp = expect(() => parseMappingInput(input));

      exp.toThrow(/Unexpected schema/);
      for (const issue of expectedIssues) {
        for (const [key, value] of Object.entries(issue)) {
          if (typeof value === 'string') {
            exp.toThrow(new RegExp(`"${key}": "${value}"`));
          } else if (typeof value === 'number' || typeof value === 'boolean') {
            exp.toThrow(new RegExp(`"${key}": ${value}`));
          }
        }
      }
    }
  );

  it('should return valid mapping', () => {
    const mapping = parseMappingInput(`
      - label: foo
        recipients:
          - '@validUser'
          - '@validTeam'
        message: 'foo'
      - label: bar
        recipients:
          - '@validUser'
          - '@validTeam'
        message: 'bar'
    `);

    expect(mapping.data).toEqual([
      {
        label: 'foo',
        recipients: ['@validUser', '@validTeam'],
        message: 'foo',
      },
      {
        label: 'bar',
        recipients: ['@validUser', '@validTeam'],
        message: 'bar',
      },
    ]);

    expect(mapping.labels).toEqual(['foo', 'bar']);
  });
});

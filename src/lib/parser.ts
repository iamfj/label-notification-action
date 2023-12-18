import {parse} from 'yaml';
import {z} from 'zod';

type MappingResult = {
  data: z.infer<typeof MappingSchema>;
  labels: string[];
  filter: (label: string[]) => z.infer<typeof MappingSchema>;
};

const MappingSchema = z
  .array(
    z.object({
      label: z.string({
        required_error: 'Label is required',
        invalid_type_error: 'Label must be a string',
      }),
      recipients: z
        .array(
          z
            .string({
              required_error: 'Recipient is required',
              invalid_type_error: 'Recipient must be a string',
            })
            .regex(
              /^@([a-zA-Z0-9][a-zA-Z0-9_-]{0,38})(\/[a-zA-Z0-9][a-zA-Z0-9_-]{0,38})?$/,
              {
                message: 'Recipient must be a valid GitHub username or team',
              }
            )
        )
        .min(1, {
          message: 'Mapping must have at least one recipient',
        }),
      message: z
        .string({
          invalid_type_error: 'Message must be a string',
        })
        .optional(),
    })
  )
  .min(1, {
    message: 'Mapping must have at least one entry',
  });

export function parseMappingInput(data: string): MappingResult {
  let mapping;
  try {
    mapping = parse(data);
  } catch (e) {
    throw new Error('Given mapping is not valid yaml.', {
      cause: e,
    });
  }

  const result = MappingSchema.safeParse(mapping);

  if (!result.success) {
    const issues = JSON.stringify(result.error.issues, null, 2);

    throw new Error(`Unexpected schema.\n\nIssues:\n${issues}`, {
      cause: result.error.issues,
    });
  }

  return {
    data: result.data,
    labels: result.data.map(entry => entry.label),
    filter: (labels: string[]) => {
      return result.data.filter(entry => labels.includes(entry.label));
    },
  };
}

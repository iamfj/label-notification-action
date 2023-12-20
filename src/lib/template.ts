export function useTemplate(
  variables: Record<string, string>,
  template: string = 'Heads up !{{ recipients }} - the "!{{ label }}" label was applied to this issue.'
): string {
  return template.replace(
    /!\{\{(\s*[^{}\s]+)\s*\}\}/g,
    (match, variableName) => {
      // Trim the variableName to remove any extra spaces
      variableName = variableName.trim();
      return Object.prototype.hasOwnProperty.call(variables, variableName)
        ? variables[variableName]
        : match;
    }
  );
}

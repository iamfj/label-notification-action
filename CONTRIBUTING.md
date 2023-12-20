# Contributing

## Welcome Contributors

Thank you for your interest in contributing to the Label-Notification GitHub Action. Your involvement is
fundamental to the success and improvement of this project. This document provides guidelines for contributing.

### Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read
and follow it to foster a respectful and inclusive community.

### How to Contribute

1. **Fork the Repository:** Begin by forking the repository and cloning it to your local machine.
2. **Create a New Branch:** Use the command `git checkout -b your-branch-name` to create a new branch for your feature or bugfix.
3. **Make Your Changes:** Implement your changes or fixes in your branch.
4. **Write Tests:** Ensure your changes have adequate test coverage and all tests pass.
5. **Commit Your Changes:** Use clear and concise commit messages.
6. **Push to Your Fork:** Push your changes to your forked repository.
7. **Open a Pull Request:** Go to the original repository and open a pull request from your fork and branch. Provide a clear description of your changes and the purpose of the pull request.

### Setting Up Your Development Environment

For a smooth development experience, follow these steps:

1. **Prerequisites:**

- Install [Docker](https://www.docker.com/get-started) on your system.

2. **Building the Devcontainer:**

- Open the project in Visual Studio Code.
- Use the command palette (`Ctrl+Shift+P`) and select `Remote-Containers: Rebuild and Reopen in Container`. This will set up a consistent development environment.

### Development Workflow

- **Testing:** Run `npm run test` to ensure all tests pass.
- **Linting:** Use `npm run lint` to check for code quality and adherence to coding standards.
- **Autofixing Code:** Run `npm run fix` to automatically fix formatting and style issues.
- **Pre-commit Hooks:** These are automatically executed to ensure code quality. Ensure your code passes these hooks before committing.

### Reporting Issues

- **Bug Reports:** Open a new issue and use the bug report template. Provide a clear description and steps to reproduce the bug.
- **Feature Requests:** Use the feature request template to propose new features or enhancements.

### Pull Request Guidelines

- **Description:** Provide a detailed description of your changes.
- **Linked Issues:** Link any relevant issues or feature requests.
- **Review Process:** Your pull request will be reviewed by the maintainers. Be open to discussing potential improvements.

### Questions or Suggestions

Feel free to open an issue for any questions or suggestions you might have. We appreciate your feedback and
ideas to make this project more robust and beneficial for the community.

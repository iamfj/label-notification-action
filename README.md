# Label Notification GitHub Action

## Introduction

Welcome to the **Label-Notification GitHub Action** repository. This tool is designed to automate the tagging of users or teams in pull requests or issues when specific labels are attached, solving the challenge of not being able to subscribe to labels natively in GitHub.

## Features

- **Automated Tagging:** Automatically tags users or teams in comments when specific labels are added.
- **Customizable Messages:** Each label can have a unique message, enhancing communication clarity.
- **Supports Multiple Recipients:** Add an unlimited number of users and teams as recipients.
- **YAML Configuration:** Simple YAML syntax for mapping labels, messages, and recipients.
- **Dynamic Comment Updates:** Automatically updates comments if a label is deleted and removes them if all labels are deleted.
- **Default Message:** A default message is used if no custom message is provided.

## Usage

To implement this GitHub Action in your workflow:

```yaml
---
name: Labeled

on:
  pull_request:
    types:
      - labeled
      - unlabeled
  issues:
    types:
      - labeled
      - unlabeled

jobs:
  notify:
    name: Notify
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v3
      - name: Notify
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          mapping: >
            - label: help wanted
              message: 'Hey !{{ recipients }}, please help me!'
              recipients:
                - '@iamfj'
            - label: bug
              recipients:
                - '@iamfj'
```

## Options

Each option in the configuration is explained below:

- `label`: The label that triggers the notification. When an issue or pull request is tagged with this label, the action is activated.

- `message` (optional): A customizable message that is posted in the comment when the label is applied. If no message is provided, a default message will be used.

- `recipients` (array, minimum: 1): A list of GitHub usernames or team names (prefixed with `@`) who will be notified. At least one recipient must be specified.

## Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed instructions on how to set up your development environment and contribute.

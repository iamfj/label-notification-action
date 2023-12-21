/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {npmPublish: false}],
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'package-lock.json',
          'dist/index.js',
          'dist/licenses.txt',
          'CHANGELOG.md',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        addReleases: true,
        assets: [
          {path: 'dist/index.js', label: 'Distribution'},
          {path: 'dist/licenses.txt', label: 'Licenses'},
        ],
      },
    ],
  ],
};

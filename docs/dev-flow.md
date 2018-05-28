# Development flow

The project follow the **Git flow** model wich be based on Vicent Driessen
model that you can see the original post [here](http://nvie.com/posts/a-successful-git-branching-model/)
or a quick guide [here](http://danielkummer.github.io/git-flow-cheatsheet/).

- [Main branches](#main-branches)
  - [Develop](#develop)
  - [Master](#master)
- [Support branches](#support-branches)
  - [Feature (`feature/`)](#feature-feature)
  - [Hotfix (`hotfix/`)](#hotfix-hotfix)
  - [Release (`release/`)](#release-release)
- [Version flow](#version-flow)

Well, this docs will explain the basis of the concept of **Git flow** applied
to this project, the main concepts are:

- We have 2 main branches (`develop` and `master`)
- We use 4 different support branches identified by prefixes
- We use **code review** (Merge requests) for **ALL** merge commits
- We always publish the branches we are working on, _we never work alone_
- The commit messages are very important, **DO NOT use generic messages** like
  _Minor bug fixes_

![Git flow banching model](http://nvie.com/img/git-model@2x.png)

## Main branches

This branches are static to the project and are the representation of project
main history because all the things start from this branches and end at this branches.

### Develop

This is the development integration branch where all the current features start
and ends before release. All the things developed but hotfixes
**MUST START FROM DEVELOP**.

When the changes at develop are enought to make another version of the project
a new release branch are created to manage the new version.

### Master

The main branch of the project, **direct commits are FORBIDDEN** the changes to
this branch are made by code review merge request from `hotfix` or `release`
branches and are always tagged with a version number following the
[version flow](#version-flow) of the project.

The success commit of this branch are automatically deployed at beta enviroment.

## Support branches

This kind of branches are the the way to make any changes on the project,
depending the change you want to do you should create a type of support branch
or another. All support branches are prefixed with the identifier of the branch
kind.

The branch name have to follow **CapitalCase convention**, for example:
`feature/AwesomeComponent` or `hotfix/FixApiEndpoint`.

### Feature (`feature/`)

When you want to add something new, make some change or a non urgent fix
you have to create a feature branch
that starts and ends at `develop` by a merge request.

### Hotfix (`hotfix/`)

This kind of branch is used for making important but small changes needed for
production and always implict a version upgrade of the project that must be a
path, speaking in [semantic versioning](http://semver.org/) terms.

This branches always **HAVE TO END** commited to main branches.

### Release (`release/`)

Integration branches for grouping all the changes made at the new version
and do all the new [version flow](#version-flow) which is explained down below.

The name of this branch must be the number of the intended version to release,
for example, if the future version would be the `1.2.3` the release branch name
would be `release/1.2.3`.

## Version flow

The steps you must follow in order to create a new version of the project.

1. \* Update the [CHANGELOG](/CHANGELOG.md) with the revelant release changes
1. Update the project version in all the files that reference it
1. Create a merge request to merge the release in master
1. Accept the merge request when the build success
1. Tag the merge commit with the new version with the prefix `v` like `v1.2.3`
1. Merge with develop

\* _Ignore for patch versions_

The project follow the [sematic versioning](http://semver.org/) concept.

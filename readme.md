# HyperIsland2025

## Get the Project

1. Make sure you have **Git** installed ([download here](https://git-scm.com/downloads)).
2. Open **Terminal** (Mac/Linux) or **Command Prompt / Git Bash** (Windows).
3. Run these commands:

   ```bash
   git clone https://github.com/dgozen/HyperIsland2025.git
   cd HyperIsland2025
   ```

## Get the latest branches

```bash
git fetch
```

## See all available branches

```bash
git branch -a
```

> **Note**
>
> - `git branch` → shows **local branches only**
> - `git branch -r` → shows **remote branches only**
> - `git branch -a` → shows **all branches** (local + remote)

## If you still don’t see the branch

It probably means you haven’t pulled it down yet. Try this:

```bash
git fetch origin
git switch branch-name
```

## Move to the branch you need

```bash
git checkout branch-name
```

## If new commits or branches were pushed

When someone pushes new code or creates new branches, you may need to update your local copy.

**Make sure you are on `main`**

```bash
git switch main
```

Get the latest commits on main

```bash
git pull origin main
```

Update the list of all remote branches
(only needed if new branches were created)

```bash
git fetch --all
```

# GitOps Demo API

A small Express backend for the **Full GitOps Pipeline from Commit to Production** assignment.

## Endpoints

- `GET /health` returns `{"status":"ok"}`.
- `GET /` returns `{"message":"Hello, this is my assignment"}`.

## Requirements

- Node.js 20 or later
- npm
- Docker Desktop (for container testing)

## Run locally

```bash
npm install
npm test
npm start
```

Test the endpoints:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/
```

On Windows PowerShell, use `curl.exe` if `curl` maps to `Invoke-WebRequest`.

## Run in Docker

Build the image:

```bash
docker build -t gitops-demo-api:local .
```

Run it:

```bash
docker run --rm -p 3000:3000 gitops-demo-api:local
```

Then test `http://localhost:3000/health` and `http://localhost:3000/`.

The Dockerfile has two stages:
- `builder`: installs dependencies and prepares the application source.
- `runner`: installs only production dependencies, copies the application, and runs as the non-root `node` user.

## GitHub Actions and GHCR

The workflow at `.github/workflows/ci.yml`:
1. Runs tests on pushes and pull requests targeting `main`.
2. On a push to `main`, after tests pass, builds and pushes an image to GitHub Container Registry (GHCR).
3. Publishes a commit-SHA tag and a `latest` tag.

The image name is derived from the GitHub repository name, lowercased. For example:

```text
ghcr.io/YOUR_GITHUB_USERNAME/gitops-demo-api:<commit-sha>
```

### Before using the workflow

1. Create a GitHub repository named `gitops-demo-api` (or another name you choose).
2. Put these files in that repository and push them to GitHub.
3. Ensure GitHub Actions are enabled.
4. Push to `main`. Open **Actions** to inspect the test and image-publish jobs.
5. In the repository's **Packages** section, check that the image was published.

The workflow uses the built-in `GITHUB_TOKEN`; do not add a personal access token to the YAML. The workflow grants `packages: write` to publish the package.

## What's intentionally not included yet

The workflow **does not update the separate GitOps repository yet**. That is the next part of the assignment, where we will connect the published image tag to Kustomize and Argo CD.

Do not commit real secrets or `.env` files to Git.

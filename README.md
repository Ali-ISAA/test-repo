# Test/Staging Repository (test-repo)

## Overview
Test and staging environment for QA validation. This repository receives automatic deployments from `dev-repo` and serves as the quality gate before production.

## Purpose
- QA testing and validation
- Integration testing
- User acceptance testing (UAT)
- Performance and security testing
- Staging environment for Vercel deployment
- Manual approval gate for production

## Workflow

### Automatic Deployment from Dev
Code arrives here automatically when:
1. Changes are merged to `main` in `dev-repo`
2. GitHub Actions in `dev-repo` triggers deployment
3. Code is synced to this repository (excluding `.github/workflows/` and `README.md`)
4. Vercel auto-deploys to staging environment

### Manual Deployment to Production
After QA approval:
1. Navigate to **Actions** tab in this repository
2. Select **"Manual Deploy to Production"** workflow
3. Click **"Run workflow"**
4. Enter deployment message (reason for deployment)
5. Confirm to deploy to `prod-repo`

## Repository Structure
```
test-repo/
├── .github/
│   └── workflows/
│       ├── deploy-to-vercel.yml   # Auto-deploys to Vercel
│       └── manual-deploy.yml      # Manual deploy to prod-repo
├── app.js                          # Synced from dev-repo
├── public/                         # Synced from dev-repo
├── tests/                          # Synced from dev-repo
├── Dockerfile                      # Synced from dev-repo
├── package.json                    # Synced from dev-repo
└── README.md                       # This file (not synced)
```

## Testing Checklist

### Functional Testing
- [ ] All API endpoints responding correctly
- [ ] Health check returns healthy status
- [ ] Data processing works as expected
- [ ] Theme switcher functionality
- [ ] Color palette selection

### Integration Testing
- [ ] Database connections (if applicable)
- [ ] External API integrations
- [ ] File uploads/downloads
- [ ] Authentication flows

### Performance Testing
- [ ] Response times within acceptable limits
- [ ] Load testing passed
- [ ] Memory usage normal

### Security Testing
- [ ] No exposed secrets or credentials
- [ ] HTTPS enforced
- [ ] Input validation working
- [ ] XSS protection in place

## Vercel Deployment

### Staging URL
The application is automatically deployed to Vercel on every push to `main`.

### Environment Variables
Ensure the following are configured in Vercel:
- Any API keys
- Database connection strings
- Third-party service credentials

## CI/CD Pipeline
**Current Position**: MIDDLE of pipeline

```
[dev-repo] --automatic--> [test-repo] --manual--> [prod-repo]
                           YOU ARE HERE
```

### Previous Stage
- Repository: `dev-repo`
- Deployment: Automatic via GitHub Actions

### Next Stage
- Repository: `prod-repo`
- Deployment: Manual via GitHub Actions workflow
- Approval: Required by QA/Release Manager

## Manual Production Deployment

### Prerequisites
- All tests passed
- QA approval obtained
- Deployment window scheduled (if required)

### Steps
1. Go to **Actions** tab
2. Select **"Manual Deploy to Production"**
3. Click **"Run workflow"** button
4. Fill in deployment details:
   ```
   Deployment message: QA approved - deploying feature XYZ
   ```
5. Click **"Run workflow"** to confirm

### Deployment Message Guidelines
Be descriptive:
- ✅ "QA approved - deploying user authentication feature"
- ✅ "Hotfix for critical payment bug - approved by manager"
- ❌ "deploying"
- ❌ "update"

## Environment-Specific Files
The following files are **NOT** deployed to downstream environments:
- `.github/workflows/*` - Workflow configurations
- `README.md` - Repository-specific documentation

## QA Approval Process
1. Test all features listed in the deployment
2. Verify no regressions in existing functionality
3. Check staging deployment on Vercel
4. Document test results
5. Obtain approval from QA lead
6. Trigger manual deployment to production

## Secrets Required
- `PROD_REPO_PAT` - Personal Access Token for deploying to prod-repo
- `VERCEL_TOKEN` - Vercel deployment token (if applicable)
- `VERCEL_ORG_ID` - Vercel organization ID (if applicable)
- `VERCEL_PROJECT_ID` - Vercel project ID (if applicable)

## Rollback Procedure
If issues are found:
1. Do NOT deploy to production
2. Report issues back to dev team
3. Wait for fixes in `dev-repo`
4. New deployment will arrive automatically

## Support
For testing issues or deployment questions, contact the DevOps or QA team.

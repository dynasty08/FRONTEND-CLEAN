@echo off
echo Building Angular application for production...
call ng build --configuration production

echo.
echo Build completed! Files are in dist/front-end-angular/browser/
echo.
echo To deploy to S3, run these AWS CLI commands:
echo.
echo 1. Create S3 bucket (replace YOUR-BUCKET-NAME):
echo aws s3 mb s3://YOUR-BUCKET-NAME
echo.
echo 2. Enable static website hosting:
echo aws s3 website s3://YOUR-BUCKET-NAME --index-document index.html --error-document index.html
echo.
echo 3. Upload files:
echo aws s3 sync dist/front-end-angular/browser/ s3://YOUR-BUCKET-NAME --delete
echo.
echo 4. Make bucket public (create bucket-policy.json first):
echo aws s3api put-bucket-policy --bucket YOUR-BUCKET-NAME --policy file://bucket-policy.json
echo.
pause
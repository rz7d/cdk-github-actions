# cdk-github-actions

GitHub Actions を最小権限で動かすための IAM テンプレート

GitHub (OIDC IdP) → AssumeRole (github-actions role) → AssumeRole (CDK Toolkit Role)


## デプロイ

コンテキストで CDK の実行を許可するリポジトリを指定します
例:

```
npm run cdk deploy -- -c repository=rz7d/cdk-github-actions
```

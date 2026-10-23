# Ever Design deployment

Target: https://everdesign.comonline.pro

Use the existing Hostinger VPS managed by Dokploy. Create a dedicated Compose service from `comrw/ever-design-group`, branch `feat/multipage`, Compose path `docker-compose.prod.yml`. Keep automatic deployments off during the initial launch. The Dockerfile runs Next.js standalone as a non-root user and includes local images, video and fonts.

In Dokploy, route `everdesign.comonline.pro` to service `app`, container port `3000`. Enable HTTPS / Let's Encrypt. Use Dokploy's domain/network configuration rather than publishing port 3000 directly to the internet. No database is required by the current site.

Cloudflare zone `comonline.pro` is active. No existing record for `everdesign.comonline.pro` was found during preparation. Once the correct VPS address is confirmed from Dokploy, add only this hostname's A record pointing to that server. Use DNS-only during initial certificate issuance; preserve other DNS records. Do not guess the server IP from unrelated services.

Build arguments accept the existing public film and enquiry settings. These are public browser configuration, not secrets. Rebuild after changing them. The enquiry form still cannot deliver messages until `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is set; WhatsApp and email links already work. The separate six-second intro has not yet been pushed to the GitHub branches visible during deployment preparation.

Validate after deployment: HTTPS certificate, homepage, direct navigation to a project and contact page, image optimisation, the local Cottage video, navigation, mobile layouts and motion. Only send a real enquiry test when a delivery endpoint is configured and the recipient has agreed to receive it.

Rollback by redeploying the prior successful Dokploy deployment or commit. Do not change or delete other COM ONLINE applications.

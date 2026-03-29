# Email Alerts

Low-stock emails are triggered when:

product_count <= threshold

You can test alerts by:
- updating a product count below threshold
- or calling:

POST /api/alerts/send

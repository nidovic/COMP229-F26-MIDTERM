# COMP229 Equipment API Submission

## Validation reflection

I tested the six API endpoints with the Postman collection and ran the automated API checks with `npm test` (8 tests passed). The checks cover the seven-item starting collection, category filtering, array-index lookups, and the POST, PUT, and DELETE operations. I also tested invalid input, including a non-numeric equipment ID, a missing category, and a non-numeric quantity; these requests are rejected with HTTP 400 validation errors.

The personalized equipment items are the Digital Audio Recorder (2016) and HD Video Camera (2018), which meet the 2010–2019 year range for a student ID ending in 4.

## Postman evidence

### 01 — GET all equipment

![GET all equipment response showing the seven-item collection](screenshots/301580784_FeutseNziko_01_GET_ALL.png)

### 02 — GET equipment by category

![GET equipment filtered by category](screenshots/301580784_FeutseNziko_02_GET_FILTER.png)

### 03 — GET equipment by index

![GET equipment at array index 0](screenshots/301580784_FeutseNziko_03_GET_BY_ID.png)

### 04 — POST equipment

![POST a new equipment item](screenshots/301580784_FeutseNziko_04_POST.png)

### 05 — PUT equipment

![Update equipment at array index 0](screenshots/301580784_FeutseNziko_05_PUT.png)

### 06 — DELETE equipment

![Delete equipment at array index 0](screenshots/301580784_FeutseNziko_06_DELETE.png)

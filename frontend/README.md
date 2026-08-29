# WeaveFlow — Weavers Management Frontend

React + Vite frontend for the Spring Boot weavers_management backend.

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Make sure the Spring Boot backend is running at
`http://localhost:8080` (or update `VITE_API_BASE_URL` in `.env`).

**Backend must allow CORS from `http://localhost:5173`** — add `@CrossOrigin` or a
global CORS config bean on the Spring Boot side, or every request will be blocked
by the browser.

## Pages → Backend endpoints

| Page | Route | Backend endpoint |
|---|---|---|
| Dashboard | `/` | `GET /home` |
| Add Weaver | `/weavers/add` | `POST /addWeaver` |
| Add Loom | `/looms/add` | `POST /weaver/add_loom` |
| Update Sarees | `/looms/update` | `POST /weaver/add_sarees` |
| Give Advance | `/advance/add` | `POST /weaver/add-advance` |
| Make Payment | `/salary/pay` | `POST /weaver/payment` |
| History | `/history` | `GET /history/{weaverName}` |
| Search | `/search` | `GET /search/{weaverName}` |

## Notes / things to confirm with your friend

- **`DashboardResponseDTO` and `HistoryResponseDTO` field names weren't visible
  from the controller signatures alone.** The Dashboard and History pages render
  whatever fields the backend actually returns (generically), so they'll work
  out of the box — but once you know the real field names, swap the generic
  rendering for named stat cards / typed tables for a cleaner UI.
- `src/utils/enums.js` mirrors the backend's Java enums exactly
  (`SareeType`, `PaymentMode`, etc.). If your friend adds/renames enum values,
  update this file to match or form submissions will fail deserialization.
- All API calls live in `src/api/` — one file per backend controller.

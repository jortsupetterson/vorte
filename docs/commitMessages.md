# Commit Message Examples (Conventional Commits)

## 📘 Format

`<type>(<scope>): <short description>`

_Example:_  
`feat(auth): add WebAuthn device registration`

---

## 🧩 Common Types

| Type         | Meaning                           | Example                                     |
| ------------ | --------------------------------- | ------------------------------------------- |
| **feat**     | New feature                       | `feat(invoice): add PDF export option`      |
| **fix**      | Bug fix                           | `fix(api): handle null customer id`         |
| **docs**     | Documentation change              | `docs(readme): update setup instructions`   |
| **style**    | Code formatting / style           | `style(ui): normalize button spacing`       |
| **refactor** | Code restructure, no logic change | `refactor(auth): simplify session handling` |
| **perf**     | Performance optimization          | `perf(db): cache results to reduce latency` |
| **test**     | Add or modify tests               | `test(forms): add validation unit tests`    |
| **build**    | Build system or dependency change | `build(deps): upgrade wrangler to 4.20.0`   |
| **ci**       | Continuous Integration pipeline   | `ci: add GitHub Actions deploy step`        |
| **chore**    | Maintenance tasks, configs        | `chore(lint): update eslint rules`          |

---

## 🧠 Tips

- Keep description short (< 80 chars).
- Use imperative mood: “add”, “fix”, not “added” or “fixed”.
- Add longer explanation after a blank line if needed.

---

## 🧾 Example Full Commit

```bash
git commit -m "feat(account): implement passwordless login" -m "Added FIDO2/WebAuthn flow for browser-based authentication. This replaces the old password field and stores credentials in IndexedDB."
```
